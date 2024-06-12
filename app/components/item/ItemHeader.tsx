import { Link, useParams } from "@remix-run/react";
import BasicContainer from "../container/BasicContainer";
import { ItemHeader as HeaderProps } from "./itemTypes";
import PageHeading from "../container/PageHeading";
import SubHeading from "../container/SubHeading";
import SpreadContainer from "../container/SpreadContainer";

function HeaderContent<T extends React.ReactNode>({
	id,
	title,
	description,
	timestamp,
	headerButtons,
	extraFields,
}: Omit<HeaderProps<T>, "to">) {
	const params = useParams();
	const isCurrentLocation =
		params?.taskId === id ||
		params?.projectId === id ||
		params?.subtaskId === id;

	return (
		<BasicContainer>
			{isCurrentLocation ? (
				<SpreadContainer>
					<PageHeading>{title}</PageHeading>
					<div className="flex gap-2">{headerButtons}</div>
				</SpreadContainer>
			) : (
				<SubHeading>{title}</SubHeading>
			)}
			<span className="italic text-neutral-700 dark:text-neutral-300">
				{timestamp}
			</span>
			{description && <p className="">{description}</p>}
			{extraFields}
		</BasicContainer>
	);
}

export default function ItemHeader<T extends React.ReactNode>({
	to,
	headerButtons,
	extraFields,
	...props
}: HeaderProps<T>) {
	return to && !headerButtons ? (
		<Link
			to={to}
			className="hover:text-blue-500 hover:bg-neutral-200 active:bg-neutral-300 dark:hover:text-blue-400 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 rounded-lg"
		>
			<HeaderContent {...{ ...props }}>{extraFields}</HeaderContent>
		</Link>
	) : (
		<HeaderContent {...{ ...props }}>
			{headerButtons}
			{extraFields}
		</HeaderContent>
	);
}
