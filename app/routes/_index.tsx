import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import BorderContainer from "~/components/container/BorderContainer";
import CollapsibleContainer from "~/components/container/CollapsibleContainer";
import GridContainer from "~/components/container/GridContainer";
import ProjectCard from "~/components/item/projects/ProjectCard";
import TaskRow from "~/components/item/tasks/TaskRow";
import TaskTable from "~/components/item/tasks/TaskTable";
import NavbarLink from "~/components/navbar/NavbarLink";
import PageHeading from "~/components/text/PageHeading";
import SubHeading from "~/components/text/SubHeading";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import { getUserHomeView } from "~/queries/users.server";

export const meta: MetaFunction = () => {
	return [{ title: "Home" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	const { statusCode, ...response } = await getUserHomeView(userId);
	return json(response, statusCode);
}

export default function IndexPage() {
	const loaderData = useLoaderData<typeof loader>();
	const error = loaderData.error;
	const message = loaderData.message;
	const data = loaderData.data;

	return (
		<BasicContainer>
			<BasicContainer>
				<PageHeading>Home</PageHeading>
			</BasicContainer>
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{message && <MessageBanner>{message}</MessageBanner>}
			<CollapsibleContainer
				title={<SubHeading>Recently Created Projects</SubHeading>}
				defaultOpen={Boolean(data?.projects)}
			>
				{data?.projects.length ? (
					<GridContainer>
						{data.projects.map((project) => (
							<ProjectCard
								key={project.projectId}
								{...{ ...project }}
							/>
						))}
					</GridContainer>
				) : (
					<BorderContainer>
						<NavbarLink
							to="/projects"
							text="Go here to create your first project"
						/>
					</BorderContainer>
				)}
			</CollapsibleContainer>

			<CollapsibleContainer
				title={<SubHeading>Recently Created Tasks</SubHeading>}
				defaultOpen={Boolean(data?.tasks)}
			>
				{data?.tasks.length ? (
					<TaskTable>
						{data.tasks.map((task) => (
							<TaskRow key={task.taskId} {...{ ...task }} />
						))}
					</TaskTable>
				) : (
					<BorderContainer>
						<NavbarLink
							to="/projects"
							text="Go here to create tasks for projects"
						/>
					</BorderContainer>
				)}
			</CollapsibleContainer>
		</BasicContainer>
	);
}
