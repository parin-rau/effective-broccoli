import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import TaskEditor from "~/components/item/tasks/TaskEditor";
import { createTask } from "~/queries/tasks.server";

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	const formData = await request.formData();

	const title = String(formData.get("title"));
	const description = String(formData.get("description"));
	const externalLink = String(formData.get("externalLink"));
	const priority = Number(formData.get("priority"));
	const due = String(formData.get("due"));
	const projectId = String(formData.get("projectId"));
	const tags = String(formData.get("tags"));

	const { data } = await createTask({
		userId,
		projectId,
		title,
		description,
		externalLink,
		priority,
		due,
		tags,
	});

	return redirect(
		data?.taskId
			? `/tasks/${data.taskId}/subtasks`
			: `/projects/${projectId}/tasks`
	);
}

export default function CreateTask({ projectId }: { projectId: string }) {
	return (
		<Form method="post" action="/tasks/create">
			<DialogContainer
				headerText="Create New Task"
				openButtonText="Create Task"
				closeButtonText="Cancel"
			>
				<TaskEditor projectId={projectId} />
			</DialogContainer>
		</Form>
	);
}
