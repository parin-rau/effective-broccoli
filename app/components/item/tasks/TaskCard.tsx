import { Link, useParams } from "@remix-run/react";
import BorderContainer from "~/components/container/BorderContainer";
import { TaskCardProps } from "../itemTypes";
import SpreadContainer from "~/components/container/SpreadContainer";
import PageHeading from "~/components/container/PageHeading";
import CreateSubtask from "~/routes/subtasks.create";
import ItemHeader from "../ItemHeader";
import DeleteTask from "~/routes/tasks_.$taskId.delete";
import EditTask from "~/routes/tasks_.$taskId.edit";
import ProgressBar from "../ProgressBar";
import BasicContainer from "~/components/container/BasicContainer";
import StatusDisplay from "~/components/ui/StatusDisplay";

export default function TaskCard({
	taskId,
	projectId,
	title,
	description,
	timestamp,
	progress,
	due,
	priority,
}: TaskCardProps) {
	const params = useParams();
	const isCurrentLocation = params.taskId === taskId;

	return (
		<div className="p-1 grid grid-cols-3 border-y border-neutral-500 items-center">
			{isCurrentLocation ? (
				<>
					<SpreadContainer>
						<PageHeading>{title}</PageHeading>
						<div className="flex gap-2">
							<CreateSubtask
								taskId={taskId}
								projectId={projectId}
							/>
							<EditTask />
							<DeleteTask />
						</div>
					</SpreadContainer>
					<ItemHeader
						description={description}
						timestamp={timestamp}
					/>
				</>
			) : (
				<Link
					to={`/tasks/${taskId}`}
					className="hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 rounded-lg"
				>
					<ItemHeader title={title} timestamp={timestamp} />
				</Link>
			)}
			<div className="flex gap-2">
				<span className={due.styles}>{`${due.date}${
					due.modifier ? `(${due.modifier})` : ""
				}`}</span>
				<StatusDisplay
					styles={priority.styles}
					message={priority.text}
				/>
			</div>
			<ProgressBar
				{...{ ...progress.subtaskCompletion, uom: "Subtasks" }}
			/>
		</div>
	);
}
