import CircleX from "~/assets/CircleX";

function TagCard({
	tag,
	deleteTag,
}: {
	tag: string;
	deleteTag?: (tag: string) => void;
}) {
	return deleteTag ? (
		<button
			type="button"
			onClick={() => deleteTag(tag)}
			className={`px-3 flex gap-2 items-center whitespace-nowrap border rounded-full text-cyan-100 border-cyan-300 bg-cyan-700 hover:bg-cyan-600 active:bg-cyan-500`}
		>
			{tag}
			<CircleX />
		</button>
	) : (
		<div
			className={`px-3 flex gap-2 items-center whitespace-nowrap border rounded-full text-cyan-100 border-cyan-300 bg-cyan-700`}
		>
			{tag}
		</div>
	);
}

export default function TagCards({
	tags,
	deleteTag,
}: {
	tags: string[];
	deleteTag?: (tag: string) => void;
}) {
	return tags.length ? (
		<div
			className={`overflow-x-hidden hover:overflow-x-auto flex flex-row gap-2`}
		>
			{tags.map((tag, index) => (
				<TagCard key={index} tag={tag} deleteTag={deleteTag} />
			))}
		</div>
	) : null;
}
