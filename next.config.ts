import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/ressources/pourquoi-jai-cree-cree",
        destination: "/ressources/pourquoi-jai-cree-cirrion",
        permanent: true,
      },
      {
        source: "/ressources/pourquoi-jai-cree-cree-cirrion",
        destination: "/ressources/pourquoi-jai-cree-cirrion",
        permanent: true,
      },
      {
        source: "/alternatives/floxia-vs-obat",
        destination: "/alternatives/cirrion-vs-obat",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
