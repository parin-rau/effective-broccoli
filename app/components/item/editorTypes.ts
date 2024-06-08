import { Project, Subtask, Task } from "../itemTypes";

export class ProjectEditorState
	implements
		Required<Pick<Project, "title" | "description" | "externalLink">>
{
	title: string;
	description: string;
	externalLink: string;

	constructor(project?: Partial<Project>) {
		this.title = project?.title ?? "";
		this.description = project?.description ?? "";
		this.externalLink = project?.externalLink ?? "";
	}
}

export class TaskEditorState
	implements Required<Pick<Task, "title" | "description" | "externalLink">>
{
	title: string;
	description: string;
	externalLink: string;
	subtasks: SubtaskEditorState[];

	constructor(task?: Partial<Task>) {
		this.title = task?.title ?? "";
		this.description = task?.description ?? "";
		this.externalLink = task?.externalLink ?? "";
		this.subtasks = task?.subtasks ?? [];
	}
}

export class SubtaskEditorState
	implements
		Required<Pick<Subtask, "title" | "description" | "externalLink">>
{
	title: string;
	description: string;
	externalLink: string;

	constructor(subtask?: Partial<Subtask>) {
		this.title = subtask?.title ?? "";
		this.description = subtask?.description ?? "";
		this.externalLink = subtask?.externalLink ?? "";
	}
}
