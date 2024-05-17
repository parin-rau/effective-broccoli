type Kind = "project" | "task";

export type ItemMeta = {
	id: string;
	timestamp: Date;
	kind: Kind;
};

type BaseContent = {
	title: string;
	description?: string;
};

export type Subtask = {
	id: string;
	title: string;
	status: number;
};

export interface Task extends BaseContent {
	status: number;
	subtasks: Subtask[];
}

export interface Project extends BaseContent {
	tasks: Task[];
}

export type ItemContent<T extends Kind> = T extends "project"
	? Project[]
	: Task[];

export type ItemData<T extends Kind> = {
	meta: ItemMeta;
	content: ItemContent<T>;
};
