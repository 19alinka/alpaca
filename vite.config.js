import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    assetsInlineLimit: (filePath) => {
      return filePath.endsWith('.svg') || filePath.endsWith('.webp') || filePath.endsWith('.avif') || filePath.endsWith('.png') ? false : 4096;
    }
  },
  base: "/alpaca",
  plugins: [
    ViteImageOptimizer({
      webp: {
        quality: 80,
      },
      avif: {
        quality: 80,
      },
      png: {
        quality: 80,
      },
    }),
  ],
});