import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { redirect } from "react-router";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import ProjectEditor from "~/components/item/projects/ProjectEditor";
import { getProject, updateProject } from "~/queries/projects.server";

export async function action({ request, params }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.projectId) {
		return redirect("/projects");
	}
	const formData = await request.formData();
	const data = {
		title: String(formData.get("title")),
		description: String(formData.get("description")),
		externalLink: String(formData.get("externalLink")),
	};
	const project = await (
		await updateProject({ userId, projectId: params.projectId, data })
	).json();
	return null; //redirect(`/projects/${params.projectId}`);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.projectId) {
		return redirect("/projects");
	}
	const { project, error } = await (
		await getProject({ userId, projectId: params.projectId })
	).json();
	return { project, error };
}

export default function EditProject() {
	const { error, project } = useLoaderData<typeof loader>();

	return (
		<Form method="patch" action={`/projects/${project.projectId}/edit`}>
			<DialogContainer
				headerText="Edit Project"
				openButtonText="Edit Project"
				closeButtonText="Cancel"
			>
				<ProjectEditor
					title={project.title}
					description={project.description}
					externalLink={project.externalLink}
				/>
			</DialogContainer>
		</Form>
	);
}
