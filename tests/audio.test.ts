import { describe, expect, it } from "vitest";
import { checkAudio, sniffAudio } from "@/lib/essai/audio";
import { ESSAI } from "@/lib/essai/config";
import { m4a, mp3Cbr, oggOpus, wav, webmNoDuration, webmWithDuration } from "./helpers";

describe("durée lue dans le fichier", () => {
  it("WAV", () => expect(sniffAudio(wav(10))?.durationSeconds).toBeCloseTo(10, 1));
  it("OGG Opus", () => expect(sniffAudio(oggOpus(12))?.durationSeconds).toBeCloseTo(12, 1));
  it("M4A", () => expect(sniffAudio(m4a(25))?.durationSeconds).toBeCloseTo(25, 1));
  it("WebM avec durée", () => expect(sniffAudio(webmWithDuration(40))?.durationSeconds).toBeCloseTo(40, 1));
  it("MP3 à débit constant (estimation)", () => expect(sniffAudio(mp3Cbr(30))?.durationSeconds).toBeCloseTo(30, 0));
  it("WebM de MediaRecorder : pas de durée, et on le sait", () => {
    expect(sniffAudio(webmNoDuration(5000))).toEqual({ kind: "webm", durationSeconds: null });
  });
});

describe("contrôle avant appel payant", () => {
  it("accepte un message de 30 s", () => expect(checkAudio(wav(30)).ok).toBe(true));
  it("refuse un fichier vide", () => expect(checkAudio(new Uint8Array(0))).toMatchObject({ ok: false, code: "vide" }));
  it("refuse trop court", () => expect(checkAudio(wav(0.5))).toMatchObject({ ok: false, code: "trop-court" }));
  it("refuse trop long, quel que soit le format", () => {
    expect(checkAudio(wav(200))).toMatchObject({ ok: false, code: "trop-long" });
    expect(checkAudio(oggOpus(300))).toMatchObject({ ok: false, code: "trop-long" });
    expect(checkAudio(m4a(600))).toMatchObject({ ok: false, code: "trop-long" });
  });
  it("tolère quelques secondes d'arrondi après 90 s", () => {
    expect(checkAudio(wav(ESSAI.maxAudioSeconds + 1)).ok).toBe(true);
    expect(checkAudio(wav(ESSAI.maxAudioSeconds + 20)).ok).toBe(false);
  });
  it("reconnaît le format à sa signature, pas à son nom", () => {
    expect(checkAudio(new TextEncoder().encode("<?php echo 'pas un audio'; ?> ".repeat(20)))).toMatchObject({ ok: false, code: "format" });
    expect(checkAudio(new TextEncoder().encode("%PDF-1.7 ".repeat(40)))).toMatchObject({ ok: false, code: "format" });
  });
  it("refuse au-delà de la taille maximale, sans même lire la durée", () => {
    expect(checkAudio(new Uint8Array(ESSAI.maxAudioBytes + 1))).toMatchObject({ ok: false, code: "trop-gros" });
  });
  it("durée illisible : on borne la taille", () => {
    expect(checkAudio(webmNoDuration(300_000)).ok).toBe(true);
    expect(checkAudio(webmNoDuration(ESSAI.maxAudioBytesUnknownDuration + 1))).toMatchObject({ ok: false, code: "trop-long" });
  });
  it("un en-tête qui ment sur la durée mais dont la taille est énorme est refusé par la taille", () => {
    const big = wav(5);
    const fat = new Uint8Array(ESSAI.maxAudioBytes + 10);
    fat.set(big.subarray(0, 44));
    expect(checkAudio(fat).ok).toBe(false);
  });
});
