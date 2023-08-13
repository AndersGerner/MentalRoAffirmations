import { withExpo } from '@expo/next-adapter'
import './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  transpilePackages: [
    'react-native',
    'react-native-web',
    'solito',
    'dripsy',
    '@dripsy/core',
    'moti',
    'app',
    'react-native-reanimated',
    '@expo/html-elements',
    'react-native-gesture-handler',
  ],
}

export default withExpo(nextConfig)
