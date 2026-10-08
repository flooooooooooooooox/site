import test from "node:test";
import assert from "node:assert/strict";
import { pageMetadata, identityGraph, serializeJsonLd, softwareJsonLd, ORGANIZATION_ID } from "../src/lib/seo.ts";

test("an existing brand is not repeated by the inherited title template", () => {
  assert.deepEqual(pageMetadata({title:"Logiciel devis peintre | Cirrion"}).title, {absolute:"Logiciel devis peintre | Cirrion"});
  assert.deepEqual(pageMetadata({title:"Pourquoi j’ai créé Cirrion"}).title, {absolute:"Pourquoi j’ai créé Cirrion"});
});
test("unbranded guides and absolute local overrides keep one brand", () => {
  assert.deepEqual(pageMetadata({title:"Guide ERP bâtiment"}).title,{absolute:"Guide ERP bâtiment | Cirrion"});
  assert.deepEqual(pageMetadata({title:{absolute:"Alpes-Maritimes | Cirrion"}}).title,{absolute:"Alpes-Maritimes | Cirrion"});
});
test("sharing cards refer to the page canonical rather than the homepage", () => {
  const meta=pageMetadata({title:"ERP bâtiment",description:"Guide pour artisans",alternates:{canonical:"/ressources/logiciel-erp-batiment"},openGraph:{url:"https://www.cirrion.eu"}});
  assert.equal(meta.openGraph.url,"https://www.cirrion.eu/ressources/logiciel-erp-batiment");
  assert.equal(meta.twitter.title,"ERP bâtiment | Cirrion");
  assert.equal(meta.twitter.description,"Guide pour artisans");
});
test("explicit social descriptions and images remain available", () => {
  const meta=pageMetadata({title:"Cirrion",openGraph:{description:"Texte social",images:["/dashboard-cirrion.jpg"]},twitter:{description:"Texte court"}});
  assert.equal(meta.openGraph.description,"Texte social");
  assert.deepEqual(meta.openGraph.images,["/dashboard-cirrion.jpg"]);
  assert.equal(meta.twitter.description,"Texte court");
});
test("the identity graph has unique entities and references that resolve", () => {
  const nodes=identityGraph["@graph"];
  const ids=new Set(nodes.map(n=>n["@id"]));
  assert.equal(ids.size,nodes.length);
  function visit(value){if(!value||typeof value!=="object")return;if(value["@id"])assert.ok(ids.has(value["@id"]));for(const v of Object.values(value))visit(v);}
  visit(identityGraph);
  assert.equal(softwareJsonLd.publisher["@id"],ORGANIZATION_ID);
  assert.equal(nodes.filter(n=>n["@type"]==="Organization").length,1);
  assert.ok(!JSON.stringify(identityGraph).includes("SearchAction"));
  assert.equal(softwareJsonLd.offers,undefined);
  assert.equal(softwareJsonLd.aggregateRating,undefined);
});
test("structured text cannot terminate its script tag", () => {
  const payload={text:"</script><script>alert(1)</script> & peinture"};
  const serialized=serializeJsonLd(payload);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized),payload);
});
