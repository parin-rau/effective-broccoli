import BasicContainer from "../container/BasicContainer";
import LogoutButton from "./LogoutButton";
import NavbarLink from "./NavbarLink";

export default function Navbar({
	isOpen,
	children,
}: {
	isOpen?: boolean;
	children?: React.ReactNode;
}) {
	return (
		<BasicContainer
			styles={`h-screen sticky ${
				isOpen ? "flex" : "hidden sm:flex"
			} border-r border-neutral-500 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900`}
		>
			{children}
			<div className="flex flex-col gap-4 divide-y divide-neutral-500">
				<div className="flex flex-col gap-2">
					<NavbarLink text="Home" to="/" />
					<NavbarLink text="Projects" to="/projects" />
					<NavbarLink text="Tasks" to="/tasks" />
					<NavbarLink text="User" to="/user" />
				</div>
				<div className="pt-4 flex flex-col gap-2">
					<LogoutButton />
				</div>
			</div>
		</BasicContainer>
	);
}
