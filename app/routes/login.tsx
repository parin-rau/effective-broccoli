import { Form, Link, useActionData } from "@remix-run/react";
import PasswordInput from "../components/ui/PasswordInput";
import TextInput from "../components/ui/TextInput";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import BorderContainer from "../components/container/BorderContainer";
import StyledButton from "~/components/ui/StyledButton";
import BasicContainer from "~/components/container/BasicContainer";
import CenteredContainer from "~/components/container/CenteredContainer";
import { validateLogin } from "~/utils/validate";
import { authCookie } from "~/auth";
import { loginUser } from "~/utils/queries";
import ErrorMessage from "~/components/ui/errorMessage";

// export async function loader({ request }: LoaderFunctionArgs) {
// 	const session = await getSession(request.headers.get("Cookie"));

// 	if (sessionStorage.has("userId")) {
// 		return redirect("/");
// 	}

// 	const data = { error: session.get("error") };

// 	return json(data, {
// 		headers: {
// 			"Set-Cookie": await commitSession(session),
// 		},
// 	});
// }

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const username = String(formData.get("username"));
	const password = String(formData.get("password"));
	const passwordConfirm = String(formData.get("passwordConfirm"));

	const errors = await validateLogin(password, passwordConfirm);
	if (errors) {
		return { errors };
	}

	const user = await loginUser(username, password);
	return redirect("/", {
		headers: {
			"Set-Cookie": await authCookie.serialize(user.id),
		},
	});
};

export default function Login() {
	const actionData = useActionData<typeof action>();
	const usernameError = actionData?.errors?.username;
	const passwordError = actionData?.errors?.password;

	return (
		<Form method="post" className="w-full">
			<CenteredContainer>
				<BorderContainer largeGap dynamicSizing>
					<h2 className="font-bold text-2xl">Log In</h2>
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
