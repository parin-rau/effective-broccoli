import { Outlet } from "@remix-run/react";
import Navbar from "~/components/navbar/Navbar";

export default function MainLayout() {
	return (
		<div className="flex">
			<Navbar />
			<div className="relative w-full">
				<Outlet />
			</div>
		</div>
	);
}
