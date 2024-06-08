import BorderContainer from "~/components/container/BorderContainer";
import { Subtask } from "../itemTypes";

function CompletedCard() {
	return <BorderContainer></BorderContainer>;
}

function IncompleteCard() {
	return <BorderContainer></BorderContainer>;
}

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
