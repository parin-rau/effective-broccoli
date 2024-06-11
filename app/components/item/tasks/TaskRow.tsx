import { Link } from "@remix-run/react";
import { TaskCardProps } from "../itemTypes";
import ProgressBar from "../ProgressBar";
import StatusDisplay from "~/components/ui/StatusDisplay";
import TagCards from "./TagCards";

type TaskRowProps = Omit<TaskCardProps, "projectId" | "description">;

export default function TaskRow({
	taskId,
	title,
	timestamp,
	progress,
	due,
	priority,
}: TaskRowProps) {
	return (
		<div>
			<Link
				to={`/tasks/${taskId}/subtasks`}
				className="py-1 grid grid-cols-9 gap-2 items-center rounded-lg hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
			>
				<div className="w-full h-full p-2 col-span-3">
					<h3 className="text-lg font-semibold">{title}</h3>
				</div>

				<div className="col-span-2 lg:col-span-1">
					<ProgressBar {...{ ...progress.subtaskCompletion }} />
				</div>

				<div className="col-span-2 md:col-span-1">
					<StatusDisplay
						styles={priority.styles}
						message={priority.text}
					/>
				</div>

				<div className="col-span-2 lg:col-span-1">
					{due.date ? (
						<span className={due.styles}>{`${due.date}${
							due.modifier ? `(${due.modifier})` : ""
						}`}</span>
					) : (
						<span>12/20/24</span>
					)}
				</div>

				<span className="hidden lg:block italic">{timestamp}</span>

				<div className="hidden md:block lg:col-span-2">
					<TagCards
						tags={[
							"test",
							"tag",
							"overflow test",
							"long tag placeholder",
						]}
					/>
				</div>
			</Link>
		</div>
	);
}
