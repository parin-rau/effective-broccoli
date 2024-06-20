export default function ErrorMessage({ message }: { message: string }) {
	return <p className="text-red-500 dark:text-red-600">{message}</p>;
}
