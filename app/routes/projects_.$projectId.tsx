import BasicContainer from "~/components/container/BasicContainer";
import { ProjectWithProgressProps } from "~/components/item/itemTypes";
import ProjectCard from "~/components/item/projects/ProjectCard";

type Props = {
	project: ProjectWithProgressProps;
};

export async function action() {
	return null;
}
export async function loader() {
	return null;
}
export default function Project({ project }: Props) {
	return (
		<BasicContainer>
			<ProjectCard {...project} />
			<h1>Project.projectId route test test test</h1>
		</BasicContainer>
	);
}
