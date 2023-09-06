import { render } from "./dist/entry.ssr.mjs";
import fs from "node:fs/promises";
import path from "node:path";
import { globSync } from "glob";
import { fileURLToPath } from "node:url";
import ReactDOMServer from "react-dom/server";
// import ma from "./dist/ssr-manifest.json" assert { type: "json" };
// import { tra } from 'vite'
// import vite from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function findClientEntryAsset() {
  const files = await fs.readdir("dist/assets");
  const found = files.find((file) => {
    const base = path.basename(file);
    return base.startsWith('entry.client');
  });
  // console.log(found);
  if (found) {
    // const [, post] = found.split("dists/assets");
    return '/' + path.join("assets", found);
  }
  throw new Error("No assets");

  // const manifest = JSON.parse(
  //   await fs.readFile(path.resolve(__dirname, "dist", ""), "utf-8")
  // );
  // return manifest["index.html"].file;
}

const routes = globSync("src/routes/**/*.tsx", {
  nodir: true
});
// console.log(routes);
const routesToPrerender = routes.map((route) => {
  const dir = path.dirname(route).replace("src/routes", "");
  return dir + path.basename(route, ".tsx");
});

const clientEntryPath = await findClientEntryAsset();
// console.log(clientEntryPath);
// console.log(routesToPrerender);

// const baseHtml = fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
for (const route of routesToPrerender) {
  const url = route.replace(/index$/, "");

  // const transformed = await vite.transformIndexHtml(url, baseHtml);
  // const [prevHtml, postHtml] = transformed.split("<!--ssr-outlet-->");

  const element = await render('/' + url);
  const stream = ReactDOMServer.renderToStaticNodeStream(element);
  const html = await streamToString(stream);
  // html.replace()
  // const result = prevHtml + html + postHtml;
  const replaced = html.replace("/src/entry.client.tsx", clientEntryPath);
  // console.log(replaced);
  await fs.writeFile(
    path.join(__dirname, "dist", route + ".html"),
    replaced
  );
}
// console.log(routes);  

function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}