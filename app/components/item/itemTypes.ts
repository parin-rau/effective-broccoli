export type ItemHeader = {
	id: string;
	title?: string;
	description: string | null;
	timestamp: string;
	status?: StatusDisplay;
	priority?: StatusDisplay;
};

export type StatusDisplay = {
	message: string;
	styles?: string;
};

export type ProjectCardProps = {
	projectId: string;
	title: string;
	description: string | null;
	externalLink: string | null;
	timestamp: string;
	progress: ProjectCompletion;
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
};

export type TaskCompletion = {
	subtaskCompletion: Completion;
	status: StatusDisplay;
};
