import { useState } from "react";
import Item from "./Item";
import { ItemData } from "./itemTypes";

export default function ItemContainer() {
	const [items, setItems] = useState<ItemData[] | null>(null);

	return (
		<div>
			{items?.map((i) => (
				<Item key={i.meta.id} {...i} />
			))}
		</div>
	);
}
