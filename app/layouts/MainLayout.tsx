import { Outlet } from "@remix-run/react";
import { useState } from "react";
import Hamburger from "~/assets/Hamburger";
import Headerbar from "~/components/navbar/Headerbar";
import Navbar from "~/components/navbar/Navbar";
import TransparentButton from "~/components/ui/TransparentButton";

function MobileSidebar({
	isOpen,
	toggleOpen,
}: {
	isOpen: boolean;
	toggleOpen: () => void;
}) {
	return (
		<aside className="sm:hidden fixed left-0 top-0 h-screen w-[150px]">
			<Navbar isOpen={isOpen}>
				<TransparentButton onClick={toggleOpen}>
					<Hamburger />
				</TransparentButton>
			</Navbar>
		</aside>
	);
}

export default function MainLayout() {
	const [isOpenSidebar, setOpenSidebar] = useState(false);
	const toggleSidebar = () => setOpenSidebar((prev) => !prev);

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-[150px_auto] bg-inherit">
				<header className="sticky top-0 col-span-2">
					<Headerbar toggleSidebar={toggleSidebar} />
				</header>
				<aside className="hidden sm:block self-start sticky top-0 ">
					<Navbar />
				</aside>
				<main className="relative w-full bg-inherit">
					<Outlet />
				</main>
			</div>
			{isOpenSidebar && (
				<MobileSidebar
					isOpen={isOpenSidebar}
					toggleOpen={toggleSidebar}
				/>
			)}
		</>
	);
}
