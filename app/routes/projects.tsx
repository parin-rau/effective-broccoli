import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BasicContainer from "~/components/container/BasicContainer";
import GridContainer from "~/components/container/GridContainer";
import ProjectCard from "~/components/item/projects/ProjectCard";
import NewProject from "./projects.create";
import SpreadContainer from "~/components/container/SpreadContainer";
import PageHeading from "~/components/text/PageHeading";
import { requireAuthCookie } from "~/auth";
import { getProjectsByUserId } from "~/queries/projects.server";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";

export const meta: MetaFunction = () => {
	return [{ title: "Projects" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	const { data, message, error, statusCode } = await getProjectsByUserId(
		userId
	);
	return json({ data, message, error }, statusCode);
}

export default function ProjectHome() {
	const loaderData = useLoaderData<typeof loader>();
	const projects = loaderData?.data;
	const message = loaderData?.message;
	const error = loaderData?.error;

	return (
		<BasicContainer>
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{message && <MessageBanner>{message}</MessageBanner>}
			<SpreadContainer>
				<PageHeading>All Projects</PageHeading>
				<NewProject />
			</SpreadContainer>
			{projects?.length ? (
				<GridContainer>
					{projects.map((p) => (
						<ProjectCard key={p.projectId} {...p} />
					))}
				</GridContainer>
			) : (
				<BasicContainer>
					<span>No projects to show yet...</span>
				</BasicContainer>
			)}
		</BasicContainer>
	);
}
