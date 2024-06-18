import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import TaskEditor from "~/components/item/tasks/TaskEditor";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import { getTask, updateTask } from "~/queries/tasks.server";

export async function action({ request, params }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params?.taskId) {
		return redirect(`/tasks`);
	}
	const formData = await request.formData();

	const title = String(formData.get("title"));
	const description = String(formData.get("description"));
	const externalLink = String(formData.get("externalLink"));
	const priority = Number(formData.get("priority"));
	const due = String(formData.get("due"));
	const projectId = String(formData.get("projectId"));
	const tags = String(formData.get("tags"));

	const { statusCode, ...response } = await updateTask({
		userId,
		taskId: params.taskId,
		data: {
			title,
			description,
			externalLink,
			priority,
			due,
			projectId,
			tags,
		},
	});

	return response.data?.taskId
		? redirect(`/tasks/${response.data.taskId}/subtasks`)
		: json(response, statusCode);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params?.taskId) {
		return redirect(`/tasks`);
	}
	const response = await getTask({ taskId: params.taskId, userId });
	return json(response, response.statusCode);
}

export default function EditTask() {
	const loaderData = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const error = loaderData?.error || actionData?.error;
	const message = loaderData?.message || actionData?.message;
	const data = loaderData?.data;

	return (
		<>
			{message && <MessageBanner>{message}</MessageBanner>}
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{data?.taskId && (
				<Form method="patch" action={`/tasks/${data.taskId}/edit`}>
					{data?.project.projectId && (
						<DialogContainer
							headerText="Editing Task"
							openButtonText="Edit Task"
							closeButtonText="Cancel"
						>
							<TaskEditor
								{...{
									...data,
									projectId: data.project.projectId,
									priority: data.priority.value ?? 0,
									due: data.due.value,
								}}
							/>
						</DialogContainer>
					)}
				</Form>
			)}
		</>
	);
}
