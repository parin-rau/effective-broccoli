import BorderContainer from "~/components/container/BorderContainer";
import ItemHeader from "../ItemHeader";
import { ProjectCardProps } from "../itemTypes";
import ProgressBar from "../ProgressBar";
import { useParams } from "@remix-run/react";
import EditProject from "~/routes/projects_.$projectId.edit";
import DeleteProject from "~/routes/projects_.$projectId.delete";
import ItalicText from "~/components/text/ItalicText";
import BasicContainer from "~/components/container/BasicContainer";

export default function ProjectCard({
	projectId,
	title,
	description,
	timestamp,
	progress,
	externalLink,
}: ProjectCardProps) {
	const params = useParams();
	const isCurrentLocation = params.projectId === projectId;

	return (
		<BorderContainer>
			<ItemHeader
				id={projectId}
				title={title}
				to={`/projects/${projectId}/tasks`}
				headerButtons={
					isCurrentLocation && (
						<>
							<EditProject />
							<DeleteProject />
						</>
					)
				}
			/>
			{isCurrentLocation && (
				<BasicContainer>
					<ItalicText>{timestamp}</ItalicText>
					{description && <p>{description}</p>}
					{externalLink && (
						<a href={externalLink} className="hover:underline">
							{externalLink}
						</a>
					)}
				</BasicContainer>
			)}
			<ProgressBar {...{ ...progress.taskCompletion, uom: "Tasks" }} />
			<ProgressBar
				{...{ ...progress.subtaskCompletion, uom: "Subtasks" }}
			/>
		</BorderContainer>
	);
}
