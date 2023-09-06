import { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./routes/index"));
const About = lazy(() => import("./routes/about"));

export function ClientRoot() {
	return (
		<>
			<h1>Router App</h1>
			<nav>
				<Link to="/">Home</Link>|<Link to="/about">About</Link>
			</nav>
			<hr />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route index Component={Home} />
					<Route path="about" Component={About} />
				</Routes>
			</Suspense>
		</>
	);
}

export default function Root() {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>SSR Example</title>
			</head>
			<body>
				<div id="app">
					<ClientRoot />
				</div>
				<script type="module" src="/src/entry.client.tsx" />
			</body>
		</html>
	);
}
