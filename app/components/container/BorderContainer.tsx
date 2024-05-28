import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function BasicContainer({ children }: Props) {
	return (
		<div className="p-2 flex flex-col gap-2 border-2 border-neutral-500 rounded-lg">
			{children}
		</div>
	);
}
