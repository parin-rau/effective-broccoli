import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	largeGap?: boolean;
	dynamicSizing?: boolean;
	smallRound?: boolean;
	filledBg?: boolean;
};

export default function BorderContainer({
	children,
	largeGap,
	dynamicSizing,
	smallRound,
	filledBg,
}: Props) {
	return (
		<div
			className={`flex flex-col ${
				largeGap ? "p-4 gap-4" : "p-2 gap-2"
			} border-2 border-neutral-500 ${
				filledBg ? "bg-neutral-100 dark:bg-neutral-900" : "bg-inherit"
			} ${smallRound ? "rounded-md" : "rounded-lg"} ${
				dynamicSizing ? "w-11/12 max-w-xl" : ""
			}`}
		>
			{children}
		</div>
	);
}
