import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import { SubtaskCardProps } from "~/components/item/itemTypes";
import SubtaskEditor from "~/components/item/subtasks/SubtaskEditor";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import { createSubtask } from "~/queries/subtasks.server";
import { DataResponse } from "~/queries/utils/dataResponse";

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	const formData = await request.formData();

	const title = String(formData.get("title"));
	const taskId = String(formData.get("taskId"));
	const projectId = String(formData.get("projectId"));

	const { statusCode, ...response } = await createSubtask({
		userId,
		taskId,
		projectId,
		title,
	});
	return response.data?.taskId
		? redirect(`/tasks/${response.data.taskId}/subtasks`)
		: json(response, statusCode);
}

export default function CreateSubtask({
	taskId,
	projectId,
}: {
	taskId: string;
	projectId: string;
}) {
	const actionData = useActionData<DataResponse<SubtaskCardProps>>();
	const error = actionData?.error;
	const message = actionData?.message;

	return (
		<Form method="post" action="/subtasks/create">
			<DialogContainer
				headerText="Create New Subtask"
				openButtonText="Create Subtask"
				closeButtonText="Cancel"
			>
				{error && <ErrorBanner>{error}</ErrorBanner>}
				{message && <MessageBanner>{message}</MessageBanner>}
				<SubtaskEditor {...{ taskId, projectId }} />
			</DialogContainer>
		</Form>
	);
}
