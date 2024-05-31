import BorderContainer from "~/components/container/BorderContainer";
import ItemHeader from "../ItemHeader";
import { ProjectWithProgressProps } from "../itemTypes";
import ProgressBar from "../ProgressBar";

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

	return (
		<BorderContainer>
			<ItemHeader {...{ ...headerProps }} />
			<ProgressBar {...{ ...progress.taskCompletion, uom: "Tasks" }} />
			<ProgressBar
				{...{ ...progress.subtaskCompletion, uom: "Subtasks" }}
			/>
		</BorderContainer>
	);
}
