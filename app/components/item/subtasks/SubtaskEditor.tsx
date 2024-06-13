import BasicContainer from "~/components/container/BasicContainer";
import TextInput from "../../ui/TextInput";

export default function SubtaskEditor({
	projectId,
	taskId,
	title,
}: {
	projectId?: string;
	taskId?: string;
	title?: string;
}) {
	return (
		<BasicContainer styles="gap-3">
			{taskId && (
				<input type="hidden" name="taskId" defaultValue={taskId} />
			)}
			{projectId && (
				<input
					type="hidden"
					name="projectId"
					defaultValue={projectId}
				/>
			)}

			<TextInput
				name="title"
				label="Title"
				defaultValue={title ?? ""}
				placeholder="Enter Subtask Title"
				required
			/>
		</BasicContainer>
	);
}
