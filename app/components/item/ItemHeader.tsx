import { Link, useParams } from "@remix-run/react";
import { ItemHeader as HeaderProps } from "./itemTypes";
import PageHeading from "../text/PageHeading";
import SubHeading from "../text/SubHeading";
import SpreadContainer from "../container/SpreadContainer";

function HeaderContent({ id, title, headerButtons }: Omit<HeaderProps, "to">) {
	const params = useParams();
	const isCurrentLocation =
		params?.taskId === id ||
		params?.projectId === id ||
		params?.subtaskId === id;

	return isCurrentLocation ? (
		<SpreadContainer>
			<PageHeading>{title}</PageHeading>
			{headerButtons && <div className="flex gap-2">{headerButtons}</div>}
		</SpreadContainer>
	) : (
		<SubHeading>{title}</SubHeading>
	);
}

export default function ItemHeader({
	to,
	headerButtons,
	...props
}: HeaderProps) {
	return to && !headerButtons ? (
		<Link
			to={to}
			className="p-2 hover:text-blue-500 hover:bg-neutral-200 active:bg-neutral-300 dark:hover:text-blue-400 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 rounded-lg"
		>
			<HeaderContent {...{ ...props }} />
		</Link>
	) : (
		<HeaderContent {...{ ...props, headerButtons }} />
	);
}
