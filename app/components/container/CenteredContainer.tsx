export default function CenteredContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="pt-4 grid place-items-center w-full">{children}</div>
	);
}
