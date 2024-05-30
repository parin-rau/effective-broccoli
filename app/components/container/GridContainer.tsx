type Props = {
	children: React.ReactNode;
};

export default function GridContainer({ children }: Props) {
	return (
		<div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			{children}
		</div>
	);
}
