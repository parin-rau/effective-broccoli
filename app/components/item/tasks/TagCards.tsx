function TagCard({ tag }: { tag: string }) {
	return (
		<div
			className={`px-3 whitespace-nowrap border rounded-full text-cyan-100 border-cyan-300 bg-cyan-700`}
		>
			{tag}
		</div>
	);
}

export default function TagCards({
	tags,
}: {
	tags: string[];
}) {
	return (
		<div
			className={`overflow-x-hidden hover:overflow-x-auto flex flex-row gap-2`}
		>
			{tags.map((tag, index) => (
				<TagCard key={index} tag={tag} />
			))}
		</div>
	);
}
