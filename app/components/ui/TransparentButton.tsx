type Props = {
	onClick?: () => void;
	children: React.ReactNode;
	fullWidth?: boolean;
	styles?: string;
};

export default function TransparentButton({
	onClick,
	children,
	fullWidth,
	styles,
}: Props) {
	return (
		<button
			onClick={onClick}
			type={onClick ? "button" : "submit"}
			className={`${
				fullWidth ? "w-full" : "w-fit"
			} p-2 bg-transparent hover:bg-neutral-200 active:bg-neutral-300 rounded-lg dark:hover:bg-neutral-700 dark:active:bg-neutral-600 ${
				styles ?? ""
			}`}
		>
			{children}
		</button>
	);
}
