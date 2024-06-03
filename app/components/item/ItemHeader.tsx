import BasicContainer from "../container/BasicContainer";
import { toTimestampString } from "./utils/dateConversion";
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
			<p className="">ID: {id}</p>
			<p className="italic">{toTimestampString(timestamp)}</p>
			{description && <p className="">{description}</p>}
		</BasicContainer>
	);
}
