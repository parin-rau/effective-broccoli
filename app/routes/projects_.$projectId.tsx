import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import ProjectCard from "~/components/item/projects/ProjectCard";
import { getProject, updateProject } from "~/queries/projects.server";

export async function action() {
	return null;
}

export async function loader({ request, params }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.projectId) {
		return redirect("/projects");
	}

	const { project, error } = await (
		await getProject({ projectId: params.projectId, userId })
	).json();
	return { project, error };
}

export default function Project() {
	const { error, project } = useLoaderData<typeof loader>();

	return (
		<BasicContainer>
			{!error && <ProjectCard {...project} />}
			<h1>Project.projectId route test test test</h1>
		</BasicContainer>
	);
}
