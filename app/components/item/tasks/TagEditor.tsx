import StyledInput from "~/components/ui/StyledInput";
import StyledButton from "~/components/ui/StyledButton";
import { useState } from "react";
import TagCards from "./TagCards";

export default function TagEditor({ initValue }: { initValue: string[] }) {
	const [tags, setTags] = useState<string[]>(initValue);
	const [editor, setEditor] = useState<string>("");
	const handleEditorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setEditor(value);
	};
	const addTag = () => {
		const tag = editor.toLocaleLowerCase();
		if (!tags.includes(tag)) {
			setTags((prev) => [...prev, tag]);
		}
		setEditor("");
	};
	const deleteTag = (tag: string) => {
		setTags((prev) => prev.filter((t) => t !== tag));
	};

	return (
		<div className="flex flex-col gap-2 py-2">
			<input name="tags" type="hidden" value={JSON.stringify(tags)} />

			<StyledInput
				name="tagEditor"
				label="Tags"
				placeholder="Enter Tags (Optional)"
				type="text"
				value={editor}
				onChange={handleEditorChange}
			/>
			<TagCards tags={tags} deleteTag={deleteTag} />
			<StyledButton type="button" onClick={addTag}>
				Add Tag
			</StyledButton>
		</div>
	);
}
