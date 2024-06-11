import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import TaskCard from "~/components/item/tasks/TaskCard";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import { getTask } from "~/queries/tasks.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.taskId) {
		return redirect(`/tasks`);
	}
	const response = await getTask({ userId, taskId: params.taskId });
	return json(response, response.statusCode);
}

export default function TaskPage() {
	const { data: task, error, message } = useLoaderData<typeof loader>();

	return (
		<BasicContainer>
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{message && <MessageBanner>{message}</MessageBanner>}
			{task && <TaskCard {...{ ...task }} />}
			<Outlet />
		</BasicContainer>
	);
}
