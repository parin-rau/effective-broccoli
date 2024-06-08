import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import GridContainer from "~/components/container/GridContainer";
import PageHeading from "~/components/container/PageHeading";
import TableGrid from "~/components/container/TableGrid";
import TaskCard from "~/components/item/tasks/TaskCard";
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
				<TableGrid
					title="Tasks"
					columns={[
						"Title",
						"Progress",
						"Due",
						"Priority",
						"Created",
					]}
					containerButtons={
						<CreateTask projectId={tasks[0].projectId} />
					}
				>
					{tasks.map((task) => (
						<TaskRow key={task.taskId} {...{ ...task }} />
					))}
				</TableGrid>
			)}
		</div>
	);
}
