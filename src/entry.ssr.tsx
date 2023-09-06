import App from "./Root";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

export const render = (_req: Request) => {
  const url = _req.url!.replace(/index\.html$/, '');
  return renderToString(<>
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  </>);
};
