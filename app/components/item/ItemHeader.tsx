import BasicContainer from "../container/BasicContainer";
import { dateConversion } from "./utils/dateConversion";
import { ItemHeader as HeaderProps } from "./itemTypes";

export default function ItemHeader({
	title,
	id,
	description,
	timestamp,
}: HeaderProps) {
	return (
		<BasicContainer>
			<p className="text-2xl font-semibold">{title}</p>
			<p className="">{id}</p>
			<p className="italic">{dateConversion(timestamp)}</p>
			<p className="">{description}</p>
		</BasicContainer>
	);
}
