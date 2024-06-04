type Props = {
	onClick?: (...args: unknown[]) => unknown;
	children: React.ReactNode;
	fullWidth?: boolean;
};

export default function StyledButton({ children, fullWidth, onClick }: Props) {
	return (
		<button
			className={
				"p-2 text-neutral-50 font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 rounded-lg " +
				(fullWidth ? "w-full" : "w-fit")
			}
			onClick={onClick}
			type={onClick ? "button" : "submit"}
		>
			{children}
		</button>
	);
}
