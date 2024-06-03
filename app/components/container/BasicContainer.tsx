import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	styles?: string;
};

export default function BasicContainer({ children, styles }: Props) {
	return (
		<div className={"p-2 flex flex-col gap-2 " + (styles ?? "")}>
			{children}
		</div>
	);
}
