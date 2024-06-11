import { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "react-router";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import { getSubtasksByTaskId } from "~/queries/subtasks.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params?.taskId) {
		return redirect(`/tasks`);
	}

	return null;

	const response = await getSubtasksByTaskId({ userId, taskId });
	return json(response, response.statusCode);
}

export default function SubtaskFeedForTask() {
	return <BasicContainer>Subtasks go here</BasicContainer>;
}
