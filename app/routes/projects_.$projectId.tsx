import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import ProjectCard from "~/components/item/projects/ProjectCard";
import { getProject } from "~/queries/projects.server";

export async function action() {
	return null;
}
export async function loader({ request, params }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.projectId) {
		return redirect("/projects");
	}

	const project = await (
		await getProject({ projectId: params.projectId, userId })
	).json();
	return { project };
}
export default function Project() {
	const project = useLoaderData<typeof loader>();

	return (
		<BasicContainer>
			<ProjectCard {...project} />
			<h1>Project.projectId route test test test</h1>
		</BasicContainer>
	);
}
