import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import GridContainer from "~/components/container/GridContainer";
import { getTasksByUserId } from "~/queries/tasks.server";

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	const tasks = await (await getTasksByUserId(userId)).json();

	return tasks;
}

export default function TasksHome() {
	const tasks = useLoaderData<typeof loader>();
	return (
		<BasicContainer>
			<GridContainer>
				{tasks.map((task) => (
					<TaskCard key={task.taskId} {...{ ...task }} />
				))}
			</GridContainer>
		</BasicContainer>
	);
}
