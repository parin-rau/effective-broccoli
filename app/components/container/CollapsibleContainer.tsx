import { useState } from "react";
import CollapsibleToggle from "../ui/CollapsibleToggle";
import BasicContainer from "./BasicContainer";
import BorderContainer from "./BorderContainer";

export default function CollapsibleContainer({
	title,
	children,
	defaultOpen,
	bordered,
}: {
	title: React.ReactNode;
	children: React.ReactNode;
	defaultOpen?: boolean;
	bordered?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(defaultOpen ?? false);
	const toggleIsOpen = () => {
		setIsOpen((prev) => !prev);
	};

	if (!bordered) {
		return (
			<BasicContainer>
				<CollapsibleToggle {...{ isOpen, toggleIsOpen }}>
					{title}
				</CollapsibleToggle>
				{isOpen ? children : null}
			</BasicContainer>
		);
	} else {
		return (
			<BorderContainer>
				<CollapsibleToggle {...{ isOpen, toggleIsOpen }}>
					{title}
				</CollapsibleToggle>
				{isOpen ? children : null}
			</BorderContainer>
		);
	}
}
