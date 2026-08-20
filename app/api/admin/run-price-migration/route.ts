import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getDb, exportProductsJson } from "@/lib/db";

const CORRECTIONS: Record<string, { price: string; originalPrice: string }> = {
  "ps5-slim-digital-1tb":         { price: "R12,999", originalPrice: "R2,300" },
  "ps5-slim-disc-1tb":            { price: "R13,999", originalPrice: "R2,500" },
  "ps5-slim-fortnite-bundle":     { price: "R14,499", originalPrice: "R2,300" },
  "ps5-standard-gt7-bundle":      { price: "R15,499", originalPrice: "R2,800" },
  "ps5-pro-2tb":                  { price: "R20,999", originalPrice: "R3,600" },
  "xbox-series-s-512gb":          { price: "R8,999",  originalPrice: "R2,400" },
  "xbox-series-s-1tb":            { price: "R10,999", originalPrice: "R2,600" },
  "xbox-series-x-digital":        { price: "R15,999", originalPrice: "R3,700" },
  "xbox-series-x-1tb":            { price: "R16,999", originalPrice: "R3,200" },
  "xbox-series-x-galaxy-black":   { price: "R19,999", originalPrice: "R4,450" },
  "logitech-g923-ps-pc":          { price: "R9,955",  originalPrice: "R2,300" },
  "logitech-g923-xbox-pc":        { price: "R9,955",  originalPrice: "R2,600" },
  "logitech-g923-ps-shifter":     { price: "R12,499", originalPrice: "R3,300" },
  "logitech-g923-xbox-shifter":   { price: "R12,499", originalPrice: "R3,500" },
  "logitech-g923-premium-set":    { price: "R13,999", originalPrice: "R4,000" },
  "pcbuilder-defender-ryzen5":    { price: "R9,999",  originalPrice: "R4,800" },
  "asus-rog-rtx4060ti":           { price: "R19,999", originalPrice: "R8,200" },
  "msi-gaming-rtx4060":           { price: "R16,999", originalPrice: "R6,500" },
  "lenovo-legion-rtx4070":        { price: "R24,999", originalPrice: "R10,800" },
  "hp-omen-rtx4070-super":        { price: "R29,999", originalPrice: "R12,400" },
  "samsung-55-crystal-uhd":       { price: "R8,499",  originalPrice: "R1,900" },
  "samsung-65-neo-qled":          { price: "R14,999", originalPrice: "R4,600" },
  "samsung-85-crystal-uhd":       { price: "R17,999", originalPrice: "R4,900" },
  "samsung-98-crystal-uhd":       { price: "R44,999", originalPrice: "R7,800" },
  "hisense-55-4k-uhd":            { price: "R7,999",  originalPrice: "R2,400" },
  "hisense-75-qled-4k":           { price: "R13,999", originalPrice: "R4,340" },
  "hisense-98-qled-4k":           { price: "R29,999", originalPrice: "R6,300" },
  "lg-65-uhd-4k-ai":              { price: "R11,999", originalPrice: "R3,300" },
  "tcl-55-qled-google":           { price: "R8,499",  originalPrice: "R2,950" },
  "tcl-85-mini-led-google":       { price: "R21,999", originalPrice: "R5,700" },
  "xiaomi-65-qled-4k":            { price: "R10,999", originalPrice: "R3,850" },
  "skyworth-75-android":          { price: "R9,999",  originalPrice: "R3,100" },
  "bennett-read-sponono-7kg":     { price: "R2,499",  originalPrice: "R200" },
  "bennett-read-top-loader-15kg": { price: "R7,999",  originalPrice: "R1,600" },
  "bosch-series4-dishwasher-14":  { price: "R12,999", originalPrice: "R4,100" },
  "bosch-series4-front-loader-9kg": { price: "R14,999", originalPrice: "R5,200" },
  "bosch-fridge-346l":            { price: "R12,999", originalPrice: "R5,300" },
  "defy-ddw242-13-place":         { price: "R8,999",  originalPrice: "R3,000" },
  "defy-dishwasher-13-place":     { price: "R5,999",  originalPrice: "R2,000" },
  "defy-top-loader-14kg":         { price: "R6,999",  originalPrice: "R2,300" },
  "defy-top-loader-8kg":          { price: "R3,499",  originalPrice: "R800" },
  "defy-fridge-335l":             { price: "R9,999",  originalPrice: "R3,900" },
  "hisense-bottom-freezer-326l":  { price: "R8,499",  originalPrice: "R3,200" },
  "hisense-front-loader-9kg":     { price: "R7,499",  originalPrice: "R2,500" },
  "hisense-dishwasher-12-place":  { price: "R4,999",  originalPrice: "R700" },
  "kic-fridge-freezer-276l":      { price: "R5,499",  originalPrice: "R1,600" },
  "lg-ai-direct-drive-10kg":      { price: "R14,999", originalPrice: "R5,600" },
  "midea-countertop-dishwasher-6": { price: "R4,999", originalPrice: "R2,000" },
  "midea-upright-231l":           { price: "R4,999",  originalPrice: "R1,450" },
  "samsung-fridge-freezer-321l":  { price: "R6,999",  originalPrice: "R1,800" },
  "samsung-front-loader-8kg":     { price: "R7,499",  originalPrice: "R650" },
  "bennett-read-microwave-20l":   { price: "R1,499",  originalPrice: "R500" },
  "bosch-series4-oven-hob-60cm":  { price: "R12,999", originalPrice: "R4,000" },
  "defy-oven-hob-60cm":           { price: "R7,999",  originalPrice: "R3,100" },
  "defy-solo-microwave-34l":      { price: "R3,499",  originalPrice: "R1,800" },
  "falco-combi-oven-ceran-60cm":  { price: "R5,999",  originalPrice: "R2,300" },
  "hisense-microwave-oven-28l":   { price: "R2,499",  originalPrice: "R1,100" },
  "hisense-oven-hob-60cm":        { price: "R3,999",  originalPrice: "R1,500" },
  "midea-microwave-20l":          { price: "R1,999",  originalPrice: "R750" },
  "samsung-grill-microwave-40l":  { price: "R4,999",  originalPrice: "R2,200" },
  "univa-u336b-oven-hob-60cm":    { price: "R2,999",  originalPrice: "R1,200" },
  "brother-hl1210w-wifi":         { price: "R1,299",  originalPrice: "R700" },
  "canon-isenys-lbp6030b":        { price: "R1,799",  originalPrice: "R1,000" },
  "hp-laserjet-m111w":            { price: "R1,799",  originalPrice: "R1,150" },
  "pantum-bp2305w-wifi":          { price: "R1,199",  originalPrice: "R600" },
  "pantum-p2512w-wifi":           { price: "R1,199",  originalPrice: "R600" },
  "xerox-b230-mono-laser":        { price: "R2,299",  originalPrice: "R1,450" },
  "hp-250-g9-512gb":              { price: "R7,999",  originalPrice: "R1,600" },
  "packard-bell-senna-r32":       { price: "R7,999",  originalPrice: "R2,300" },
  "acer-aspire-lite-256gb":       { price: "R7,499",  originalPrice: "R2,000" },
  "asus-vivobook-go-512gb":       { price: "R8,999",  originalPrice: "R1,800" },
  "dell-pro-15-512gb":            { price: "R10,999", originalPrice: "R3,800" },
  "macbook-neo-a18-pro-256gb":    { price: "R15,999", originalPrice: "R3,500" },
  "macbook-air-13-m4-256gb":      { price: "R22,499", originalPrice: "R4,800" },
  "macbook-air-15-m4-256gb":      { price: "R26,499", originalPrice: "R5,500" },
  "macbook-air-13-m5-256gb":      { price: "R26,499", originalPrice: "R7,400" },
  "macbook-pro-14-m5-512gb":      { price: "R42,999", originalPrice: "R13,400" },
  "apple-watch-se-2022-40mm":     { price: "R5,499",  originalPrice: "R1,233" },
  "apple-watch-se3-40mm":         { price: "R5,999",  originalPrice: "R2,500" },
  "apple-watch-series9-45mm":     { price: "R10,999", originalPrice: "R2,783" },
  "apple-watch-series10-46mm":    { price: "R12,499", originalPrice: "R3,325" },
  "apple-watch-series11-46mm":    { price: "R13,499", originalPrice: "R2,683" },
  "apple-watch-ultra-49mm":       { price: "R18,999", originalPrice: "R6,500" },
  "apple-watch-ultra2-49mm":      { price: "R17,999", originalPrice: "R4,150" },
  "apple-watch-ultra3-49mm":      { price: "R20,999", originalPrice: "R6,450" },
  "ipad-10th-64gb":               { price: "R9,499",  originalPrice: "R1,800" },
  "ipad-11th-128gb":              { price: "R11,499", originalPrice: "R3,600" },
  "ipad-mini-128gb":              { price: "R11,999", originalPrice: "R2,800" },
  "ipad-air-11-128gb":            { price: "R13,599", originalPrice: "R3,900" },
  "ipad-air-13-128gb":            { price: "R17,999", originalPrice: "R4,400" },
  "ipad-pro-11-256gb":            { price: "R21,499", originalPrice: "R5,100" },
  "ipad-pro-13-512gb":            { price: "R28,999", originalPrice: "R6,000" },
  "ipad-pro-13-1tb":              { price: "R36,999", originalPrice: "R8,000" },
  "iphone-13-pro-max-256":        { price: "R9,999",  originalPrice: "R3,850" },
  "iphone-14-pro-max-256":        { price: "R14,999", originalPrice: "R4,826" },
  "iphone-15-pro-max-256":        { price: "R22,999", originalPrice: "R5,740" },
  "iphone-16-pro-max-256":        { price: "R31,799", originalPrice: "R6,600" },
  "iphone-17-pro-max-256":        { price: "R28,999", originalPrice: "R10,850" },
  "lamborghini-revuelto-12v":     { price: "R4,499",  originalPrice: "R1,837" },
  "lamborghini-huracan-24v-1seat": { price: "R5,999", originalPrice: "R2,150" },
  "lamborghini-huracan-sto-drift": { price: "R6,499", originalPrice: "R2,450" },
  "lamborghini-huracan-24v-2seat": { price: "R7,999", originalPrice: "R3,200" },
  "lamborghini-urus-12v-suv":     { price: "R12,999", originalPrice: "R5,500" },
};

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const stmt = db.prepare(
    "UPDATE products SET price = ?, originalPrice = ?, updatedAt = ? WHERE id = ?"
  );
  const now = new Date().toISOString();

  let updated = 0;
  let notFound: string[] = [];

  const run = db.transaction(() => {
    for (const [id, { price, originalPrice }] of Object.entries(CORRECTIONS)) {
      const result = stmt.run(price, originalPrice, now, id);
      if (result.changes > 0) updated++;
      else notFound.push(id);
    }
  });

  run();
  exportProductsJson(db);

  return NextResponse.json({
    ok: true,
    updated,
    notFound,
    total: Object.keys(CORRECTIONS).length,
  });
}
