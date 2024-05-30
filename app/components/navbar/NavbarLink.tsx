import { Link, useLocation } from "@remix-run/react";
import { pathnameMatch } from "./utils/pathnameMatch";

type Props = {
	to: string;
	text: string;
};

export default function NavbarLink({ to, text }: Props) {
	const { pathname } = useLocation();
	const isCurrentLocation = pathnameMatch(pathname, to);

	return (
		<Link
			to={to}
			className={
				"p-2 w-fit rounded-lg " +
				(isCurrentLocation
					? "bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400"
					: "hover:bg-neutral-200 active:bg-neutral-300")
			}
		>
			{text}
		</Link>
	);
}
