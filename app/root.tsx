import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import MainLayout from "./layouts/MainLayout";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
];

const pathsOutsideMainLayout = ["/login", "/signup"];

export function Layout({ children }: { children: React.ReactNode }) {
	const { pathname } = useLocation();
	const isOutsideMainLayout = pathsOutsideMainLayout.includes(pathname);

	if (typeof window !== "object") {
		console.log("server rendered");
	} else if (
		localStorage.theme === "dark" ||
		(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body className="bg-neutral-100 dark:bg-neutral-950 dark:text-neutral-200">
				{isOutsideMainLayout ? children : <MainLayout />}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
