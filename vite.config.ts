import reactRefresh from '@vitejs/plugin-react-refresh';
export default {
  plugins: [reactRefresh()],
  base: process.env['base'] || '/doodles',
  json: {
    stringify: true, // faster parse for emoji data
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (filePath) => {
          if (filePath.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
};
