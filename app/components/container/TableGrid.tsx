import BorderContainer from "./BorderContainer";
import PageHeading from "./PageHeading";
import SpreadContainer from "./SpreadContainer";

function ButtonContainer({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}

export default function TableGrid({
	children,
	columns,
	title,
	containerButtons,
}: {
	children: React.ReactNode;
	columns: string[];
	title: string;
	containerButtons: React.ReactNode;
}) {
	return (
		<BorderContainer>
			<div className="pb-6">
				<SpreadContainer>
					<h2 className="font-bold text-3xl">{title}</h2>
					<ButtonContainer>{containerButtons}</ButtonContainer>
				</SpreadContainer>
			</div>

			<div
				className={`grid items-center grid-cols-${columns.length + 3}`}
			>
				{columns.map((col, colCount) => (
					<span
						key={colCount}
						className={`pl-2 font-semibold ${
							colCount === 0 ? "col-span-3" : ""
						} ${colCount === 1 ? "col-span-2" : ""}`}
					>
						{col}
					</span>
				))}
			</div>
			<div className="flex flex-col divide-y divide-neutral-600">
				{children}
			</div>
		</BorderContainer>
	);
}
