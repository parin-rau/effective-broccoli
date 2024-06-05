import BorderContainer from "~/components/container/BorderContainer";
import ItemHeader from "../ItemHeader";
import { ProjectCardProps } from "../itemTypes";
import ProgressBar from "../ProgressBar";
import { Link, useParams } from "@remix-run/react";
import SpreadContainer from "~/components/container/SpreadContainer";
import PageHeading from "~/components/container/PageHeading";
import EditProject from "~/routes/projects_.$projectId.edit";
import CreateTask from "~/routes/tasks.new";

export default function ProjectCard({
	projectId,
	title,
	description,
	timestamp,
	progress,
}: ProjectCardProps) {
	const headerProps = {
		id: projectId,
		title,
		description,
		timestamp,
	};

	const params = useParams();
	const isCurrentLocation = params.projectId === projectId;

	return (
		<BorderContainer>
			{isCurrentLocation ? (
				<>
					<SpreadContainer>
						<PageHeading>{title}</PageHeading>
						<div className="flex gap-2">
							<EditProject />
							<CreateTask />
						</div>
					</SpreadContainer>
					<ItemHeader
						id={projectId}
						description={description}
						timestamp={timestamp}
					/>
				</>
			) : (
				<Link
					to={`/projects/${projectId}`}
					className="hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 rounded-lg"
				>
					<ItemHeader {...{ ...headerProps }} />
				</Link>
			)}
			<ProgressBar {...{ ...progress.taskCompletion, uom: "Tasks" }} />
			<ProgressBar
				{...{ ...progress.subtaskCompletion, uom: "Subtasks" }}
			/>
		</BorderContainer>
	);
}
