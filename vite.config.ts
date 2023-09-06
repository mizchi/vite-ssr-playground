import {defineConfig, type Plugin} from 'vite';
import fs from 'fs';
import path from 'path';

const myssr = (): Plugin => {
  return {
    name: 'myssr',
    configureServer(server) {
      const templateBase = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      );
      return () => {
        server.middlewares.use(async (req, res) => {
          const url = req.originalUrl! ?? req.url!;
          const ssr = await server.ssrLoadModule('/src/entry.ssr.tsx');
          const content = ssr.render(req);
          const transformed = await server.transformIndexHtml(url, templateBase);
          const html = transformed.replace(`<!--ssr-outlet-->`, content);
          res.setHeader('Content-Type', 'text/html')
          res.end(html)
        });
      }
    }
  }
};

export default defineConfig({
  plugins: [
    myssr()
  ],
  build: {
    ssr: true,
    rollupOptions: {
      input: ['src/entry.ssr.tsx']
    }
  }
});