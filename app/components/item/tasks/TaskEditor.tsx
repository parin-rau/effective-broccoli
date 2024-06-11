import BasicContainer from "~/components/container/BasicContainer";
import TextareaInput from "../../ui/TextareaInput";
import TextInput from "../../ui/TextInput";
import StyledInput from "~/components/ui/StyledInput";
import StyledSelect, { SelectProps } from "~/components/ui/StyledSelect";

type Props = {
	title?: string | null;
	description?: string | null;
	priority?: number | null;
	externalLink?: string | null;
	due?: string | null;
	projectId: string;
};

const priorityOptions: SelectProps["options"] = [
	{ label: "Low", value: "0" },
	{ label: "Medium", value: "1" },
	{ label: "High", value: "2" },
];

export default function TaskEditor({
	title,
	description,
	externalLink,
	due,
	projectId,
}: Props) {
	return (
		<BasicContainer styles="gap-3">
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
				placeholder="Enter Task Title"
				required
			/>
			<TextareaInput
				name="description"
				label="Description"
				defaultValue={description ?? ""}
				placeholder="Enter Task Description (Optional)"
			/>
			<TextInput
				name="externalLink"
				label="External Resource"
				defaultValue={externalLink ?? ""}
				placeholder="Enter External Resource URL (Optional)"
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				<StyledSelect
					name="priority"
					label="Priority"
					options={priorityOptions}
				/>
				<StyledInput
					name="due"
					label="Due Date"
					defaultValue={due ?? ""}
					type="date"
					placeholder="Enter Due Date (Optional)"
				/>
			</div>
		</BasicContainer>
	);
}
