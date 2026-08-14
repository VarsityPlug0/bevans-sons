/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["better-sqlite3", "cloudinary", "nodemailer"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "fdn2.gsmarena.com" },
      { protocol: "https", hostname: "gmedia.playstation.com" },
      { protocol: "https", hostname: "store.storeimages.cdn-apple.com" },
      { protocol: "https", hostname: "images.samsung.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/solar",                       destination: "/shop?cat=Solar%20%26%20Power%20Solutions", permanent: true },
      { source: "/solar/:path*",                destination: "/shop?cat=Solar%20%26%20Power%20Solutions", permanent: true },
      { source: "/electronics",                 destination: "/shop",                                     permanent: true },
      { source: "/electronics/:path*",          destination: "/shop",                                     permanent: true },
    ];
  },
};

module.exports = nextConfig;
