import BorderContainer from "../../container/BorderContainer";
import SpreadContainer from "../../container/SpreadContainer";

function TaskTableColumnNames() {
	return (
		<div className="pl-2 grid items-center grid-cols-9 font-bold">
			<span className="col-span-3">Title</span>
			<span className="col-span-2 lg:col-span-1">Progress</span>
			<span className="col-span-2 lg:col-span-1">Priority</span>
			<span className="">Due</span>
			<span className="hidden lg:block">Created</span>
			<span className="hidden md:block lg:col-span-2">Tags</span>
		</div>
	);
}

export default function TaskTable({
	children,
	title,
	containerButtons,
}: {
	children: React.ReactNode;
	title: string;
	containerButtons: React.ReactNode;
}) {
	return (
		<BorderContainer>
			<div className="pb-6">
				<SpreadContainer>
					<h2 className="font-bold text-3xl">{title}</h2>
					<div className="flex flex-row gap-2">
						{containerButtons}
					</div>
				</SpreadContainer>
			</div>

			<TaskTableColumnNames />

			<div className="flex flex-col divide-y divide-neutral-600">
				{children}
			</div>
		</BorderContainer>
	);
}
