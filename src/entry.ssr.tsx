import Root from "./Root";
import { StaticRouter } from "react-router-dom/server";

export const render = (url: string, env: any) => {
	console.log("render", url, env);
	return (
		<>
			<StaticRouter location={url}>
				<Root />
			</StaticRouter>
		</>
	);
};
