import Hamburger from "~/assets/Hamburger";
import DarkModeToggle from "./DarkModeToggle";
import TransparentButton from "../ui/TransparentButton";

export default function Headerbar({
	toggleSidebar,
}: {
	toggleSidebar: () => void;
}) {
	return (
		<div className="grid grid-cols-[100px_auto_80px] sm:grid-cols-[150px_auto_80px] place-items-center bg-neutral-200 dark:bg-neutral-800">
			<div className="px-2 justify-self-start">
				<TransparentButton styles="sm:hidden" onClick={toggleSidebar}>
					<Hamburger />
				</TransparentButton>
				<span className="hidden sm:block"></span>
			</div>
			<div className="p-2 my-2 w-full rounded-lg bg-neutral-300 dark:bg-neutral-700">
				Search....
			</div>
			<div>
				<DarkModeToggle />
			</div>
		</div>
	);
}
