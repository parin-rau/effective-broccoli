import { ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData, useFetcher } from "@remix-run/react";
import DeleteIcon from "~/assets/DeleteIcon";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import { SubtaskCardProps } from "~/components/item/itemTypes";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import WarningBanner from "~/components/ui/WarningBanner";
import { deleteSubtask } from "~/queries/subtasks.server";
import { DataResponse } from "~/queries/utils/dataResponse";

export async function action({ request, params }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.subtaskId) {
		const { statusCode, ...response } = new DataResponse<SubtaskCardProps>(
			{ error: "No subtaskId provided" },
			400
		);
		return json(response, statusCode);
	}
	const { statusCode, ...response } = await deleteSubtask({
		subtaskId: params.subtaskId,
		userId,
	});
	return json(response, statusCode);
}

export default function DeleteSubtask({ subtaskId }: { subtaskId: string }) {
	const fetcher = useFetcher();
	const actionData = useActionData<typeof action>();
	const error = actionData?.error;
	const message = actionData?.message;

	return (
		<>
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{message && <MessageBanner>{message}</MessageBanner>}
			<fetcher.Form
				method="delete"
				action={`/subtasks/${subtaskId}/delete`}
			>
				<DialogContainer
					headerText="Delete Task"
					openButtonText={<DeleteIcon />}
					closeButtonText="Cancel"
					inlineButtons
					smallWidth
					transparentOpenButton
				>
					<WarningBanner>
						<span>
							Are you sure you want to delete this subtask?
						</span>
						<span>This cannot be undone.</span>
					</WarningBanner>
				</DialogContainer>
			</fetcher.Form>
		</>
	);
}
