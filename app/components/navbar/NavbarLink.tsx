import { Link, useLocation } from "@remix-run/react";
import { pathnameMatch } from "./utils/pathnameMatch";

type Props = {
	to: string;
	text: string;
	children?: React.ReactNode;
};

export default function NavbarLink({ to, text, children }: Props) {
	const { pathname } = useLocation();
	const isCurrentLocation = pathnameMatch(pathname, to);

	return (
		<Link
			to={to}
			className={
				"p-2 w-full rounded-lg " +
				(isCurrentLocation
					? "bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:active:bg-neutral-500"
					: "hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-700 dark:active:bg-neutral-600")
			}
		>
			{children ? (
				<div className="flex gap-2">
					{children}
					<span>{text}</span>
				</div>
			) : (
				text
			)}
		</Link>
	);
}
