import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProjectWithProgressProps } from "~/components/item/itemTypes";
import ProjectContainer from "~/components/item/projects/ProjectContainer";
import { getProgressStats } from "~/components/item/utils/progressPercent";

export function action() {}

export function loader() {
	return json<ProjectWithProgressProps[]>([
		{
			title: "Project 1",
			userId: "1",
			tasks: [],
			projectId: "1",
			timestamp: 1716188400000,
			progress: {
				message: "Not Started",
				taskCompletion: {
					completed: 0,
					total: 0,
					...getProgressStats(0, 0),
				},
				subtaskCompletion: {
					completed: 0,
					total: 0,
					...getProgressStats(0, 0),
				},
			},
		},
		{
			title: "Project 2",
			userId: "1",
			tasks: [],
			projectId: "2",
			timestamp: 1717449553585,
			progress: {
				message: "In Progress",
				taskCompletion: {
					completed: 2,
					total: 4,
					...getProgressStats(2, 4),
				},
				subtaskCompletion: {
					completed: 4,
					total: 7,
					...getProgressStats(4, 7),
				},
			},
		},
		{
			title: "Project 3",
			userId: "1",
			tasks: [],
			projectId: "3",
			timestamp: 1709366400000,
			progress: {
				message: "Completed",
				taskCompletion: {
					completed: 5,
					total: 5,
					...getProgressStats(5, 5),
				},
				subtaskCompletion: {
					completed: 10,
					total: 10,
					...getProgressStats(10, 10),
				},
			},
		},
	]);
}

export default function Component() {
	const projects = useLoaderData<typeof loader>();

	return <ProjectContainer projects={projects} />;
}
