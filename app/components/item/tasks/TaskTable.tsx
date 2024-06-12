import BorderContainer from "../../container/BorderContainer";
import SpreadContainer from "../../container/SpreadContainer";

function TaskTableColumnNames() {
	return (
		<div className="pl-2 min-w-[400px] grid items-center grid-cols-10 font-bold">
			<span className="col-span-3">Title</span>
			<span className="col-span-2 lg:col-span-1">Progress</span>
			<span className="col-span-2 lg:col-span-1">Priority</span>
			<span className="">Due</span>
			<span className="">Project</span>
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
} & (
	| { title?: never; containerButtons?: never }
	| { title: string; containerButtons: React.ReactNode }
)) {
	return (
		<BorderContainer>
			{title && containerButtons && (
				<div className="pb-6">
					<SpreadContainer>
						<h2 className="font-bold text-3xl">{title}</h2>
						<div className="flex flex-row gap-2">
							{containerButtons}
						</div>
					</SpreadContainer>
				</div>
			)}

			<div className="py-1 flex flex-col gap-1 overflow-x-auto">
				<TaskTableColumnNames />
				<div className="min-w-[400px] flex flex-col divide-y divide-neutral-600">
					{children}
				</div>
			</div>
		</BorderContainer>
	);
}
