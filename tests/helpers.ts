/** Fabrique d'audios synthetiques : les formats sont ecrits a la main, octet par octet. */

const le32 = (n: number) => [n & 255, (n >> 8) & 255, (n >> 16) & 255, (n >>> 24) & 255];
const be32 = (n: number) => [(n >>> 24) & 255, (n >> 16) & 255, (n >> 8) & 255, n & 255];
const txt = (s: string) => [...s].map((c) => c.charCodeAt(0));

/** WAV PCM 16 bits mono 8 kHz de `seconds` secondes (silence). */
export function wav(seconds: number): Uint8Array {
  const rate = 8000, bytesPerSec = rate * 2;
  const data = Math.round(seconds * bytesPerSec);
  const head = [
    ...txt("RIFF"), ...le32(36 + data), ...txt("WAVE"),
    ...txt("fmt "), ...le32(16), 1, 0, 1, 0, ...le32(rate), ...le32(bytesPerSec), 2, 0, 16, 0,
    ...txt("data"), ...le32(data),
  ];
  const out = new Uint8Array(head.length + data);
  out.set(head);
  return out;
}

/** WebM minimal sans element Duration, comme un enregistrement MediaRecorder de Chrome. */
export function webmNoDuration(totalBytes: number): Uint8Array {
  const out = new Uint8Array(totalBytes);
  out.set([0x1a, 0x45, 0xdf, 0xa3, 0x80]);
  return out;
}

/** WebM avec element Duration (float 64) et TimecodeScale par defaut. */
export function webmWithDuration(seconds: number): Uint8Array {
  const buf = new ArrayBuffer(8);
  new DataView(buf).setFloat64(0, seconds * 1000); // ticks de 1 ms
  const out = new Uint8Array(64);
  out.set([0x1a, 0x45, 0xdf, 0xa3, 0x80, 0x2a, 0xd7, 0xb1, 0x83, 0x0f, 0x42, 0x40, 0x44, 0x89, 0x88, ...new Uint8Array(buf)]);
  return out;
}

/** OGG Opus : une page d'en-tete OpusHead, puis une derniere page portant le granule. */
export function oggOpus(seconds: number): Uint8Array {
  const granule = Math.round(seconds * 48000) + 312; // + pre-skip
  const opusHead = [...txt("OpusHead"), 1, 1, 56, 1, ...le32(48000), 0, 0, 0];
  const page = (gran: number, body: number[]) => [
    ...txt("OggS"), 0, 0, ...le32(gran), ...le32(0), ...le32(1), ...le32(0), ...le32(0), 1, body.length, ...body,
  ];
  return Uint8Array.from([...page(0, opusHead), ...page(granule, [1, 2, 3, 4])]);
}

/** MP4 / M4A : ftyp puis un mvhd v0 portant la duree. */
export function m4a(seconds: number, timescale = 1000): Uint8Array {
  const mvhd = [...be32(108), ...txt("mvhd"), 0, 0, 0, 0, ...be32(0), ...be32(0), ...be32(timescale), ...be32(Math.round(seconds * timescale)), ...new Array(80).fill(0)];
  return Uint8Array.from([...be32(20), ...txt("ftyp"), ...txt("M4A "), ...be32(0), ...txt("M4A "), ...mvhd]);
}

export function mp3Cbr(seconds: number, kbps = 128): Uint8Array {
  const bytes = Math.round((seconds * kbps * 1000) / 8);
  const out = new Uint8Array(bytes);
  out.set([0xff, 0xfb, 0x90, 0x00]); // MPEG1 Layer III, 128 kbps (index 9)
  return out;
}

/** Corps multipart pour appeler le route handler comme un navigateur. */
export function audioRequest(url: string, audio: Uint8Array, init: { cookie?: string; origin?: string; ip?: string } = {}): Request {
  const form = new FormData();
  form.set("audio", new Blob([audio as BlobPart], { type: "audio/wav" }), "essai.wav");
  const headers: Record<string, string> = { host: "localhost:3000" };
  if (init.cookie) headers.cookie = init.cookie;
  if (init.origin) headers.origin = init.origin;
  headers["x-real-ip"] = init.ip ?? "203.0.113.7";
  return new Request(url, { method: "POST", body: form, headers });
}
