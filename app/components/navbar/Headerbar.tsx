import Hamburger from "~/assets/Hamburger";
import DarkModeToggle from "./DarkModeToggle";

export default function Headerbar() {
	return (
		<div className="grid grid-cols-[100px_auto_80px] sm:grid-cols-[150px_auto_80px] place-items-center bg-neutral-200 dark:bg-neutral-800">
			<div>
				<span className="sm:hidden">
					<Hamburger />
				</span>
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
