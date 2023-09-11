import fs from 'fs/promises';
import reactRefresh from '@vitejs/plugin-react-refresh';
const dependencies = require('./package.json').dependencies;

const isWebsiteBuild = process.env.WEBSITE;
const isLibBuild = process.env.LIB;

const external = ['react', '@react-three/drei', '@react-three/fiber', 'three'];

/** Run against local source */
const getAliases = async (frameworkName, frameworkRootDir) => {
  const modules = await fs.readdir(`${frameworkRootDir}/src`);
  const aliases = {};
  for (const module of modules) {
    aliases[
      `${frameworkName}/${module}`
    ] = `${frameworkRootDir}/modules/${module}/`;
  }
  return aliases;
};

export default {
  plugins: [reactRefresh()],
  assetsInclude: ['**/*.glb'],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  base: process.env['base'] || '/doodles',
  json: {
    stringify: true,
  },
  build: {
    commonjsOptions: {
      requireReturnsDefault: 'namespace',
    },
    rollupOptions: {
      external,
      terserOptions: {
        treeshake: {
          unusedExports: true,
          moduleSideEffects: false,
        },
      },
    },
    ...(isLibBuild && {
      rollupOptions: {
        input: {
          adapter: 'src/adapter/index.ts',
          shader: 'src/shader/index.ts',
          main: 'src/main.ts',
        },
        output: {
          output: {
            format: 'cjs',
            dir: 'dist/cjs',
          },
          manualChunks: (filePath) => {
            if (filePath.includes('node_modules')) {
              return 'vendor';
            } else if (filePath.includes('src/adapter')) {
              return 'adapter';
            } else if (filePath.includes('src/shader')) {
              return 'shader';
            }
          },
        },
      },
    }),
    ...(isWebsiteBuild && {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const dependenciesKeys = Object.keys(dependencies);
              const match = dependenciesKeys.find((item) => {
                return id.includes(item);
              });
              if (match && !external.includes(match)) {
                return match;
              }
            }
          },
        },
      },
    }),
  },
};
