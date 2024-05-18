import FancyInput from "../ui/FancyInput";

type Props = {
	isSignup?: boolean;
};

export default function Login({ isSignup }: Props) {
	return (
		<div>
			<FancyInput />
			<FancyInput />
			{isSignup && (
				<>
					<FancyInput />
					<FancyInput />
				</>
			)}
		</div>
	);
}
