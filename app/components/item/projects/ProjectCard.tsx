import BorderContainer from "~/components/container/BorderContainer";
import ItemHeader from "../ItemHeader";
import { ProjectWithProgressProps } from "../itemTypes";
import ProgressBar from "../ProgressBar";
import { Link, useLocation } from "@remix-run/react";

export default function ProjectCard({
	projectId,
	userId,
	title,
	description,
	timestamp,
	progress,
}: ProjectWithProgressProps) {
	const headerProps = {
		id: projectId,
		userId,
		title,
		description,
		timestamp,
	};

	const { pathname } = useLocation();
	const isCurrentLocation = pathname === projectId;

	return (
		<BorderContainer>
			{isCurrentLocation ? (
				<ItemHeader {...{ ...headerProps }} />
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
