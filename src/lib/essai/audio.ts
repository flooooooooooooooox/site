/**
 * Controle de l'audio AVANT tout appel payant.
 *
 *  - le format est reconnu a sa signature, jamais a l'extension ni au type MIME
 *    declares par le navigateur (qui mentent) ;
 *  - la duree est lue dans le fichier quand le conteneur la porte ;
 *  - sinon (un enregistrement MediaRecorder n'en a souvent pas), on borne la
 *    taille : un fichier plus gros que ce que 90 s peuvent peser est refuse.
 */
import { ESSAI } from "./config";

export type AudioKind = "wav" | "mp3" | "m4a" | "ogg" | "webm";

export interface AudioInfo {
  kind: AudioKind;
  /** null : le conteneur ne la donne pas. */
  durationSeconds: number | null;
}

export type AudioCheck =
  | { ok: true; info: AudioInfo }
  | { ok: false; code: "vide" | "trop-gros" | "format" | "trop-court" | "trop-long"; message: string };

const ascii = (b: Uint8Array, at: number, len: number) =>
  String.fromCharCode(...b.subarray(at, at + len));
const u32le = (b: Uint8Array, at: number) => (b[at] | (b[at + 1] << 8) | (b[at + 2] << 16) | (b[at + 3] << 24)) >>> 0;
const u32be = (b: Uint8Array, at: number) => ((b[at] << 24) | (b[at + 1] << 16) | (b[at + 2] << 8) | b[at + 3]) >>> 0;

function indexOfBytes(b: Uint8Array, needle: number[], from = 0, to = b.length): number {
  outer: for (let i = from; i <= to - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) if (b[i + j] !== needle[j]) continue outer;
    return i;
  }
  return -1;
}

function lastIndexOfAscii(b: Uint8Array, text: string): number {
  const n = [...text].map((c) => c.charCodeAt(0));
  outer: for (let i = b.length - n.length; i >= 0; i--) {
    for (let j = 0; j < n.length; j++) if (b[i + j] !== n[j]) continue outer;
    return i;
  }
  return -1;
}

/* ----- WAV ----- */
function wavDuration(b: Uint8Array): number | null {
  let pos = 12;
  let byteRate = 0;
  while (pos + 8 <= b.length) {
    const id = ascii(b, pos, 4);
    const size = u32le(b, pos + 4);
    if (id === "fmt ") byteRate = u32le(b, pos + 16);
    if (id === "data") {
      // Taille 0 ou 0xFFFFFFFF : flux sans longueur, on se rabat sur ce qui reste.
      const bytes = size === 0 || size === 0xffffffff || pos + 8 + size > b.length ? b.length - pos - 8 : size;
      return byteRate > 0 ? bytes / byteRate : null;
    }
    pos += 8 + size + (size % 2);
  }
  return null;
}

/* ----- MP4 / M4A : boite mvhd ----- */
function mp4Duration(b: Uint8Array): number | null {
  const i = indexOfBytes(b, [0x6d, 0x76, 0x68, 0x64]); // "mvhd"
  if (i < 0 || i + 28 > b.length) return null;
  const version = b[i + 4];
  let timescale: number;
  let duration: number;
  if (version === 1) {
    timescale = u32be(b, i + 24);
    duration = u32be(b, i + 28) * 2 ** 32 + u32be(b, i + 32);
  } else {
    timescale = u32be(b, i + 16);
    duration = u32be(b, i + 20);
  }
  // MP4 fragmente (Safari/MediaRecorder) : duree a 0 dans l'en-tete.
  return timescale > 0 && duration > 0 ? duration / timescale : null;
}

/* ----- OGG (Opus / Vorbis) : granule de la derniere page ----- */
function oggDuration(b: Uint8Array): number | null {
  const last = lastIndexOfAscii(b, "OggS");
  if (last < 0 || last + 14 > b.length) return null;
  const lo = u32le(b, last + 6);
  const hi = u32le(b, last + 10);
  if (hi === 0xffffffff && lo === 0xffffffff) return null;
  const granule = hi * 2 ** 32 + lo;
  const head = indexOfBytes(b, [0x4f, 0x70, 0x75, 0x73, 0x48, 0x65, 0x61, 0x64], 0, Math.min(b.length, 400)); // "OpusHead"
  if (head >= 0) {
    const preSkip = b[head + 10] | (b[head + 11] << 8);
    return Math.max(0, granule - preSkip) / 48000;
  }
  const vorbis = indexOfBytes(b, [0x01, 0x76, 0x6f, 0x72, 0x62, 0x69, 0x73], 0, Math.min(b.length, 400)); // "\x01vorbis"
  if (vorbis >= 0) {
    const rate = u32le(b, vorbis + 12);
    return rate > 0 ? granule / rate : null;
  }
  return null;
}

/* ----- WebM : element Duration (0x4489) du segment info ----- */
function webmDuration(b: Uint8Array): number | null {
  const limit = Math.min(b.length, 8192);
  let scale = 1_000_000; // TimecodeScale par defaut : 1 ms
  const ts = indexOfBytes(b, [0x2a, 0xd7, 0xb1], 0, limit);
  if (ts >= 0) {
    const len = b[ts + 3] & 0x0f;
    let v = 0;
    for (let i = 0; i < len && i < 4; i++) v = v * 256 + b[ts + 4 + i];
    if (len > 0 && len <= 4 && v > 0) scale = v;
  }
  const d = indexOfBytes(b, [0x44, 0x89], 0, limit);
  if (d < 0) return null; // Chrome n'ecrit pas la duree d'un enregistrement en direct.
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const size = b[d + 2];
  let ticks: number;
  if (size === 0x84) ticks = view.getFloat32(d + 3);
  else if (size === 0x88) ticks = view.getFloat64(d + 3);
  else return null;
  const sec = (ticks * scale) / 1e9;
  return Number.isFinite(sec) && sec > 0 ? sec : null;
}

/* ----- MP3 : estimation par debit (en-tete de la 1re trame) ----- */
const MP3_BITRATES_V1_L3 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
function mp3Duration(b: Uint8Array): number | null {
  let pos = 0;
  if (ascii(b, 0, 3) === "ID3") {
    const size = ((b[6] & 0x7f) << 21) | ((b[7] & 0x7f) << 14) | ((b[8] & 0x7f) << 7) | (b[9] & 0x7f);
    pos = 10 + size;
  }
  for (let i = pos; i < Math.min(b.length - 4, pos + 4096); i++) {
    if (b[i] === 0xff && (b[i + 1] & 0xe0) === 0xe0) {
      const bitrate = MP3_BITRATES_V1_L3[b[i + 2] >> 4];
      if (!bitrate) continue;
      // Debit constant suppose : un MP3 a debit variable peut etre sous-estime,
      // d'ou la borne de taille qui s'applique aussi.
      return ((b.length - i) * 8) / (bitrate * 1000);
    }
  }
  return null;
}

export function sniffAudio(b: Uint8Array): AudioInfo | null {
  if (b.length < 12) return null;
  if (ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WAVE") return { kind: "wav", durationSeconds: wavDuration(b) };
  if (ascii(b, 4, 4) === "ftyp") return { kind: "m4a", durationSeconds: mp4Duration(b) };
  if (ascii(b, 0, 4) === "OggS") return { kind: "ogg", durationSeconds: oggDuration(b) };
  if (b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3) return { kind: "webm", durationSeconds: webmDuration(b) };
  if (ascii(b, 0, 3) === "ID3" || (b[0] === 0xff && (b[1] & 0xe0) === 0xe0)) return { kind: "mp3", durationSeconds: mp3Duration(b) };
  return null;
}

export function checkAudio(bytes: Uint8Array): AudioCheck {
  if (bytes.length === 0) return { ok: false, code: "vide", message: "Le fichier audio est vide." };
  if (bytes.length > ESSAI.maxAudioBytes) {
    return { ok: false, code: "trop-gros", message: "Le fichier est trop lourd. Enregistrez un message de moins d'1 minute 30." };
  }
  const info = sniffAudio(bytes);
  if (!info) {
    return { ok: false, code: "format", message: "Ce fichier n'est pas un audio reconnu. Utilisez un enregistrement ou un fichier MP3, M4A, WAV, OGG ou WebM." };
  }
  if (info.durationSeconds === null) {
    if (bytes.length > ESSAI.maxAudioBytesUnknownDuration) {
      return { ok: false, code: "trop-long", message: "L'enregistrement est trop long. Limitez-vous à 1 minute 30." };
    }
    return { ok: true, info };
  }
  if (info.durationSeconds < ESSAI.minAudioSeconds) {
    return { ok: false, code: "trop-court", message: "L'enregistrement est trop court. Décrivez le chantier en quelques phrases." };
  }
  if (info.durationSeconds > ESSAI.maxAudioSeconds + ESSAI.durationToleranceSeconds) {
    return { ok: false, code: "trop-long", message: "L'enregistrement est trop long. Limitez-vous à 1 minute 30." };
  }
  return { ok: true, info };
}
