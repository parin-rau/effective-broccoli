import { SubtaskCardProps } from "../itemTypes";
import { useFetcher } from "@remix-run/react";

export default function SubtaskCard({
	title,
	subtaskId,
	progress,
	timestamp,
}: SubtaskCardProps) {
	const fetcher = useFetcher();
	return (
		<div className="p-1">
			<fetcher.Form
				method="patch"
				action={`/subtasks/${subtaskId}/complete`}
				className="border rounded-lg border-neutral-500"
			>
				<input type="hidden" name="progress" defaultValue={progress} />
				<button className="p-2 w-full hover:bg-neutral-200 flex flex-row gap-2">
					{Boolean(progress) && <span>✅</span>}
					<span className="">{title}</span>
				</button>
			</fetcher.Form>
		</div>
	);
}
