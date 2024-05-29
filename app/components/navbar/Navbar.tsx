import BasicContainer from "../container/BasicContainer";
import NavbarLink from "./NavbarLink";

export default function Navbar() {
	return (
		<BasicContainer>
			<NavbarLink text="Home" to="/" />
			<NavbarLink text="Projects" to="/projects" />
			<NavbarLink text="Tasks" to="/tasks" />
			<NavbarLink text="User" to="/user" />
			<NavbarLink text="Log Out" to="/logout" />
		</BasicContainer>
	);
}
