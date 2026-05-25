/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile workspace packages (Next 15 espera explicit list pra ESM packages)
  transpilePackages: ["@dojo-fs/ui", "@dojo-fs/lib"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
