import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const page = (file: string) => fileURLToPath(new URL(file, import.meta.url));

// Two pages: the website (index.html) and the A4 CV used to generate the PDF (print.html).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: page("./index.html"),
        print: page("./print.html"),
      },
    },
  },
});
