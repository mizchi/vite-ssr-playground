import ReactDOMServer from "react-dom/server";
import { defineConfig, type Plugin } from "vite";
import type * as SSR from "./src/entry.ssr";
import fs from "fs/promises";
const myssr = (): Plugin => {
	return {
		name: "myssr",
		// configureServer(server) {
		// 	return () => {
		// 		server.middlewares.use(async (req, res) => {
		// 			const ssr = (await server.ssrLoadModule(
		// 				"/src/entry.ssr.tsx",
		// 			)) as typeof SSR;
		// 			// console.log("req", req);
		// 			const url = req.originalUrl!.replace(/index\.html$/, "");
		// 			const element = ssr.render(url, {});
		// 			const stream = ReactDOMServer.renderToStaticNodeStream(element);
		// 			res.setHeader("Content-Type", "text/html");
		// 			stream.pipe(res);
		// 		});
		// 	};
		// },
		// async buildEnd( ) {
		// 	fs.writeFile("dist/_worker.js", `import { fetch } from '../server/_worker.js'; export default { fetch };`);
		// },
		// async closeBundle() {
		// 	await fs.writeFile(
		// 		"dist/_worker.js",
		// 		`import { fetch } from '../server/_worker.js'; export default { fetch };`,
		// 	);
		// 	console.log("write", "dist/_worker.js");
		// },
		// transform(code, id) {
		// 	// just once
		// 	if (id.includes("/src/entry.ssr.tsx")) {
		// 		this.emitFile({
		// 			type: "chunk",
		// 			id: "/src/entry.client.tsx",
		// 		});
		// 	}
		// 	// return html;
		// },
	} as Plugin;
};

export default defineConfig({
	plugins: [myssr()],
	// optimizeDeps: {
	// 	include: ["src/entry.client.tsx"],
	// },
	// ssr: {
	// 	target: "webworker",
	// 	noExternal: true,
	// 	format: "esm",
	// },
	build: {
		rollupOptions: {
			external: [
				/node\:.*/,
				// "node:url",
				// "node:process",
				// "node:fs",
				// "node:path",
				// "node:zlib",
				"tls",
				"querystring",
				// "node:stream",
				// "worker_threads",
				"vite",
				// "node:v8",
			],
		},
		// assetsDir: "server",
		// emptyOutDir: true,
		// @ts-ignore
		// ssr: {
		// },
		// ssr: true,
		// rollupOptions: {
		// 	input: ["src/entry.client.tsx"],
		// },
	},
});
