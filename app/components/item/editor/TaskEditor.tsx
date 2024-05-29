import EditorContainer from "./EditorContainer";
import { Project, Subtask, Task } from "../itemTypes";
import TextareaInput from "../../ui/TextareaInput";
import TextInput from "../../ui/TextInput";
import { useState } from "react";

class Editor
	implements
		Omit<
			Task,
			"taskId" | "userId" | "projectId" | "progress" | "timestamp"
		>
{
	title: string;
	description?: string | undefined;
	externalLink?: string | undefined;
	subtasks: Subtask[];

	constructor() {
		this.title = "";
		this.description = "";
		this.externalLink = "";
		this.subtasks = [];
	}
}

export default function TaskEditor() {
	const [editor, setEditor] = useState(new Editor());

	return (
		<EditorContainer<Task>>
			<TextInput name="title" value={} onChange={} />
			<TextareaInput name="description" value={} onChange={} />
		</EditorContainer>
	);
}
