import BasicContainer from "~/components/container/BasicContainer";
import TextareaInput from "../../ui/TextareaInput";
import TextInput from "../../ui/TextInput";

type Props = {
	title?: string;
	description?: string;
	priority?: number;
	externalLink?: string;
	due?: string;
};

export default function TaskEditor({
	title,
	description,
	priority,
	externalLink,
	due,
}: Props) {
	return (
		<BasicContainer styles="gap-3">
			<TextInput
				name="title"
				label="Title"
				defaultValue={title}
				placeholder="Enter Task Title"
				required
			/>
			<TextareaInput
				name="description"
				label="Description"
				defaultValue={description}
				placeholder="Enter Task Description (Optional)"
			/>
			<TextInput
				name="externalLink"
				label="External Resource"
				defaultValue={externalLink}
				placeholder="Enter External Resource URL (Optional)"
			/>
			<label htmlFor="priority-select">Task Priority</label>
			<select id="priority-select" defaultValue={priority}>
				<option value="">Select Task Priority</option>
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>
			<input
				name="due"
				defaultValue={due}
				type="date"
				placeholder="Enter Due Date (Optional)"
			/>
		</BasicContainer>
	);
}
