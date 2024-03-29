/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import mkcert from 'vite-plugin-mkcert'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        importScripts: ['/assets/js/sw.js'],
        navigateFallbackDenylist: [/^\/graphql/],
      },
      includeAssets: ['/assets/icons/logo.svg', '/assets/icons/favicon.ico', '/assets/icons/apple-touch-icon.png'],
      manifest: {
        name: 'Carful',
        short_name: 'Carful',
        description: 'Carful',
        theme_color: '#0E1F4D',
        background_color: '#0E1F4D',
        icons: [
          {
            src: '/assets/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/assets/icons/android-chrome-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/assets/icons/android-chrome-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        scope: '/',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        id: 'carful.app',
      },
    }),
    vue(),
    mkcert(),
    Components({
      dts: true,
      dirs: ['src/components', 'src/views'],
    }),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        {
          '@vue/apollo-composable': [
            'useQuery',
            'useLazyQuery',
            'useMutation',
            'provideApolloClient',
            'DefaultApolloClient',
          ],
          '@apollo/client/core': ['ApolloClient', 'ApolloLink', 'from', 'createHttpLink', 'InMemoryCache'],
          'apollo3-cache-persist': ['CachePersistor', 'LocalStorageWrapper'],
          'graphql-tag': ['gql'],
          'vue-router': ['createRouter', 'createWebHistory', 'useRouter'],
          '@vueuse/core': [
            'useGeolocation',
            'useWindowSize',
            'refAutoReset',
            'useLocalStorage',
            'useWebNotification',
            'useSupported',
          ],
          '@vuelidate/core': ['useVuelidate'],
          'vue-i18n': ['createI18n', 'useI18n'],
        },
      ],
      dts: true,
      eslintrc: {
        enabled: true,
      },
      dirs: ['src/stores', 'src/apollo', 'src/router', 'src/i18n'],
    }),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/i18n/locales/**')],
    }),
  ],
  server: {
    host: 'app.carful.local',
    port: 8080,
    https: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  build: {
    target: 'esnext',
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
