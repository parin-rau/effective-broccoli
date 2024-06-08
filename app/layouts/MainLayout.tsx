import { Outlet } from "@remix-run/react";
import Headerbar from "~/components/navbar/Headerbar";
import Navbar from "~/components/navbar/Navbar";

export default function MainLayout() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-[150px_auto] bg-inherit">
			<header className="sticky top-0 col-span-2">
				<Headerbar />
			</header>
			<aside className="hidden sm:block self-start sticky top-0 ">
				<Navbar />
			</aside>
			<main className="relative w-full bg-inherit">
				<Outlet />
			</main>
		</div>
	);
}
