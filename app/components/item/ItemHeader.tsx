import { ItemMeta } from "./itemTypes";
import { dateConversion } from "./utils/dateConversion";

export default function ItemHeader({ id, timestamp }: ItemMeta) {
	return (
		<div>
			<p>{id}</p>
			<p>{dateConversion(timestamp)}</p>
		</div>
	);
}
