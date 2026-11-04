import { defineConfig } from 'vite'

export default defineConfig({
  // The Slidev exporter always loads from "/", so the GitHub Pages base breaks exports.
  base: process.env.SLIDEV_EXPORT ? '/' : '/slidev-git/',
})
