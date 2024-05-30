import { InputProps } from "./inputTypes";

export default function StyledInput(props: InputProps) {
	return (
		<div className="flex flex-col gap-1">
			{props.label && <h3 className="pl-1">{props.label}</h3>}
			{props.type !== "textarea" ? (
				<input
					{...{
						className: "p-2 border border-neutral-500 rounded-md",
						...props,
					}}
				/>
			) : (
				<textarea
					{...{
						className: "p-2 border border-neutral-500 rounded-md",
						...props,
					}}
				/>
			)}
		</div>
	);
}
