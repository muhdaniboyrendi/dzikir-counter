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

  modules: ["@nuxtjs/seo", "@vueuse/motion/nuxt", "@nuxtjs/color-mode"],

  colorMode: {
    classSuffix: "",
  },

  app: {
    head: {
      title: "Dzikir Lailatul Qadar",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Aplikasi dzikir digital dengan tema Lailatul Qadar",
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=Lato:wght@300;400;700&display=swap",
        },
      ],
    },
  },
});
