import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),

  // Seed command configuration (ersetzt package.json#prisma)
  seed: {
    command: 'tsx prisma/seed.ts',
  },
})
