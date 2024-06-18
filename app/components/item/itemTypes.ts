export type ItemHeader = {
	id: string;
	title: string;
	to?: string;
	headerButtons?: React.ReactNode;
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
	//userId: string;
	project: { projectId: string; title: string };
	title: string;
	description: string | null;
	externalLink: string | null;
	timestamp: string;
	due: { date: string; styles: string; value: string };
	priority: { value: number; text: string; styles: string };
	subtasks?: SubtaskCardProps[];
	progress: TaskCompletion;
	tags: string[];
};

export type SubtaskCardProps = {
	subtaskId: string;
	//userId: string;
	taskId: string;
	//projectId: string;
	title: string;
	//description: string | null;
	//externalLink: string | null;
	timestamp: string;
	progress: number;
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
