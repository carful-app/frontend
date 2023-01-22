import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      dirs: ['src/components', 'src/views'],
    }),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        {
          '@vue/apollo-composable': ['useQuery', 'provideApolloClient', 'DefaultApolloClient'],
          '@apollo/client/core': ['ApolloClient', 'ApolloLink', 'concat', 'createHttpLink', 'InMemoryCache'],
          'graphql-tag': ['gql'],
          'vue-router': ['createRouter', 'createWebHistory', 'useRouter'],
        },
      ],
      dts: true,
      eslintrc: {
        enabled: true,
      },
      dirs: ['src/stores', 'src/apollo', 'src/router'],
    }),
  ],
  server: {
    host: 'app.carful.local',
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
