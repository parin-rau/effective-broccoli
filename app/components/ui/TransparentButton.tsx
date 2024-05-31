type Props = {
	onClick?: () => void;
	children: React.ReactNode;
	styles?: string;
};

export default function TransparentButton({
	onClick,
	children,
	styles,
}: Props) {
	return (
		<button
			onClick={onClick}
			type={onClick ? "button" : "submit"}
			className={
				"w-fit p-2 bg-transparent hover:bg-neutral-200 active:bg-neutral-300 rounded-lg dark:hover:bg-neutral-800 dark:active:bg-neutral-700 " +
				(styles ?? "")
			}
		>
			{children}
		</button>
	);
}
