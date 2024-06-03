import GridContainer from "~/components/container/GridContainer";
import { ProjectWithProgressProps } from "../itemTypes";
import ProjectCard from "./ProjectCard";
import ProjectEditor from "../editor/ProjectEditor";
import { useState } from "react";
import BasicContainer from "~/components/container/BasicContainer";

type Props = {
	projects: ProjectWithProgressProps[];
};

export default function ProjectContainer({ projects }: Props) {
	const [showEditor, setShowEditor] = useState(false);
	const toggleShowEditor = () => setShowEditor((prev) => !prev);

	return (
		<BasicContainer>
			<ProjectEditor {...{ showEditor, toggleShowEditor }} />
			<GridContainer>
				{projects.map((p) => (
					<ProjectCard key={p.projectId} {...p} />
				))}
			</GridContainer>
		</BasicContainer>
	);
}
