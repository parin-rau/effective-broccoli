import { ReactNode } from "react";
import { ChevronDown, ChevronUp } from "~/assets/Chevron";
import TransparentButton from "./TransparentButton";

type Props = {
	isOpen: boolean;
	toggleIsOpen: () => void;
	children?: ReactNode;
};

export default function CollapsibleToggle({
	isOpen,
	toggleIsOpen,
	children,
}: Props) {
	return (
		<TransparentButton
			styles="flex gap-4 items-center"
			onClick={toggleIsOpen}
		>
			{isOpen ? <ChevronUp /> : <ChevronDown />}
			{children}
		</TransparentButton>
	);
}
