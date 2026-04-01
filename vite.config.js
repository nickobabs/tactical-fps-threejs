import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['recast-navigation'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/examples/jsm/loaders/')) {
            return 'three-loaders';
          }

          if (id.includes('node_modules/recast-navigation')) {
            return 'recast';
          }

          if (id.includes('node_modules/three') || id.includes('node_modules/three-mesh-bvh')) {
            return 'three-vendor';
          }

          if (id.includes('node_modules/colyseus.js')) {
            return 'net-vendor';
          }

          return undefined;
        },
      },
    },
  },
});
