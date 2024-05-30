import GridContainer from "~/components/container/GridContainer";
import { Project } from "../itemTypes";
import ProjectCard from "./ProjectCard";
import BorderContainer from "~/components/container/BorderContainer";
import ProjectEditor from "../editor/ProjectEditor";
import { useState } from "react";

type Props = {
	projects: Project[];
};

export default function ProjectContainer({ projects }: Props) {
	const [showEditor, setShowEditor] = useState(false);
	const toggleShowEditor = () => setShowEditor((prev) => !prev);

	return (
		<BorderContainer>
			<ProjectEditor {...{ showEditor, toggleShowEditor }} />
			<GridContainer>
				{projects.map((p) => (
					<ProjectCard key={p.projectId} {...p} />
				))}
			</GridContainer>
		</BorderContainer>
	);
}
