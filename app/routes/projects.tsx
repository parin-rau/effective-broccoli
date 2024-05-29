import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Project } from "~/components/item/itemTypes";
import ProjectContainer from "~/components/item/projects/ProjectContainer";

export function action() {}

export function loader() {
	return json<Project[]>([
		{
			title: "Project 1",
			userId: "1",
			tasks: [],
			projectId: "1",
			progress: 0,
			timestamp: 0,
		},
		{
			title: "Project 2",
			userId: "1",
			tasks: [],
			projectId: "2",
			progress: 0,
			timestamp: 0,
		},
		{
			title: "Project 2",
			userId: "1",
			tasks: [],
			projectId: "3",
			progress: 0,
			timestamp: 0,
		},
	]);
}

export default function Component() {
	const projects = useLoaderData<typeof loader>();

	return <ProjectContainer projects={projects} />;
}
