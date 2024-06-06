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

	const data = await (
		await getProject({ projectId: params.projectId, userId })
	).json();
	return data;
}

export default function Project() {
	const loaderData = useLoaderData<typeof loader>();
	const error = loaderData?.error;
	const project = loaderData?.project;

	return (
		<BasicContainer>
			{!error && <ProjectCard {...project} />}
			<h1>Project.projectId route test test test</h1>
		</BasicContainer>
	);
}
