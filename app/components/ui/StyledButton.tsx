/* eslint-disable no-mixed-spaces-and-tabs */
type Children = React.ReactNode;
type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
type OnClick = (...args: unknown[]) => unknown;

// type Props = {
// 	onClick?: (...args: unknown[]) => unknown;
// 	children: React.ReactNode;
// 	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
// };

type Props = {
	onClick?: OnClick;
	children: Children;
	type?: ButtonType;
};

export default function StyledButton({ onClick, children, type }: Props) {
	return (
		<button
			className="p-2 text-neutral-100 font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-lg"
			onClick={onClick}
			type={onclick ? type : "submit"}
		>
			{children}
		</button>
	);
}
