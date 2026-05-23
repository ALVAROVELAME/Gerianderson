import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      test: /\.(webp|svg)$/i,
      includePublic: true,
      logStats: true,
      // Configuração otimizada para compressão eficiente
      webp: {
        quality: 75,
        lossless: false,
      },
      // Configuração otimizada para SVGs
      svg: {
        multipass: true,
        plugins: [
          { 
            name: 'preset-default', 
            params: { 
              overrides: { 
                removeViewBox: false 
              } 
            } 
          },
          { name: 'removeTitle' },
          { name: 'removeDesc' }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        // Separa o React e outras dependências em um arquivo chamado 'vendor'
        // Isso diminui o tamanho do seu código principal (index.js)
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})