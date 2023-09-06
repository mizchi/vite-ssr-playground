import ReactDOMServer from "react-dom/server";
import { defineConfig, type Plugin } from "vite";
import fs from "fs/promises";
// import type * as SSR from "./src/entry.ssr";

export default defineConfig({
	plugins: [],
	build: {
		emptyOutDir: true,
	},
});
