import sqlite3, csv

corrections = {
    "ps5-slim-digital-1tb":"R12,999","ps5-slim-disc-1tb":"R13,999","ps5-slim-fortnite-bundle":"R14,499",
    "ps5-standard-gt7-bundle":"R15,499","ps5-pro-2tb":"R20,999","xbox-series-s-512gb":"R8,999",
    "xbox-series-s-1tb":"R10,999","xbox-series-x-digital":"R15,999","xbox-series-x-1tb":"R16,999",
    "xbox-series-x-galaxy-black":"R19,999","logitech-g923-ps-pc":"R9,955","logitech-g923-xbox-pc":"R9,955",
    "logitech-g923-ps-shifter":"R12,499","logitech-g923-xbox-shifter":"R12,499","logitech-g923-premium-set":"R13,999",
    "pcbuilder-defender-ryzen5":"R9,999","asus-rog-rtx4060ti":"R19,999","msi-gaming-rtx4060":"R16,999",
    "lenovo-legion-rtx4070":"R24,999","hp-omen-rtx4070-super":"R29,999",
    "samsung-55-crystal-uhd":"R8,499","samsung-65-neo-qled":"R14,999","samsung-85-crystal-uhd":"R17,999",
    "samsung-98-crystal-uhd":"R44,999","hisense-55-4k-uhd":"R7,999","hisense-75-qled-4k":"R13,999",
    "hisense-98-qled-4k":"R29,999","lg-65-uhd-4k-ai":"R11,999","tcl-55-qled-google":"R8,499",
    "tcl-85-mini-led-google":"R21,999","xiaomi-65-qled-4k":"R10,999","skyworth-75-android":"R9,999",
    "bennett-read-sponono-7kg":"R2,499","bennett-read-top-loader-15kg":"R7,999",
    "bosch-series4-dishwasher-14":"R12,999","bosch-series4-front-loader-9kg":"R14,999",
    "bosch-fridge-346l":"R12,999","defy-ddw242-13-place":"R8,999","defy-dishwasher-13-place":"R5,999",
    "defy-top-loader-14kg":"R6,999","defy-top-loader-8kg":"R3,499","defy-fridge-335l":"R9,999",
    "hisense-bottom-freezer-326l":"R8,499","hisense-front-loader-9kg":"R7,499",
    "hisense-dishwasher-12-place":"R4,999","kic-fridge-freezer-276l":"R5,499",
    "lg-ai-direct-drive-10kg":"R14,999","midea-countertop-dishwasher-6":"R4,999",
    "midea-upright-231l":"R4,999","samsung-fridge-freezer-321l":"R6,999","samsung-front-loader-8kg":"R7,499",
    "bennett-read-microwave-20l":"R1,499","bosch-series4-oven-hob-60cm":"R12,999",
    "defy-oven-hob-60cm":"R7,999","defy-solo-microwave-34l":"R3,499","falco-combi-oven-ceran-60cm":"R5,999",
    "hisense-microwave-oven-28l":"R2,499","hisense-oven-hob-60cm":"R3,999","midea-microwave-20l":"R1,999",
    "samsung-grill-microwave-40l":"R4,999","univa-u336b-oven-hob-60cm":"R2,999",
    "brother-hl1210w-wifi":"R1,299","canon-isenys-lbp6030b":"R1,799","hp-laserjet-m111w":"R1,799",
    "pantum-bp2305w-wifi":"R1,199","pantum-p2512w-wifi":"R1,199","xerox-b230-mono-laser":"R2,299",
    "hp-250-g9-512gb":"R7,999","packard-bell-senna-r32":"R7,999","acer-aspire-lite-256gb":"R7,499",
    "asus-vivobook-go-512gb":"R8,999","dell-pro-15-512gb":"R10,999","macbook-neo-a18-pro-256gb":"R15,999",
    "macbook-air-13-m4-256gb":"R22,499","macbook-air-15-m4-256gb":"R26,499",
    "macbook-air-13-m5-256gb":"R26,499","macbook-pro-14-m5-512gb":"R42,999",
    "apple-watch-se-2022-40mm":"R5,499","apple-watch-se3-40mm":"R5,999",
    "apple-watch-series9-45mm":"R10,999","apple-watch-series10-46mm":"R12,499",
    "apple-watch-series11-46mm":"R13,499","apple-watch-ultra-49mm":"R18,999",
    "apple-watch-ultra2-49mm":"R17,999","apple-watch-ultra3-49mm":"R20,999",
    "ipad-10th-64gb":"R9,499","ipad-11th-128gb":"R11,499","ipad-mini-128gb":"R11,999",
    "ipad-air-11-128gb":"R13,599","ipad-air-13-128gb":"R17,999","ipad-pro-11-256gb":"R21,499",
    "ipad-pro-13-512gb":"R28,999","ipad-pro-13-1tb":"R36,999",
    "iphone-13-pro-max-256":"R9,999","iphone-14-pro-max-256":"R14,999",
    "iphone-15-pro-max-256":"R22,999","iphone-16-pro-max-256":"R31,799","iphone-17-pro-max-256":"R28,999",
    "lamborghini-revuelto-12v":"R4,499","lamborghini-huracan-24v-1seat":"R5,999",
    "lamborghini-huracan-sto-drift":"R6,499","lamborghini-huracan-24v-2seat":"R7,999",
    "lamborghini-urus-12v-suv":"R12,999",
}

old_prices = {
    "ps5-slim-digital-1tb":"R2,300","ps5-slim-disc-1tb":"R2,500","ps5-slim-fortnite-bundle":"R2,300",
    "ps5-standard-gt7-bundle":"R2,800","ps5-pro-2tb":"R3,600","xbox-series-s-512gb":"R2,400",
    "xbox-series-s-1tb":"R2,600","xbox-series-x-digital":"R3,700","xbox-series-x-1tb":"R3,200",
    "xbox-series-x-galaxy-black":"R4,450","logitech-g923-ps-pc":"R2,300","logitech-g923-xbox-pc":"R2,600",
    "logitech-g923-ps-shifter":"R3,300","logitech-g923-xbox-shifter":"R3,500","logitech-g923-premium-set":"R4,000",
    "pcbuilder-defender-ryzen5":"R4,800","asus-rog-rtx4060ti":"R8,200","msi-gaming-rtx4060":"R6,500",
    "lenovo-legion-rtx4070":"R10,800","hp-omen-rtx4070-super":"R12,400",
    "samsung-55-crystal-uhd":"R1,900","samsung-65-neo-qled":"R4,600","samsung-85-crystal-uhd":"R4,900",
    "samsung-98-crystal-uhd":"R7,800","hisense-55-4k-uhd":"R2,400","hisense-75-qled-4k":"R4,340",
    "hisense-98-qled-4k":"R6,300","lg-65-uhd-4k-ai":"R3,300","tcl-55-qled-google":"R2,950",
    "tcl-85-mini-led-google":"R5,700","xiaomi-65-qled-4k":"R3,850","skyworth-75-android":"R3,100",
    "bennett-read-sponono-7kg":"R200","bennett-read-top-loader-15kg":"R1,600",
    "bosch-series4-dishwasher-14":"R4,100","bosch-series4-front-loader-9kg":"R5,200",
    "bosch-fridge-346l":"R5,300","defy-ddw242-13-place":"R3,000","defy-dishwasher-13-place":"R2,000",
    "defy-top-loader-14kg":"R2,300","defy-top-loader-8kg":"R800","defy-fridge-335l":"R3,900",
    "hisense-bottom-freezer-326l":"R3,200","hisense-front-loader-9kg":"R2,500",
    "hisense-dishwasher-12-place":"R700","kic-fridge-freezer-276l":"R1,600",
    "lg-ai-direct-drive-10kg":"R5,600","midea-countertop-dishwasher-6":"R2,000",
    "midea-upright-231l":"R1,450","samsung-fridge-freezer-321l":"R1,800","samsung-front-loader-8kg":"R650",
    "bennett-read-microwave-20l":"R500","bosch-series4-oven-hob-60cm":"R4,000",
    "defy-oven-hob-60cm":"R3,100","defy-solo-microwave-34l":"R1,800","falco-combi-oven-ceran-60cm":"R2,300",
    "hisense-microwave-oven-28l":"R1,100","hisense-oven-hob-60cm":"R1,500","midea-microwave-20l":"R750",
    "samsung-grill-microwave-40l":"R2,200","univa-u336b-oven-hob-60cm":"R1,200",
    "brother-hl1210w-wifi":"R700","canon-isenys-lbp6030b":"R1,000","hp-laserjet-m111w":"R1,150",
    "pantum-bp2305w-wifi":"R600","pantum-p2512w-wifi":"R600","xerox-b230-mono-laser":"R1,450",
    "hp-250-g9-512gb":"R1,600","packard-bell-senna-r32":"R2,300","acer-aspire-lite-256gb":"R2,000",
    "asus-vivobook-go-512gb":"R1,800","dell-pro-15-512gb":"R3,800","macbook-neo-a18-pro-256gb":"R3,500",
    "macbook-air-13-m4-256gb":"R4,800","macbook-air-15-m4-256gb":"R5,500",
    "macbook-air-13-m5-256gb":"R7,400","macbook-pro-14-m5-512gb":"R13,400",
    "apple-watch-se-2022-40mm":"R1,233","apple-watch-se3-40mm":"R2,500",
    "apple-watch-series9-45mm":"R2,783","apple-watch-series10-46mm":"R3,325",
    "apple-watch-series11-46mm":"R2,683","apple-watch-ultra-49mm":"R6,500",
    "apple-watch-ultra2-49mm":"R4,150","apple-watch-ultra3-49mm":"R6,450",
    "ipad-10th-64gb":"R1,800","ipad-11th-128gb":"R3,600","ipad-mini-128gb":"R2,800",
    "ipad-air-11-128gb":"R3,900","ipad-air-13-128gb":"R4,400","ipad-pro-11-256gb":"R5,100",
    "ipad-pro-13-512gb":"R6,000","ipad-pro-13-1tb":"R8,000",
    "iphone-13-pro-max-256":"R3,850","iphone-14-pro-max-256":"R4,826",
    "iphone-15-pro-max-256":"R5,740","iphone-16-pro-max-256":"R6,600","iphone-17-pro-max-256":"R10,850",
    "lamborghini-revuelto-12v":"R1,837","lamborghini-huracan-24v-1seat":"R2,150",
    "lamborghini-huracan-sto-drift":"R2,450","lamborghini-huracan-24v-2seat":"R3,200",
    "lamborghini-urus-12v-suv":"R5,500",
}

conn = sqlite3.connect('data/daisy.db')
rows = conn.execute("SELECT id, name, category FROM products WHERE id IN ({})".format(
    ','.join(['?']*len(corrections))), list(corrections.keys())).fetchall()
conn.close()

name_map = {r[0]: (r[1], r[2]) for r in rows}

csv_rows = []
for pid in sorted(corrections.keys(), key=lambda x: (name_map.get(x,('',''))[1], name_map.get(x,('',''))[0])):
    name, cat = name_map.get(pid, (pid, 'Unknown'))
    csv_rows.append({
        "Category": cat,
        "Product": name,
        "Old Price": old_prices.get(pid, '-'),
        "New Price": corrections[pid],
    })

with open('data/price-corrections-2026.csv', 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(f, fieldnames=["Category","Product","Old Price","New Price"])
    w.writeheader()
    w.writerows(csv_rows)

print(f"Done: {len(csv_rows)} rows written to data/price-corrections-2026.csv")
