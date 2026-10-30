/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets the Next.js dev server accept requests (including the HMR
  // WebSocket) from tunnel domains instead of only localhost. The
  // wildcard covers every random subdomain ngrok's free tier generates,
  // so you don't need to update this every time you restart the tunnel.
  allowedDevOrigins: ["*.ngrok-free.dev", "*.ngrok-free.app", "*.loca.lt"],
};

module.exports = nextConfig;
