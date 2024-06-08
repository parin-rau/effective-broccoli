import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import GridContainer from "~/components/container/GridContainer";
import TaskCard from "~/components/item/tasks/TaskCard";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import { getTasksByUserId } from "~/queries/tasks.server";

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	const { data, message, error, statusCode } = await getTasksByUserId(userId);
	return json({ data, message, error }, statusCode);
}

export default function TasksHome() {
	const loaderData = useLoaderData<typeof loader>();
	const tasks = loaderData?.data;
	const message = loaderData?.message;
	const error = loaderData?.error;

	return (
		<BasicContainer>
			{message && <MessageBanner>{message}</MessageBanner>}
			{error && <ErrorBanner>{error}</ErrorBanner>}
			<GridContainer>
				{tasks &&
					tasks.map((task) => (
						<TaskCard key={task.taskId} {...{ ...task }} />
					))}
			</GridContainer>
		</BasicContainer>
	);
}
