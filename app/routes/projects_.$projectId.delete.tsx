import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useParams } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import { deleteProject } from "~/queries/projects.server";

export async function action({ request }: ActionFunctionArgs) {
	const userId = requireAuthCookie(request);
	const project = await deleteProject({ userId, projectId });
	return redirect("/projects");
}

export default function DeleteProject() {
	const { projectId } = useParams();

	return (
		<Form method="delete" action={`/projects/${projectId}/delete`}>
			<DialogContainer
				headerText="Delete Project"
				openButtonText="Delete Project"
				closeButtonText="Cancel"
				inlineButtons
				smallWidth
			>
				<span className="p-2">
					Are you sure you want to delete this project?
				</span>
			</DialogContainer>
		</Form>
	);
}
