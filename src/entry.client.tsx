import Root from "./Root";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

hydrateRoot(document.getElementById("app")!, <>
    <BrowserRouter><Root /></BrowserRouter>
  </>
);
