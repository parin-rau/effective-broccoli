import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useParams } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import ErrorBanner from "~/components/ui/ErrorBanner";
import WarningBanner from "~/components/ui/WarningBanner";
import { deleteProject } from "~/queries/projects.server";

export async function action({ request, params }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.projectId) {
		return redirect("/projects");
	}

	const res = await deleteProject({
		userId,
		projectId: params.projectId,
	});
	const { message } = await res.json();

	return res.ok ? redirect("/projects") : { error: message };
}

export default function DeleteProject() {
	const { projectId } = useParams();
	const actionData = useActionData<typeof action>();
	const error = actionData?.error;

	return (
		<>
			{error && <ErrorBanner>{error}</ErrorBanner>}
			<Form method="delete" action={`/projects/${projectId}/delete`}>
				<DialogContainer
					headerText="Delete Project"
					openButtonText="Delete Project"
					closeButtonText="Cancel"
					inlineButtons
					smallWidth
				>
					<WarningBanner>
						<span>
							Are you sure you want to delete this project?
						</span>
						<span>
							Proceeding will also delete all associated tasks.
						</span>
					</WarningBanner>
				</DialogContainer>
			</Form>
		</>
	);
}
