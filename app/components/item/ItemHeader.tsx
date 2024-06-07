import BasicContainer from "../container/BasicContainer";
import StatusDisplay from "../ui/StatusDisplay";
import { ItemHeader as HeaderProps } from "./itemTypes";

export default function ItemHeader({
	title,
	description,
	timestamp,
	status,
	priority,
}: HeaderProps) {
	return (
		<BasicContainer>
			<h3 className="text-2xl font-semibold">{title}</h3>
			{(status?.message || priority?.message) && (
				<div className="flex flex-row gap-2">
					{status && (
						<StatusDisplay
							message={status.message}
							styles={status?.styles}
						/>
					)}
					{priority && (
						<StatusDisplay
							message={priority.message}
							styles={priority?.styles}
						/>
					)}
				</div>
			)}
			<span className="italic">{timestamp}</span>
			{description && <p className="">{description}</p>}
		</BasicContainer>
	);
}
