import BasicContainer from "../container/BasicContainer";
import { ItemMeta } from "./itemTypes";
import { dateConversion } from "./utils/dateConversion";

export default function ItemHeader({ id, timestamp }: ItemMeta) {
	return (
		<BasicContainer>
			<p>{id}</p>
			<p>{dateConversion(timestamp)}</p>
		</BasicContainer>
	);
}
