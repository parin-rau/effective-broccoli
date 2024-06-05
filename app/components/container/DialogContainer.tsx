import { useRef } from "react";
import BasicContainer from "./BasicContainer";
import StyledButton from "../ui/StyledButton";
import TransparentButton from "../ui/TransparentButton";
import SpreadContainer from "./SpreadContainer";

type DialogProps = {
	children: React.ReactNode;
	openButtonText: string;
	closeButtonText: string;
	headerText: string;
};

type CloseButtonProps = {
	toggleDialog: () => void;
	closeButtonText: string;
};

function DialogCloseButton({
	toggleDialog,
	closeButtonText,
}: CloseButtonProps) {
	return (
		<TransparentButton onClick={toggleDialog}>
			{closeButtonText}
		</TransparentButton>
	);
}

export default function DialogContainer({
	children,
	openButtonText,
	closeButtonText,
	headerText,
}: DialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const toggleDialog = () => {
		if (!dialogRef.current) {
			return;
		}
		dialogRef.current.hasAttribute("open")
			? dialogRef.current.close()
			: dialogRef.current.showModal();
	};

	return (
		<>
			<StyledButton onClick={toggleDialog}>{openButtonText}</StyledButton>
			<dialog
				ref={dialogRef}
				className="w-5/6 w-max-2xl p-1 dark:text-neutral-200 dark:bg-neutral-800"
			>
				<BasicContainer>
					<SpreadContainer>
						<h2 className="text-3xl font-bold">{headerText}</h2>
						<DialogCloseButton
							closeButtonText={closeButtonText}
							toggleDialog={toggleDialog}
						/>
					</SpreadContainer>
					{children}
				</BasicContainer>
			</dialog>
		</>
	);
}
