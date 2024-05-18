/* eslint-disable no-mixed-spaces-and-tabs */
export type Kind = "project" | "task";

export type ItemMeta = {
	id: string;
	timestamp: Date;
	kind: Kind;
};

type BaseContent = {
	id: string;
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
	taskIds: string[];
}

// export type ItemContent<T extends Kind> = T extends "project"
// 	? Project[]
// 	: Task[];

export type ItemData = {
	meta: ItemMeta;
	content:
		| { task: Task; project?: never }
		| { task?: never; project: Project };
};
