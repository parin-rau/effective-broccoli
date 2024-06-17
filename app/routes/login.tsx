import { Form, Link, useActionData } from "@remix-run/react";
import PasswordInput from "../components/ui/PasswordInput";
import TextInput from "../components/ui/TextInput";
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	MetaFunction,
	json,
	redirect,
} from "@remix-run/node";
import BorderContainer from "../components/container/BorderContainer";
import StyledButton from "~/components/ui/StyledButton";
import BasicContainer from "~/components/container/BasicContainer";
import CenteredContainer from "~/components/container/CenteredContainer";
import { validateLogin } from "~/utils/validate";
import { authCookie } from "~/auth";
import { loginUser } from "~/queries/users.server";
import ErrorMessage from "~/components/ui/ErrorMessage";

export const meta: MetaFunction = () => {
	return [{ title: "Sign In" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const username = String(formData.get("username"));
	const password = String(formData.get("password"));
	const passwordConfirm = String(formData.get("passwordConfirm"));

	const validateErrors = validateLogin(password, passwordConfirm);
	if (validateErrors) {
		return { error: validateErrors };
	}

	const { data, message, error, statusCode } = await loginUser(
		username,
		password
	);
	return data?.userId
		? redirect("/", {
				headers: {
					"Set-Cookie": await authCookie.serialize(data.userId),
				},
		  })
		: json({ data, message, error }, statusCode);
};

export async function loader({ request }: LoaderFunctionArgs) {
	const cookie = request.headers.get("Cookie");
	const userId = await authCookie.parse(cookie);
	if (userId) {
		throw redirect("/");
	} else {
		return null;
	}
}

export default function Login() {
	const actionData = useActionData<typeof action>();
	const error = actionData?.error;

	return (
		<Form method="post" className="w-full">
			<CenteredContainer>
				<BorderContainer largeGap dynamicSizing>
					<h2 className="font-bold text-2xl">Log In</h2>
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
					</BasicContainer>
					<StyledButton fullWidth>Log In</StyledButton>
					<Link to="/signup" className="hover:underline">
						Register new user
					</Link>
				</BorderContainer>
			</CenteredContainer>
		</Form>
	);
}
