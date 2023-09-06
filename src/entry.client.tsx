import { ClientRoot } from "./Root";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

function ClientApp() {
	return (
		<BrowserRouter>
			<ClientRoot />
		</BrowserRouter>
	);
}
hydrateRoot(document.getElementById("app")!, <ClientApp />);

console.log("client");
