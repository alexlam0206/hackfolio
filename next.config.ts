import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "localhost:3000",
    "localhost:3001",
    "192.168.1.183",
    "192.168.1.183:3000",
    "192.168.1.183:3001",
    "mac-mini.local:3000",
    "mac-mini.local:3001",
    "hackfolio.lamyn.tech"
  ]
};

export default nextConfig;
