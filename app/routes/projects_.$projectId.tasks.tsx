import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import TaskTable from "~/components/item/tasks/TaskTable";
import TaskRow from "~/components/item/tasks/TaskRow";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import { getTasksByProjectId } from "~/queries/tasks.server";
import CreateTask from "./tasks.create";

export async function loader({ request, params }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.projectId) {
		return redirect("/projects");
	}

	const { data, message, error, statusCode } = await getTasksByProjectId({
		userId,
		projectId: params.projectId,
	});
	return json({ data, error, message }, statusCode);
}

export default function TaskFeedForProject() {
	const loaderData = useLoaderData<typeof loader>();
	const tasks = loaderData?.data;
	const error = loaderData?.error;
	const message = loaderData?.message;

	return (
		<div className="flex flex-col gap-4">
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{message && <MessageBanner>{message}</MessageBanner>}
			{tasks && (
				<TaskTable
					title="Tasks"
					containerButtons={
						<CreateTask projectId={tasks[0].project.projectId} />
					}
				>
					{tasks.map((task) => (
						<TaskRow key={task.taskId} {...{ ...task }} />
					))}
				</TaskTable>
			)}
		</div>
	);
}
