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
	inlineButtons?: boolean;
	smallWidth?: boolean;
};

type CloseButtonProps = {
	toggleDialog: () => void;
	closeButtonText: string;
};

type SubmitButtonProps = {
	toggleDialog: () => void;
	submitButtonText?: string;
};

function DialogCloseButton({
	toggleDialog,
	closeButtonText,
}: CloseButtonProps) {
	return (
		<TransparentButton onClick={toggleDialog} styles="place-self-end">
			{closeButtonText}
		</TransparentButton>
	);
}

function DialogSubmitButton({
	toggleDialog,
	submitButtonText,
}: SubmitButtonProps) {
	return (
		<StyledButton
			styles="place-self-end px-4 mr-2"
			type="submit"
			onClick={toggleDialog}
		>
			{submitButtonText ?? "Submit"}
		</StyledButton>
	);
}

export default function DialogContainer({
	children,
	openButtonText,
	closeButtonText,
	headerText,
	inlineButtons,
	smallWidth,
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
				className={`${
					smallWidth ? "w-1/2" : "w-5/6"
				} w-max-2xl p-1 dark:text-neutral-200 dark:bg-neutral-800`}
			>
				<BasicContainer>
					<SpreadContainer noSmallStack>
						<h2 className="text-2xl sm:text-3xl font-bold">
							{headerText}
						</h2>
						{!inlineButtons && (
							<DialogCloseButton
								closeButtonText={closeButtonText}
								toggleDialog={toggleDialog}
							/>
						)}
					</SpreadContainer>
					{children}
					{inlineButtons ? (
						<div className="flex flex-row gap-2 place-self-end">
							<DialogCloseButton
								closeButtonText={closeButtonText}
								toggleDialog={toggleDialog}
							/>
							<DialogSubmitButton
								submitButtonText="Confirm"
								toggleDialog={toggleDialog}
							/>
						</div>
					) : (
						<DialogSubmitButton toggleDialog={toggleDialog} />
					)}
				</BasicContainer>
			</dialog>
		</>
	);
}
