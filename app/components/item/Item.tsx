import ItemContent from "./ItemContent";
import ItemHeader from "./ItemHeader";
import { ItemData } from "./itemTypes";

export default function Task({ meta, content }: ItemData) {
	return (
		<div>
			<ItemHeader {...meta} />
			<ItemContent {...{ content, meta }} />
		</div>
	);
}
