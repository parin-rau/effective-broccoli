import { ReactNode } from "react";
import FancyInput from "../ui/FancyInput";
import { Form } from "@remix-run/react";

type Props = {
	isSignup?: boolean;
	children: ReactNode;
};

export default function Login({ isSignup, children }: Props) {
	return (
		<Form>
			<FancyInput />
			<FancyInput />
			{isSignup && (
				<>
					<FancyInput />
					<FancyInput />
				</>
			)}
			{children}
		</Form>
	);
}
