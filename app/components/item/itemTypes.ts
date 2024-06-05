export type ItemHeader = {
	id: string;
	title?: string;
	description: string | null;
	timestamp: string;
};

export type StatusMessage = "Not Started" | "In Progress" | "Completed";

export type ProjectCardProps = {
	projectId: string;
	//userId: string;
	title: string;
	description: string | null;
	externalLink: string | null;
	timestamp: string;
	progress: ProjectCompletion;
	//tasks: Task[];
};

export type TaskCardProps = {
	taskId: string;
	userId: string;
	projectId: string;
	title: string;
	description: string | null;
	externalLink: string | null;
	timestamp: string;
	subtasks: SubtaskCardProps[];
};

export type SubtaskCardProps = {
	subtaskId: string;
	userId: string;
	taskId: string;
	projectId: string;
	title: string;
	description: string | null;
	externalLink: string | null;
	timestamp: string;
};

type Completion = {
	completed: number;
	total: number;
	progressPercent: string;
	progressDecimal: number;
	childBarStyles: React.CSSProperties;
	uom?: string;
};

export type ProjectCompletion = {
	taskCompletion: Completion;
	subtaskCompletion: Completion;
	message: StatusMessage;
};

export type TaskCompletion = {
	subtaskCompletion: Completion;
	message: StatusMessage;
};
