import BasicContainer from "../container/BasicContainer";
import { ItemHeader as HeaderProps } from "./itemTypes";

export default function ItemHeader({
	title,
	description,
	timestamp,
}: HeaderProps) {
	return (
		<BasicContainer>
			<p className="text-2xl font-semibold">{title}</p>
			<p className="italic">{timestamp}</p>
			{description && <p className="">{description}</p>}
		</BasicContainer>
	);
}
