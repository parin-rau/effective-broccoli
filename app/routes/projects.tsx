import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BasicContainer from "~/components/container/BasicContainer";
import GridContainer from "~/components/container/GridContainer";
import ProjectCard from "~/components/item/projects/ProjectCard";
import NewProject from "./projects.create";
import SpreadContainer from "~/components/container/SpreadContainer";
import PageHeading from "~/components/container/PageHeading";
import { requireAuthCookie } from "~/auth";
import { getProjectsByUserId } from "~/queries/projects.server";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";

export async function loader({ request }: LoaderFunctionArgs) {
	const { userId } = await requireAuthCookie(request);
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
				<PageHeading>Projects Home</PageHeading>
				<NewProject />
			</SpreadContainer>
			<GridContainer>
				{projects &&
					projects.map((p) => (
						<ProjectCard key={p.projectId} {...p} />
					))}
			</GridContainer>
		</BasicContainer>
	);
}
