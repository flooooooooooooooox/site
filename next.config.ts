import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/alternatives/floxia-vs-obat",
        destination: "/alternatives/cirrion-vs-obat",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
