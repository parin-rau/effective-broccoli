import { Link } from "@remix-run/react";
import BorderContainer from "~/components/container/BorderContainer";
import { TaskCardProps } from "../itemTypes";
import ItemHeader from "../ItemHeader";
import DeleteTask from "~/routes/tasks_.$taskId.delete";
import EditTask from "~/routes/tasks_.$taskId.edit";
import ProgressBar from "../ProgressBar";
import StatusDisplay from "~/components/ui/StatusDisplay";
import ItalicText from "~/components/text/ItalicText";
import BasicContainer from "~/components/container/BasicContainer";
import TagCards from "./TagCards";

export default function TaskCard({
	taskId,
	project,
	title,
	description,
	timestamp,
	progress,
	due,
	priority,
	externalLink,
	tags,
}: TaskCardProps) {
	return (
		<BorderContainer>
			<ItemHeader
				id={taskId}
				title={title}
				headerButtons={
					<>
						<EditTask />
						<DeleteTask />
					</>
				}
			/>

			<BasicContainer>
				<TagCards tags={tags} />
				<ItalicText>{timestamp}</ItalicText>
				<Link
					to={`/projects/${project.projectId}/tasks`}
					className="hover:underline"
				>{`Project: ${project.title}`}</Link>
				{due.date && (
					<span className={due.styles}>Due: {due.date}</span>
				)}
				<span>
					Priority:{" "}
					<StatusDisplay
						styles={priority.styles}
						message={priority.text}
					/>
				</span>
				{description && <p>{description}</p>}
				{externalLink && (
					<a href={externalLink} className="hover:underline">
						{externalLink}
					</a>
				)}
			</BasicContainer>

			<ProgressBar
				{...{ ...progress.subtaskCompletion, uom: "Subtasks" }}
			/>
		</BorderContainer>
	);
}
