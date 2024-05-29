type Props = {
	deleteEntity: string;
	children: React.ReactNode;
};

export default function SubtaskDeleteButton(props: Props) {
	return <button>{children}</button>;
}
