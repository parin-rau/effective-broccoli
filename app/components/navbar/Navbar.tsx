import BasicContainer from "../container/BasicContainer";
import DarkModeToggle from "./DarkModeToggle";
import LogoutButton from "./LogoutButton";
import NavbarLink from "./NavbarLink";

export default function Navbar() {
	return (
		<BasicContainer>
			<NavbarLink text="Home" to="/" />
			<NavbarLink text="Projects" to="/projects" />
			<NavbarLink text="Tasks" to="/tasks" />
			<NavbarLink text="User" to="/user" />
			<DarkModeToggle />
			<LogoutButton />
		</BasicContainer>
	);
}
