import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
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

	const { data } = await updateTask({
		userId,
		taskId: params.taskId,
		data: { title, description, externalLink, priority, due, projectId },
	});

	return redirect(
		data?.taskId ? `/tasks/${data.taskId}` : `/projects/${projectId}`
	);
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
	const error = loaderData?.error;
	const message = loaderData?.message;
	const data = loaderData?.data;

	return (
		<>
			{message && <MessageBanner>{message}</MessageBanner>}
			{error && <ErrorBanner>{error}</ErrorBanner>}
			<Form method="post" action="/tasks/create">
				{data?.projectId && (
					<DialogContainer
						headerText="Create New Task"
						openButtonText="Create Task"
						closeButtonText="Cancel"
					>
						<TaskEditor projectId={data.projectId} />
					</DialogContainer>
				)}
			</Form>
		</>
	);
}
