export default function PageHeading({
	children,
}: {
	children: React.ReactNode;
}) {
	return <h1 className="text-2xl sm:text-4xl font-bold">{children}</h1>;
}
