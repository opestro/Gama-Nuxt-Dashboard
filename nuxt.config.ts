import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  //css: ["@/assets/main.scss"], // vuetify ships precompiled css, no need to import sass
  typescript: {
    shim: false,
  },

  vite: {
    // @ts-ignore
    // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
    ssr: {
      noExternal: ["vuetify"], // add the vuetify vite plugin
    },
  },
  //build: { transpile: ["vuetify"] },
  modules: [
    "@pinia/nuxt",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config: any) =>
        // @ts-ignore
        config.plugins.push(vuetify({
                   styles: { configFile: resolve("/assets/scss/variables.scss") },
                 }))
      );
    },
  ],
  app: {
    head: {
      title:
        "Modernize Nuxt 3 - Vuetify 3 - vite - Typescript Based Admin Dashboard Template",
    },
  },
  nitro: {
    serveStatic: true,
  },

  sourcemap: { server: false, client: false },
  devServerHandlers: [],
  // hooks: {
  //   "vite:extendConfig": (config: any) => {
  //     config.plugins.push(
  //       vuetify({
  //         styles: { configFile: resolve("/assets/scss/variables.scss") },
  //       })
  //     );
  //   },
  // },
});
