import { Link, useLocation } from "@remix-run/react";
import BasicContainer from "../container/BasicContainer";
import { pathnameMatch } from "./utils/pathnameMatch";

type LinkProps = {
	to: string;
	text: string;
};

function NavbarLink({ to, text }: LinkProps) {
	const { pathname } = useLocation();
	const isCurrentLocation = pathnameMatch(pathname, to);

	return (
		<Link
			to={to}
			className={
				"p-2 w-fit rounded-lg " +
				(isCurrentLocation
					? "bg-neutral-200 hover:bg-neutral-300"
					: "hover:bg-neutral-200")
			}
		>
			{text}
		</Link>
	);
}

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
