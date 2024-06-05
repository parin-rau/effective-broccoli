import BasicContainer from "../container/BasicContainer";
import DarkModeToggle from "./DarkModeToggle";
import LogoutButton from "./LogoutButton";
import NavbarLink from "./NavbarLink";

export default function Navbar() {
	return (
		<BasicContainer styles="w-40 h-screen border-r border-neutral-500 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900">
			<NavbarLink text="Home" to="/" />
			<NavbarLink text="Projects" to="/projects" />
			<NavbarLink text="Tasks" to="/tasks" />
			<NavbarLink text="User" to="/user" />
			<DarkModeToggle />
			<LogoutButton />
		</BasicContainer>
	);
}
