import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useLocation,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import MainLayout from "./layouts/MainLayout";
import { authCookie } from "./auth";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
];

const pathsOutsideMainLayout = ["/login", "/signup"];

export const loader = async ({
	request,
}: LoaderFunctionArgs): Promise<{ userId?: string }> => {
	const cookie = request.headers.get("Cookie");
	const userId = await authCookie.parse(cookie);
	return { userId };
};

export function Layout({ children }: { children: React.ReactNode }) {
	const userId = useLoaderData<typeof loader>();
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
