import ItemContent from "./ItemContent";
import ItemHeader from "./ItemHeader";
import { ItemData, Kind } from "./itemTypes";

export default function Task(
	kind: Kind,
	{ meta, content }: ItemData<typeof kind>
) {
	return (
		<div>
			<ItemHeader {...meta} />
			<ItemContent {...content} />
		</div>
	);
}
