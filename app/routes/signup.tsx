import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { authCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import BorderContainer from "~/components/container/BorderContainer";
import CenteredContainer from "~/components/container/CenteredContainer";
import PasswordInput from "~/components/ui/PasswordInput";
import StyledButton from "~/components/ui/StyledButton";
import TextInput from "~/components/ui/TextInput";
import ErrorMessage from "~/components/ui/ErrorMessage";
import { createUser } from "~/queries/users.server";
import { validateSignup } from "~/utils/validate";

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const username = String(formData.get("username"));
	const password = String(formData.get("password"));
	const passwordConfirm = String(formData.get("passwordConfirm"));

	const errors = await validateSignup(username, password, passwordConfirm);
	if (errors) {
		return { errors };
	}

	const res = await createUser(username, password);
	const { userId } = await res.json();
	return redirect("/", {
		headers: {
			"Set-Cookie": await authCookie.serialize(userId),
		},
	});
};

export default function SignUp() {
	const actionData = useActionData<typeof action>();
	const usernameError = actionData?.errors?.username;
	const passwordError = actionData?.errors?.password;

	return (
		<Form method="post" className="w-full">
			<CenteredContainer>
				<BorderContainer largeGap dynamicSizing>
					<h2 className="font-bold text-2xl">Register New User</h2>
					<BasicContainer styles="px-0">
						{usernameError && (
							<ErrorMessage message={usernameError} />
						)}
						<TextInput
							name="username"
							label="Username"
							placeholder="Enter Username"
							required
						/>
						{passwordError && (
							<ErrorMessage message={passwordError} />
						)}
						<PasswordInput
							name="password"
							label="Password"
							placeholder="Enter Password"
							required
						/>
						<PasswordInput
							name="passwordConfirm"
							label="Confirm Password"
							placeholder="Re-Enter Password"
							required
						/>
					</BasicContainer>
					<StyledButton fullWidth>Sign Up</StyledButton>
					<Link to="/login" className="hover:underline">
						Log in existing user
					</Link>
				</BorderContainer>
			</CenteredContainer>
		</Form>
	);
}
