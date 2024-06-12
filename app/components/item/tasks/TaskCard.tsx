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
		<BorderContainer>
			{/* {isCurrentLocation ? (
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
					to={`/tasks/${taskId}/subtasks`}
					className="hover:text-blue-500 hover:bg-neutral-200 active:bg-neutral-300 dark:hover:text-blue-400 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 rounded-lg"
				>
					<ItemHeader title={title} timestamp={timestamp} />
				</Link>
			)} */}
			<ItemHeader
				{...{
					id: taskId,
					to: `/tasks/${taskId}/subtasks`,
					title,
					timestamp,
				}}
			></ItemHeader>
			<div className="flex gap-2">
				<span className={due.styles}>{due.date}</span>
				<StatusDisplay
					styles={priority.styles}
					message={priority.text}
				/>
			</div>
			<ProgressBar
				{...{ ...progress.subtaskCompletion, uom: "Subtasks" }}
			/>
		</BorderContainer>
	);
}
