import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	largeGap?: boolean;
	dynamicSizing?: boolean;
};

export default function BasicContainer({
	children,
	largeGap,
	dynamicSizing,
}: Props) {
	return (
		<div
			className={`flex flex-col ${
				largeGap ? "p-4 gap-4" : "p-2 gap-2"
			} border-2 border-neutral-500 rounded-lg ${
				dynamicSizing ? "w-11/12 max-w-xl" : ""
			}`}
		>
			{children}
		</div>
	);
}
