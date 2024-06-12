export default function SubHeading({
	children,
}: {
	children: React.ReactNode;
}) {
	return <h3 className="text-2xl font-semibold">{children}</h3>;
}
