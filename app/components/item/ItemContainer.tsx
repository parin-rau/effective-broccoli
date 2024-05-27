//import { useState } from "react";
import Item from "./Item";
import { ItemData } from "./itemTypes";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
	return json<ItemData[]>([
		{
			meta: { id: "1", timestamp: "01 January 2003", kind: "project" },
			content: {
				project: {
					id: "1",
					title: "project 1",
					taskIds: ["1", "2", "3"],
				},
			},
		},
		{
			meta: { id: "1", timestamp: "02 January 2000", kind: "project" },
			content: {
				project: {
					id: "2",
					title: "project 2",
					taskIds: ["1", "2", "3"],
				},
			},
		},
	]);
};

export default function ItemContainer() {
	//const [items, setItems] = useState<ItemData[] | null>(null);
	const items = useLoaderData<typeof loader>();

	return (
		<div>
			{items?.map((i) => (
				<Item key={i.meta.id} {...i} />
			))}
		</div>
	);
}
