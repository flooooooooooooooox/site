import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const publicOrigin = "https://www.cirrion.eu";
const buildDirectory = path.resolve(".next/server/app");
const baseIndex = process.argv.indexOf("--base");
const base = baseIndex < 0 ? null : new URL(process.argv[baseIndex + 1]);
const targets = ["/", "/devis", "/artisans/peintre", "/logiciel-gestion-entreprise-batiment", "/ressources/logiciel-erp-batiment", "/logiciel-batiment/nice", "/ressources/pourquoi-jai-cree-cirrion", "/faq"];
const faqRoutes = new Set(["/artisans/peintre", "/logiciel-gestion-entreprise-batiment"]);
const aliases = ["/ressources/pourquoi-jai-cree-cree", "/ressources/pourquoi-jai-cree-cree-cirrion"];
const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt|#39|#x27|#\d+);/g, entity => {
  const named = {"&amp;":"&", "&quot;":"\"", "&apos;":"'", "&lt;":"<", "&gt;":">", "&#39;":"'", "&#x27;":"'"};
  return named[entity] ?? String.fromCodePoint(Number(entity.slice(2, -1)));
});
const plainText = value => decode(value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], decode(m[2])]));
function checkHtml(route, html) {
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
  assert.ok(head, `${route}: missing head`);
  const title = decode(head.match(/<title>(.*?)<\/title>/s)?.[1] ?? "");
  assert.equal((title.match(/\bcirrion\b/gi) ?? []).length, 1, `${route}: missing or repeated brand in title`);
  const meta = [...head.matchAll(/<meta\b[^>]*>/g)].map(m => attrs(m[0]));
  const canonical = [...head.matchAll(/<link\b[^>]*>/g)].map(m => attrs(m[0])).filter(a => a.rel === "canonical");
  assert.equal(canonical.length, 1, `${route}: canonical count`);
  const expected = new URL(route, publicOrigin);
  const actual = new URL(canonical[0].href);
  assert.equal(actual.origin, expected.origin, `${route}: canonical origin`);
  assert.equal(actual.pathname.replace(/\/$/, ""), expected.pathname.replace(/\/$/, ""), `${route}: canonical path`);
  assert.ok(meta.find(a => a.name === "description")?.content, `${route}: missing description`);
  const noindex = meta.some(a => /^(robots|googlebot)$/.test(a.name ?? "") && a.content?.includes("noindex"));
  assert.equal(noindex, route === "/support", `${route}: unexpected indexation setting`);
  assert.equal(new URL(meta.find(a => a.property === "og:url")?.content).href, actual.href, `${route}: sharing URL`);
  assert.ok(meta.find(a => a.property === "og:image")?.content, `${route}: missing social image`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: H1 count`);
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const identity = schemas.filter(s => s["@graph"]?.some(n => n["@id"] === `${publicOrigin}/#organization`));
  assert.equal(identity.length, 1, `${route}: identity graph count`);
  assert.ok(!schemas.some(s => s["@type"] === "Product" || s.potentialAction?.["@type"] === "SearchAction"), `${route}: obsolete schema`);
  const software = schemas.filter(s => s["@type"] === "SoftwareApplication");
  const mainProduct = software.filter(s => s["@id"] === `${publicOrigin}/#software`);
  assert.equal(mainProduct.length, route === "/" ? 1 : 0, `${route}: main software schema scope`);
  assert.ok(software.length <= 1, `${route}: repeated software schema`);
  if (faqRoutes.has(route)) {
    const faq = schemas.find(s => s["@type"] === "FAQPage");
    assert.equal(faq?.mainEntity?.length, 3, `${route}: FAQ count`);
    const visible = plainText(html);
    for (const answer of faq.mainEntity) {
      assert.ok(visible.includes(answer.name), `${route}: question absent from HTML`);
      assert.ok(visible.includes(answer.acceptedAnswer.text), `${route}: answer absent from HTML`);
    }
  }
  if (route === "/ressources/logiciel-erp-batiment") {
    const article = schemas.find(s => s["@type"] === "Article");
    assert.equal(article?.datePublished, "2026-06-18");
    assert.equal(article?.dateModified, "2026-10-06");
    assert.ok(article?.image);
    assert.ok(plainText(html).includes("6 octobre 2026"));
    assert.ok(html.includes("https://www.impots.gouv.fr/professionnel/questions/partir-de-quand-suis-je-concerne-par-la-reforme-de-la-facturation"));
  }
  if (route === "/") {
    assert.equal(title, "Cirrion — Logiciel de devis et factures pour artisans du bâtiment | Plus qu'un ERP", "homepage SEO title changed");
    assert.equal(plainText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ""), "Vos devis et vos factures se font sans vous. Du devis dicté à la TVA déclarée.", "homepage visible title changed");
  }
  if (route === "/logiciel-batiment/nice") assert.ok(title.includes("Alpes-Maritimes (06)"), "Nice title regression");
}
async function files(directory) {
  const entries = await readdir(directory, {withFileTypes:true});
  const result = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(full));
    else if (entry.name.endsWith(".html") && !entry.name.startsWith("_")) result.push(full);
  }
  return result;
}
function checkSitemap(xml) {
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(decode(m[1])).href);
  assert.equal(new Set(urls).size, urls.length, "duplicate sitemap URL");
  for (const route of [...targets, "/application"]) assert.ok(urls.includes(new URL(route, publicOrigin).href), `sitemap missing ${route}`);
  assert.ok(!urls.includes(`${publicOrigin}/support`), "noindex support page in sitemap");
  assert.ok(!aliases.some(route => urls.includes(`${publicOrigin}${route}`)), "redirect aliases in sitemap");
  return urls.length;
}
let checked = 0;
let sitemap;
if (base) {
  for (const route of targets) {
    const response = await fetch(new URL(route, base), {signal:AbortSignal.timeout(30000)});
    assert.equal(response.status, 200, `${route}: status`);
    checkHtml(route, await response.text());
    checked++;
  }
  const response = await fetch(new URL("/sitemap.xml", base));
  assert.equal(response.status, 200, "sitemap status");
  sitemap = await response.text();
  for (const alias of aliases) {
    const redirect = await fetch(new URL(alias, base), {redirect:"manual"});
    assert.ok([301,308].includes(redirect.status), `${alias}: permanent redirect`);
    assert.equal(new URL(redirect.headers.get("location"), base).pathname, "/ressources/pourquoi-jai-cree-cirrion");
  }
} else {
  const failures = [];
  for (const file of await files(buildDirectory)) {
    const relative = path.relative(buildDirectory, file).replaceAll(path.sep, "/").replace(/\.html$/, "");
    const route = relative === "index" ? "/" : `/${relative}`;
    try { checkHtml(route, await readFile(file, "utf8")); }
    catch (error) { failures.push(error); }
    checked++;
  }
  assert.ok(checked > 2000, "build pages missing");
  if (failures.length) throw new AggregateError(failures.slice(0, 20), `${failures.length} SEO page checks failed out of ${checked}`);
  sitemap = await readFile(path.join(buildDirectory, "sitemap.xml.body"), "utf8");
  const manifest = JSON.parse(await readFile(".next/routes-manifest.json", "utf8"));
  for (const alias of aliases) assert.ok(manifest.redirects.some(r => r.source === alias && r.statusCode === 308 && r.destination === "/ressources/pourquoi-jai-cree-cirrion"), `${alias}: missing permanent redirect`);
}
console.log(JSON.stringify({mode:base ? base.origin : "production build", checkedPages:checked, sitemapUrls:checkSitemap(sitemap), status:"passed"}));
