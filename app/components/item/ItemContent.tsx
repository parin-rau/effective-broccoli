import {
	ItemContent as ItemContentTypes,
	ItemMeta,
	Subtask as SubtaskData,
	Task,
} from "./itemTypes";
import { getStatus } from "./utils/statusLookup";

function Subtask({ id, title, status }: SubtaskData) {
	return (
		<div>
			<p>{id}</p>
			<p>{title}</p>
			<p>{status}</p>
		</div>
	);
}

function TaskContent({ status, subtasks }: Task) {
	return (
		<div>
			<p>{getStatus(status)}</p>
			<div>
				{subtasks.map((s) => (
					<Subtask key={s.id} {...s} />
				))}
			</div>
		</div>
	);
}

function ProjectContent() {}

export default function ItemContent(
	content: ItemContentTypes,
	{ kind }: ItemMeta
) {
	if (kind === "project") {
		return <div></div>;
	} else if (kind === "task") {
		return <div></div>;
	}
}
