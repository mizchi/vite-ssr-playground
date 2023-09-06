import ReactDOMServer from "react-dom/server";
import { render } from "./entry.ssr";

const ssrEndpoint = ["/", "/about"];

async function fetch(req: Request, env: any) {
	const url = new URL(req.url);
	const pathname = url.pathname.replace(/index\.html(\?.*)?$/, "");
	if (ssrEndpoint.includes(pathname)) {
		(globalThis as any).__env = env;
		const element = render(pathname, env);
		const stream = await ReactDOMServer.renderToReadableStream(element);
		return new Response(stream, {
			headers: {
				"X-Content-Type-Options": "nosniff",
				"content-type": "text/html",
			},
		});
	}
	const newUrl = Object.assign(new URL(req.url), { port: 5173 }).toString();
	const newReq = new Request(newUrl, req);
	return globalThis.fetch(newReq);
}

export default { fetch };
