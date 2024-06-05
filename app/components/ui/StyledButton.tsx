type Props = {
	onClick?: (...args: unknown[]) => unknown;
	children: React.ReactNode;
	fullWidth?: boolean;
	styles?: string;
};

export default function StyledButton({
	children,
	fullWidth,
	onClick,
	styles,
}: Props) {
	return (
		<button
			className={`p-2 text-neutral-50 font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 rounded-lg
				${fullWidth ? "w-full" : "w-fit"} ${styles ?? ""}`}
			onClick={onClick}
			type={onClick ? "button" : "submit"}
		>
			{children}
		</button>
	);
}
