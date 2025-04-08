// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts", // Ruta al archivo de entrada (donde exportas tu clase Cart)
      name: "localstoragecart", // Nombre global de la librería
      fileName: (format) => `localstoragecart.${format}.js`, // Cómo se va a nombrar el archivo empaquetado
    },
    rollupOptions: {
      external: [], // Puedes agregar dependencias externas si las usas
      output: {
        dir: "dist",
        format: "esm",
      },
    },
  },
});
