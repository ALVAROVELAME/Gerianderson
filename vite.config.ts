import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      test: /\.(webp|svg)$/i, // Foca apenas no que você usa
      includePublic: true,
      logStats: true,
      // Otimização para WebP (apenas compressão, sem conversão de formato)
      webp: {
        quality: 80,
        lossless: false, // Define como false para permitir uma compressão melhor
      },
      // Otimização para SVG
      svg: {
        multipass: true,
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    })
  ],
})