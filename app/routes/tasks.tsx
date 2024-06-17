import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import BorderContainer from "~/components/container/BorderContainer";
import TaskRow from "~/components/item/tasks/TaskRow";
import TaskTable from "~/components/item/tasks/TaskTable";
import NavbarLink from "~/components/navbar/NavbarLink";
import PageHeading from "~/components/text/PageHeading";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import { getTasksByUserId } from "~/queries/tasks.server";

export const meta: MetaFunction = () => {
	return [{ title: "Tasks" }];
};

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
			<div className="p-2">
				<PageHeading>All Tasks</PageHeading>
			</div>
			{tasks?.length ? (
				<TaskTable>
					{tasks.map((task) => (
						<TaskRow key={task.taskId} {...{ ...task }} />
					))}
				</TaskTable>
			) : (
				<BorderContainer>
					<NavbarLink
						to="/projects"
						text="No tasks to show yet. Go here to create tasks for projects."
					/>
				</BorderContainer>
			)}
		</BasicContainer>
	);
}
