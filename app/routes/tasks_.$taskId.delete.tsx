import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useParams } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import WarningBanner from "~/components/ui/WarningBanner";
import { deleteTask } from "~/queries/tasks.server";

export async function action({ request, params }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.taskId) {
		return redirect(`/tasks`);
	}
	const response = await deleteTask({ userId, taskId: params.taskId });
	return json(response, response.statusCode);
}

export default function DeleteTask() {
	const { taskId } = useParams();
	const actionData = useActionData<typeof action>();
	const error = actionData?.error;
	const message = actionData?.message;

	return (
		<>
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{message && <MessageBanner>{message}</MessageBanner>}
			<Form method="delete" action={`/tasks/${taskId}/delete`}>
				<DialogContainer
					headerText="Delete Task"
					openButtonText="Delete Task"
					closeButtonText="Cancel"
					inlineButtons
					smallWidth
				>
					<WarningBanner>
						<span>Are you sure you want to delete this task?</span>
						<span>
							Proceeding will also delete all associated subtasks.
						</span>
					</WarningBanner>
				</DialogContainer>
			</Form>
		</>
	);
}
