export interface StoreInfo {
  storeName: string
  storeTagline: string
  storeReg: string
  email: string
  phone: string
  whatsapp: string
  address: string
  instagram: string
  tiktok: string
  facebook: string
}

const DEFAULTS: StoreInfo = {
  storeName: 'Bevans Sons',
  storeTagline: 'Premium sneakers for those who move different. Born in South Africa.',
  storeReg: '2023/116995/07',
  email: 'MkhabeleEnterprise@gmail.com',
  phone: '0724816274',
  whatsapp: '27724816274',
  address: '',
  instagram: 'https://instagram.com',
  tiktok: 'https://tiktok.com',
  facebook: 'https://facebook.com',
}

let cached: StoreInfo | null = null

export async function fetchStoreInfo(): Promise<StoreInfo> {
  if (cached) return cached
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store-info`, { next: { revalidate: 60 } })
    if (!res.ok) return DEFAULTS
    const data = await res.json()
    // Merge with defaults so empty fields fall back gracefully
    cached = {
      storeName: data.storeName || DEFAULTS.storeName,
      storeTagline: data.storeTagline || DEFAULTS.storeTagline,
      storeReg: data.storeReg || DEFAULTS.storeReg,
      email: data.email || DEFAULTS.email,
      phone: data.phone || DEFAULTS.phone,
      whatsapp: data.whatsapp || DEFAULTS.whatsapp,
      address: data.address || DEFAULTS.address,
      instagram: data.instagram || DEFAULTS.instagram,
      tiktok: data.tiktok || DEFAULTS.tiktok,
      facebook: data.facebook || DEFAULTS.facebook,
    }
    return cached
  } catch {
    return DEFAULTS
  }
}
