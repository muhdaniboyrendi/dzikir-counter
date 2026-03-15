// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: [
    "./app/assets/css/main.css",
    "bootstrap-icons/font/bootstrap-icons.css",
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxtjs/seo",
    "@vueuse/motion/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@vite-pwa/nuxt",
  ],

  colorMode: {
    classSuffix: "",
  },

  site: {
    url: "https://dzikircounter.erlanazhari.my.id",
    name: "Dzikir Counter",
    description: "Aplikasi penghitung dzikir digital",
    defaultLocale: "id",
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  ogImage: {
    enabled: true,
    defaults: {
      component: "NuxtSeo",
      props: {
        colorMode: "light",
      },
    },
  },

  sitemap: {
    enabled: true,
  },

  robots: {
    enabled: true,
    allow: ["/"],
  },

  schemaOrg: {
    enabled: true,
    identity: {
      type: "WebSite",
      name: "Dzikir Counter",
      url: "https://dzikircounter.erlanazhari.my.id",
      description: "Aplikasi penghitung dzikir digital",
    },
  },

  app: {
    head: {
      title: "Dzikir Counter",
      titleTemplate: "%s | Dzikir Counter",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Aplikasi penghitung dzikir digital",
        },

        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Dzikir Counter" },
        { property: "og:title", content: "Dzikir Counter" },
        {
          property: "og:description",
          content: "Aplikasi penghitung dzikir digital",
        },
        {
          property: "og:image",
          content: "https://dzikircounter.erlanazhari.my.id/og-image.png",
        },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Dzikir Counter" },
        {
          name: "twitter:description",
          content: "Aplikasi penghitung dzikir digital",
        },
        {
          name: "twitter:image",
          content: "https://dzikircounter.erlanazhari.my.id/og-image.png",
        },

        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
        { name: "apple-mobile-web-app-title", content: "Dzikir Counter" },
        { name: "theme-color", content: "#F0E8D5" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=Lato:wght@300;400;700&display=swap",
        },
        { rel: "apple-touch-icon", href: "/icon.png" },
      ],
    },
  },

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Dzikir Counter",
      short_name: "DzikirCounter",
      description: "Aplikasi untuk melakukan penghitungan dzikir",
      theme_color: "#F0E8D5",
      background_color: "#F0E8D5",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "/icon.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: true,
    },
  },
});
