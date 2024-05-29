import GridContainer from "~/components/container/GridContainer";
import { Project } from "../itemTypes";
import ProjectCard from "./ProjectCard";
import BorderContainer from "~/components/container/BorderContainer";
import ProjectEditor from "../editor/ProjectEditor";

type Props = {
	projects: Project[];
};

export default function ProjectContainer({ projects }: Props) {
	return (
		<BorderContainer>
			<ProjectEditor />
			<GridContainer>
				{projects.map((p) => (
					<ProjectCard key={p.projectId} {...p} />
				))}
			</GridContainer>
		</BorderContainer>
	);
}
