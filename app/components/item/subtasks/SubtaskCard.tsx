import { SubtaskCardProps } from "../itemTypes";
import { useFetcher } from "@remix-run/react";
import DeleteSubtask from "~/routes/subtasks.$subtaskId.delete";
import EditSubtask from "~/routes/subtasks.$subtaskId.edit";

export default function SubtaskCard({
	title,
	subtaskId,
	progress,
	timestamp,
}: SubtaskCardProps) {
	const fetcher = useFetcher();
	return (
		<div className="p-1 flex flex-row gap-1">
			<fetcher.Form
				method="patch"
				action={`/subtasks/${subtaskId}/complete`}
				className="w-full"
			>
				<input type="hidden" name="progress" defaultValue={progress} />
				<button className="p-2 w-full border rounded-lg border-neutral-500 hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 flex flex-row gap-2">
					{Boolean(progress) && <span>✅</span>}
					<span className="">{title}</span>
				</button>
			</fetcher.Form>
			<EditSubtask title={title} subtaskId={subtaskId} />
			<DeleteSubtask subtaskId={subtaskId} />
		</div>
	);
}
