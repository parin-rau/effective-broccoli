import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { authCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import BorderContainer from "~/components/container/BorderContainer";
import CenteredContainer from "~/components/container/CenteredContainer";
import PasswordInput from "~/components/ui/PasswordInput";
import StyledButton from "~/components/ui/StyledButton";
import TextInput from "~/components/ui/TextInput";
import ErrorMessage from "~/components/ui/ErrorMessage";
import { createUser, userExists } from "~/queries/users.server";
import { validateSignup } from "~/utils/validate";

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const username = String(formData.get("username"));
	const password = String(formData.get("password"));
	const passwordConfirm = String(formData.get("passwordConfirm"));

	const validationError = await validateSignup(
		username,
		password,
		passwordConfirm
	);
	if (validationError) {
		return json({ error: validationError }, 400);
	}

	const userNotInDb = await userExists(username);
	if (userNotInDb.error || userNotInDb?.data?.exists) {
		return json({ error: userNotInDb.error }, userNotInDb.statusCode);
	}

	const { data, error, statusCode } = await createUser(username, password);
	return data?.userId
		? redirect("/", {
				headers: {
					"Set-Cookie": await authCookie.serialize(data.userId),
				},
		  })
		: json({ error }, statusCode);
}

export async function loader({ request }: LoaderFunctionArgs) {
	const cookie = request.headers.get("Cookie");
	const userId = await authCookie.parse(cookie);
	if (userId) {
		throw redirect("/");
	} else {
		return null;
	}
}

export default function SignUp() {
	const actionData = useActionData<typeof action>();
	const error = actionData?.error;

	return (
		<Form method="post" className="w-full">
			<CenteredContainer>
				<BorderContainer largeGap dynamicSizing>
					<h2 className="font-bold text-2xl">Register New User</h2>
					<BasicContainer styles="px-0">
						{error && <ErrorMessage message={error} />}
						<TextInput
							name="username"
							label="Username"
							placeholder="Enter Username"
							required
						/>
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
