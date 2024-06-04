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
					? "bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
					: "hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700")
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
