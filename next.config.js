/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "i.imgur.com",
            port: ""
        },
        {
            protocol: "https",
            hostname: "polcxtixgqxfuvrqgthn.supabase.co",
            port: ""
        }
    ]
  },
}

module.exports = nextConfig
