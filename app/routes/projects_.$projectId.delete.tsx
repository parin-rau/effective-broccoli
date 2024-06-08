import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useParams } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import WarningBanner from "~/components/ui/WarningBanner";
import { deleteProject } from "~/queries/projects.server";

export async function action({ request, params }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.projectId) {
		return redirect("/projects");
	}

	const { message, error, statusCode } = await deleteProject({
		userId,
		projectId: params.projectId,
	});
	return error ? json({ message, error }, statusCode) : redirect("/projects");
}

export default function DeleteProject() {
	const { projectId } = useParams();
	const actionData = useActionData<typeof action>();
	const error = actionData?.error;
	const message = actionData?.message;

	return (
		<>
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{message && <MessageBanner>{message}</MessageBanner>}
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
