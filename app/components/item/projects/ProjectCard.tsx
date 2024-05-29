import BorderContainer from "~/components/container/BorderContainer";
import ItemHeader from "../ItemHeader";
import { Project } from "../itemTypes";

export default function ProjectCard({
	projectId,
	userId,
	title,
	description,
	timestamp,
}: Project) {
	const headerProps = {
		id: projectId,
		userId,
		title,
		description,
		timestamp,
	};

	return (
		<BorderContainer>
			<ItemHeader {...{ ...headerProps }} />
		</BorderContainer>
	);
}
