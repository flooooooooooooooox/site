import { describe, expect, it } from "vitest";
import {
  clientIp, ipHash, issueToken, newVisitorId, normalizeIp, readCookie, signVisitor, verifyToken, verifyVisitor,
} from "@/lib/essai/identity";

describe("IP", () => {
  it("IPv4 inchangée", () => expect(normalizeIp("203.0.113.7")).toBe("203.0.113.7"));
  it("IPv4 encapsulée dans IPv6", () => expect(normalizeIp("::ffff:203.0.113.7")).toBe("203.0.113.7"));
  it("IPv6 : tout le /64 donne la même empreinte", () => {
    const a = normalizeIp("2001:db8:abcd:12::1");
    const b = normalizeIp("2001:db8:abcd:12:ffff:ffff:ffff:ffff");
    expect(a).toBe(b);
    expect(ipHash(a)).toBe(ipHash(b));
    expect(ipHash(normalizeIp("2001:db8:abcd:13::1"))).not.toBe(ipHash(a));
  });
  it("l'empreinte ne contient jamais l'IP", () => expect(ipHash("203.0.113.7")).not.toContain("203"));
  it("lit x-real-ip, sinon le premier x-forwarded-for", () => {
    expect(clientIp(new Headers({ "x-real-ip": "198.51.100.4" }))).toBe("198.51.100.4");
    expect(clientIp(new Headers({ "x-forwarded-for": "198.51.100.9, 10.0.0.1" }))).toBe("198.51.100.9");
    expect(clientIp(new Headers())).toBeNull();
  });
});

describe("cookie signé", () => {
  it("valide", () => {
    const id = newVisitorId();
    expect(verifyVisitor(signVisitor(id))).toBe(id);
  });
  it("refuse une signature modifiée ou un identifiant forgé", () => {
    const id = newVisitorId();
    expect(verifyVisitor(`${id}.${"0".repeat(32)}`)).toBeNull();
    expect(verifyVisitor(`${newVisitorId()}.${signVisitor(id).split(".")[1]}`)).toBeNull();
    expect(verifyVisitor("n'importe quoi")).toBeNull();
    expect(verifyVisitor(undefined)).toBeNull();
  });
  it("lit le bon cookie parmi d'autres", () => {
    expect(readCookie(new Headers({ cookie: "a=1; cirrion_essai=abc%2E123; b=2" }))).toBe("abc.123");
  });
});

describe("jeton de téléchargement", () => {
  it("valide pour son propriétaire seulement", () => {
    const id = newVisitorId();
    const { token } = issueToken(id);
    expect(verifyToken(token, id)).not.toBeNull();
    expect(verifyToken(token, newVisitorId())).toBeNull();
  });
  it("expire", () => {
    const id = newVisitorId();
    const { token } = issueToken(id, Date.now() - 2 * 3600_000);
    expect(verifyToken(token, id)).toBeNull();
  });
  it("refuse une falsification", () => {
    const id = newVisitorId();
    const { token } = issueToken(id);
    expect(verifyToken(token.replace(/.$/, (c) => (c === "0" ? "1" : "0")), id)).toBeNull();
    expect(verifyToken(42, id)).toBeNull();
  });
});
