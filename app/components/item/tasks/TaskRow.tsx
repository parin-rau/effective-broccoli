import { Link, useParams } from "@remix-run/react";
import { TaskCardProps } from "../itemTypes";
import SpreadContainer from "~/components/container/SpreadContainer";
import PageHeading from "~/components/container/PageHeading";
import CreateSubtask from "~/routes/subtasks.create";
import ItemHeader from "../ItemHeader";
import DeleteTask from "~/routes/tasks_.$taskId.delete";
import EditTask from "~/routes/tasks_.$taskId.edit";
import ProgressBar from "../ProgressBar";
import StatusDisplay from "~/components/ui/StatusDisplay";

type TaskRowProps = Omit<TaskCardProps, "projectId" | "description">;

export default function TaskCard({
	taskId,
	title,
	timestamp,
	progress,
	due,
	priority,
}: TaskRowProps) {
	return (
		<div className="py-1 grid grid-cols-8 gap-2 items-center">
			<Link
				to={`/tasks/${taskId}`}
				className="w-full h-full p-2 col-span-3 hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 rounded-lg"
			>
				<h3 className="text-lg font-semibold">{title}</h3>
			</Link>

			<ProgressBar
				containerStyles="col-span-2"
				{...{ ...progress.subtaskCompletion, uom: "Subtasks" }}
			/>

			<StatusDisplay styles={priority.styles} message={priority.text} />

			{due.date ? (
				<span className={due.styles}>{`${due.date}${
					due.modifier ? `(${due.modifier})` : ""
				}`}</span>
			) : (
				<div />
			)}

			<span className="italic">{timestamp}</span>
		</div>
	);
}
