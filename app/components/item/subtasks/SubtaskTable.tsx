import BorderContainer from "~/components/container/BorderContainer";
import SpreadContainer from "~/components/container/SpreadContainer";

export default function SubtaskTable({
	title,
	headerButtons,
	children,
}: {
	title: string;
	headerButtons: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<BorderContainer>
			<SpreadContainer>
				<h2 className="font-bold text-3xl">{title}</h2>
				<div className="flex flex-row gap-2">{headerButtons}</div>
			</SpreadContainer>

			<div className="min-w-[400px] flex flex-col divide-y divide-neutral-600">
				{children}
			</div>
		</BorderContainer>
	);
}
