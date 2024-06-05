import {
	Subtask as SubtaskData,
	Task,
	Project,
	ItemData,
	ItemMeta,
} from "./itemTypes";
import { getStatus } from "../../queries/utils/statusLookup";

function Subtask({ id, title, status }: SubtaskData) {
	return (
		<div>
			<p>{id}</p>
			<p>{title}</p>
			<p>{status}</p>
		</div>
	);
}

function TaskContent({ id, status, subtasks }: Task) {
	return (
		<div>
			<p>{id}</p>
			<p>{getStatus(status)}</p>
			<div>
				{subtasks.map((s) => (
					<Subtask key={s.id} {...s} />
				))}
			</div>
		</div>
	);
}

function ProjectContent({ id, title, taskIds }: Project) {
	return (
		<div>
			<p>{id}</p>
			<p>{title}</p>
			<p>{taskIds.length}</p>
		</div>
	);
}

export default function ItemContent({ content }: ItemData, { kind }: ItemMeta) {
	if (kind === "project" && content.project) {
		return <ProjectContent {...content.project} />;
	} else if (kind === "task" && content.task) {
		return <TaskContent {...content.task} />;
	}
}
