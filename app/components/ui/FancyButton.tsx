type Props = {
	onClick: (...args: unknown[]) => unknown;
	content: React.ReactNode;
	styles?: string;
};

const defaultStyles = "";

export default function FancyButton({ onClick, content, styles }: Props) {
	const renderStyles = styles ?? defaultStyles;

	return (
		<button className={renderStyles} onClick={onClick}>
			{content}
		</button>
	);
}
