import BorderContainer from "~/components/container/BorderContainer";
import { Subtask } from "../itemTypes";

interface Props extends Subtask {
	children: React.ReactNode;
}

const onClick =
	(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
	(subtaskId: string) => {
		const {} = e.target;
	};

export default function SubtaskCard(props: Props) {
	return (
		<div className="border rounded-lg hover:bg-neutral-300 border-neutral-500">
			<button
				className="p-2 hover:bg-neutral-200"
				onClick={onClick}
				type="button"
			>
				{<p className="">{props.title}</p>}
			</button>
		</div>
	);
}
