import { Link } from "@remix-run/react";
import { TaskCardProps } from "../itemTypes";
import ProgressBar from "../ProgressBar";
import StatusDisplay from "~/components/ui/StatusDisplay";
import TagCards from "./TagCards";

type TaskRowProps = Omit<TaskCardProps, "description">;

export default function TaskRow({
	taskId,
	title,
	timestamp,
	progress,
	due,
	priority,
	project,
	tags,
}: TaskRowProps) {
	return (
		<div>
			<div className="py-1 grid grid-cols-10 gap-2 items-center rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 ">
				<Link
					to={`/tasks/${taskId}/subtasks`}
					className="w-full p-2 col-span-3 rounded-lg hover:text-blue-500 hover:bg-neutral-300 active:bg-neutral-300 dark:hover:text-blue-400 dark:hover:bg-neutral-700  dark:active:bg-neutral-600"
				>
					<h3 className="text-lg font-semibold">{title}</h3>
				</Link>

				<div className="col-span-2 lg:col-span-1">
					<ProgressBar {...{ ...progress.subtaskCompletion }} />
				</div>

				<div className="col-span-2 lg:col-span-1">
					<StatusDisplay
						styles={priority.styles}
						message={priority.text}
					/>
				</div>

				<div className="">
					{due.date ? (
						<span className={due.styles}>{due.date}</span>
					) : (
						<span>&ndash;</span>
					)}
				</div>

				<Link
					className="-ml-2 p-2 truncate rounded-lg hover:text-blue-500 hover:bg-neutral-300 active:bg-neutral-300 dark:hover:text-blue-400 dark:hover:bg-neutral-700  dark:active:bg-neutral-600"
					to={`/projects/${project.projectId}/tasks`}
				>
					{project.title}
				</Link>

				<span className="hidden lg:block italic">{timestamp}</span>

				<div className="hidden md:block lg:col-span-2">
					<TagCards tags={tags} />
				</div>
			</div>
		</div>
	);
}
