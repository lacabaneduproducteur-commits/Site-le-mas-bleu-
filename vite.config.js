import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        masBleu: resolve(__dirname, 'mas-bleu/index.html'),
        cabaneDuProducteur: resolve(__dirname, 'cabane-du-producteur/index.html'),
        maisonColoniale: resolve(__dirname, 'maison-coloniale/index.html'),
        verger: resolve(__dirname, 'verger/index.html'),
        marches: resolve(__dirname, 'marches/index.html'),
      },
    },
  },
})
