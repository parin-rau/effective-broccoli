import { ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData, useFetcher } from "@remix-run/react";
import EditIcon from "~/assets/EditIcon";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import { SubtaskCardProps } from "~/components/item/itemTypes";
import SubtaskEditor from "~/components/item/subtasks/SubtaskEditor";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import { updateSubtask } from "~/queries/subtasks.server";
import { DataResponse } from "~/queries/utils/dataResponse";

export async function action({ request, params }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.subtaskId) {
		const response = new DataResponse<SubtaskCardProps>(
			{ error: "No subtaskId provided" },
			400
		);
		return json(response, response.statusCode);
	}
	const formData = await request.formData();
	const title = String(formData.get("title"));

	const { statusCode, ...response } = await updateSubtask({
		subtaskId: params.subtaskId,
		userId,
		data: { title },
	});
	return json(response, statusCode);
}

export default function EditSubtask({
	subtaskId,
	title,
}: {
	subtaskId: string;
	title: string;
}) {
	const fetcher = useFetcher();
	const actionData = useActionData<typeof action>();
	const error = actionData?.error;
	const message = actionData?.message;

	return (
		<>
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{message && <MessageBanner>{message}</MessageBanner>}
			<fetcher.Form method="patch" action={`/subtasks/${subtaskId}/edit`}>
				<DialogContainer
					headerText="Editing Subtask"
					openButtonText={<EditIcon />}
					closeButtonText="Cancel"
					transparentOpenButton
				>
					<SubtaskEditor title={title} />
				</DialogContainer>
			</fetcher.Form>
		</>
	);
}
