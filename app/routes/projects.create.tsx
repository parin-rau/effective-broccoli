import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import ProjectEditor from "~/components/item/projects/ProjectEditor";
import { createProject } from "~/queries/projects.server";

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const title = String(formData.get("title"));
	const description = String(formData.get("description"));
	const externalLink = String(formData.get("externalLink"));
	if (!title) {
		throw new Response("Bad request", { status: 400 });
	}

	const userId = await requireAuthCookie(request);
	const { projectId } = await (
		await createProject({ userId, title, description, externalLink })
	).json();
	return redirect(`/projects/${projectId}`);
}

export default function CreateProject() {
	return (
		<Form method="post" action="/projects/create">
			<DialogContainer
				headerText="Create New Project"
				openButtonText="Create Project"
				closeButtonText="Cancel"
			>
				<ProjectEditor />
			</DialogContainer>
		</Form>
	);
}
