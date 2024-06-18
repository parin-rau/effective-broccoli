import { Project, Subtask, Task } from "@prisma/client";
import {
	ProjectCardProps,
	SubtaskCardProps,
	TaskCardProps,
} from "~/components/item/itemTypes";
import { toTimestampString } from "./dateConversion";
import { getProgressStats } from "./progressPercent";
import { getItemStatus, getTaskDue, getTaskPriority } from "./statusLookup";

export function processProjectData(
	project: Project & {
		tasks: { subtasks: { progress: number }[] }[];
	}
): ProjectCardProps {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { userId, ...restProject } = project; // Removing userId from project

	const totalTasks = project.tasks.length;
	let completedTasks = 0;
	let totalSubtasks = 0;
	let completedSubtasks = 0;

	project.tasks.forEach((task) => {
		const totalSubtasksPerTask = task.subtasks.length;
		let completedSubtasksPerTask = 0;

		totalSubtasks += totalSubtasksPerTask;
		task.subtasks.forEach((subtask) => {
			if (subtask.progress === 1) {
				completedSubtasks += 1;
				completedSubtasksPerTask += 1;
			}
		});
		if (
			totalSubtasksPerTask > 0 &&
			completedSubtasksPerTask === totalSubtasksPerTask
		) {
			completedTasks += 1;
		}
	});

	return {
		...restProject,
		timestamp: toTimestampString(Number(project.timestamp)),
		progress: {
			taskCompletion: {
				...getProgressStats(completedTasks, totalTasks),
			},
			subtaskCompletion: {
				...getProgressStats(completedSubtasks, totalSubtasks),
			},
		},
	};
}

export function processTaskData(
	task: Task & { subtasks?: Subtask[] } & {
		project: { projectId: string; title: string };
	}
): TaskCardProps {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { userId, tags, ...restTask } = task; // removing userId from task

	const parsedTags = Array.isArray(JSON.parse(tags))
		? JSON.parse(tags)
		: [JSON.parse(tags)];

	const totalSubtasks = task?.subtasks?.length ?? 0;
	const completedSubtasks =
		task?.subtasks?.reduce((count, current) => {
			if (current.progress === 1) {
				return (count += 1);
			} else {
				return count;
			}
		}, 0) ?? 0;
	const processedSubtasks =
		task?.subtasks?.map((subtask) => processSubtaskData(subtask)) ?? [];

	const isCompleted =
		completedSubtasks === totalSubtasks && totalSubtasks !== 0;

	return {
		...restTask,
		project: {
			projectId: task.project.projectId,
			title: task.project.title,
		},
		due: getTaskDue(task.due, isCompleted),
		priority: getTaskPriority(task.priority),
		timestamp: toTimestampString(Number(task.timestamp)),
		progress: {
			subtaskCompletion: {
				...getProgressStats(completedSubtasks, totalSubtasks),
			},
			status: getItemStatus({
				completedCount: completedSubtasks,
				totalCount: totalSubtasks,
				onHold: task.onHold,
			}),
		},
		subtasks: processedSubtasks,
		tags: parsedTags,
	};
}

export function processSubtaskData(subtask: Subtask): SubtaskCardProps {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { userId, ...restSubtask } = subtask; // removing userId from subtask

	return {
		...restSubtask,
		timestamp: toTimestampString(Number(subtask.timestamp)),
	};
}
