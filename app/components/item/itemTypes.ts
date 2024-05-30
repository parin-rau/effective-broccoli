export type ItemHeader = {
	id: string;
	title: string;
	description?: string;
	timestamp: number;
};

export type Project = {
	projectId: string;
	userId: string;
	title: string;
	description?: string;
	progress: number;
	externalLink?: string;
	timestamp: number;
	tasks: Task[];
};

export type Task = {
	taskId: string;
	userId: string;
	projectId: string;
	title: string;
	description?: string;
	progress: number;
	externalLink?: string;
	timestamp: number;
	subtasks: Subtask[];
};

export type Subtask = {
	subtaskId: string;
	userId: string;
	taskId: string;
	projectId: string;
	title: string;
	description?: string;
	progress: number;
	externalLink?: string;
	timestamp: number;
};

type Completion = {
	completed: number;
	total: number;
	progressPercent: string;
	progressDecimal: number;
	childBarStyles: React.CSSProperties;
	uom: string;
};

export type ProjectCompletion = {
	taskCompletion: Completion;
	subtaskCompletion: Completion;
};

export type TaskCompletion = {
	subtaskCompletion: Completion;
};
