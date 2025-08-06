import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['192.168.1.130'],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
