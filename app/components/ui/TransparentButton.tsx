type Props = {
	onClick: () => void;
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
			type="button"
			className={
				"p-2 bg-transparent hover:bg-neutral-200 active:bg-neutral-300 rounded-lg " +
				(styles ?? "")
			}
		>
			{children}
		</button>
	);
}
