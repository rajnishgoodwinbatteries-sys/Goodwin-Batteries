import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/warranty-registration',
        destination: '/support/warranty-registration',
        permanent: true,
      },
      {
        source: '/warranty/registration',
        destination: '/support/warranty-registration',
        permanent: true,
      },
      {
        source: '/register-warranty',
        destination: '/support/warranty-registration',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
