import type { NextConfig } from 'next'

import './src/env'

const nextConfig: NextConfig = {
  serverExternalPackages: ['@resvg/resvg-js', 'satori'],
}

export default nextConfig
