import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        masBleu: resolve(__dirname, 'mas-bleu/index.html'),
        cabaneDuProducteur: resolve(__dirname, 'cabane-du-producteur/index.html'),
      },
    },
  },
})
