export const DEVICE_CATEGORIES = [
  "Smartphones",
  "TVs",
  "Gaming Consoles",
  "Gaming PCs",
  "Tablets & Watches",
  "Laptops & MacBooks",
  "Home Appliances",
  "Solar & Power Solutions",
  "Electric Ride-On Cars",
  "Kitchen Appliances",
  "Office Equipment",
  "Furniture",
];

export const CLOTHING_CATEGORIES = [
  "Clothing & Apparel",
  "Men's Wear",
  "Women's Fashion",
  "Hoodies & Streetwear",
  "Sneakers & Shoes",
  "Caps & Accessories",
];

export const CATEGORIES = [
  ...DEVICE_CATEGORIES,
  ...CLOTHING_CATEGORIES,
];

export function isClothingCategory(cat: string): boolean {
  return CLOTHING_CATEGORIES.includes(cat) || cat.toLowerCase().includes("clothing") || cat.toLowerCase().includes("wear") || cat.toLowerCase().includes("shoes") || cat.toLowerCase().includes("sneakers") || cat.toLowerCase().includes("hoodie");
}

export function isDeviceCategory(cat: string): boolean {
  return !isClothingCategory(cat);
}


