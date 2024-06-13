import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { requireAuthCookie } from "~/auth";
import { updateSubtask } from "~/queries/subtasks.server";

export async function action({ request, params }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.subtaskId) {
		return redirect(`/tasks`);
	}
	const formData = await request.formData();
	const progress = Number(formData.get("progress"));
	const newProgress = progress === 0 ? 1 : 0;

	const response = await updateSubtask({
		subtaskId: params.subtaskId,
		userId,
		data: { progress: newProgress },
	});
	return json(response, response.statusCode);
}
