import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import SubtaskEditor from "~/components/item/subtasks/SubtaskEditor";
import ErrorBanner from "~/components/ui/ErrorBanner";
import { createSubtask } from "~/queries/subtasks.server";

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	const formData = await request.formData();

	const { data, error, message, statusCode } = await createSubtask();
	return json({ data, error, message }, statusCode);
}

export default function CreateSubtask({
	taskId,
	projectId,
}: {
	taskId: string;
	projectId: string;
}) {
	const actionData = useActionData<typeof action>();
	const error = actionData?.error;

	return (
		<Form method="post" action="/subtasks/create">
			<DialogContainer
				headerText="Create New Subtask"
				openButtonText="Create Subtask"
				closeButtonText="Cancel"
			>
				{error && <ErrorBanner>{error}</ErrorBanner>}
				<SubtaskEditor {...{ taskId, projectId }} />
			</DialogContainer>
		</Form>
	);
}
