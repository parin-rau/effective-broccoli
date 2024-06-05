import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BasicContainer from "~/components/container/BasicContainer";
import GridContainer from "~/components/container/GridContainer";
import ProjectCard from "~/components/item/projects/ProjectCard";
import NewProject from "./projects.create";
import SpreadContainer from "~/components/container/SpreadContainer";
import PageHeading from "~/components/container/PageHeading";
import { requireAuthCookie } from "~/auth";
import { getProjectsByUserId } from "~/queries/projects.server";

export async function loader({ request }: LoaderFunctionArgs) {
	const { userId } = await requireAuthCookie(request);
	const { projects } = await (await getProjectsByUserId(userId)).json();
	return projects;
}

export default function ProjectHome() {
	const projects = useLoaderData<typeof loader>();

	return (
		<BasicContainer>
			<SpreadContainer>
				<PageHeading>Projects Home</PageHeading>
				<NewProject />
			</SpreadContainer>
			<GridContainer>
				{projects.map((p) => (
					<ProjectCard key={p.projectId} {...p} />
				))}
			</GridContainer>
		</BasicContainer>
	);
}
