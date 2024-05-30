import BorderContainer from "~/components/container/BorderContainer";
import ItemHeader from "../ItemHeader";
import { Project, ProjectCompletion } from "../itemTypes";
import ProgressBar from "../ProgressBar";

export default function ProjectCard(
	{ projectId, userId, title, description, timestamp }: Project,
	progressProps: ProjectCompletion
) {
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
			<ProgressBar
				{...{ ...progressProps.taskCompletion, uom: "Tasks" }}
			/>
			<ProgressBar
				{...{ ...progressProps.subtaskCompletion, uom: "Subtasks" }}
			/>
		</BorderContainer>
	);
}
