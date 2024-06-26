import {
	LoaderFunctionArgs,
	MetaFunction,
	json,
	redirect,
} from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import TaskTable from "~/components/item/tasks/TaskTable";
import TaskRow from "~/components/item/tasks/TaskRow";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import { getTasksByProjectId } from "~/queries/tasks.server";
import CreateTask from "./tasks.create";
import { loader as projectLoader } from "./projects_.$projectId";

export const meta: MetaFunction<
	typeof loader,
	{ "routes/projects_.$projectId": typeof projectLoader }
> = ({ matches }) => {
	const project = matches.find(
		(match) => match.id === "routes/projects_.$projectId"
	)?.data;
	const projectTitle = project?.data?.title ?? "Project";
	return [{ title: projectTitle }];
};

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
	const params = useParams();
	const loaderData = useLoaderData<typeof loader>();
	const tasks = loaderData?.data;
	const error = loaderData?.error;
	const message = loaderData?.message;

	return (
		<div className="flex flex-col gap-4">
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{message && <MessageBanner>{message}</MessageBanner>}
			{params.projectId && (
				<TaskTable
					title="Tasks"
					containerButtons={
						<CreateTask projectId={params.projectId} />
					}
				>
					{tasks &&
						tasks.map((task) => (
							<TaskRow key={task.taskId} {...{ ...task }} />
						))}
				</TaskTable>
			)}
		</div>
	);
}
