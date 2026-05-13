// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://forge-co.ca",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/thank-you/") && !page.includes("/pricing/"),
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
