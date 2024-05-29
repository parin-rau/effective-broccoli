import { useReducer } from "react";
import { Form, Link } from "@remix-run/react";
import PasswordInput from "../components/ui/PasswordInput";
import TextInput from "../components/ui/TextInput";
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node";
import { getSession, commitSession } from "~/sessions";
import BorderContainer from "../components/container/BorderContainer";
import { validateCredentials } from "~/services/auth.server";
import StyledButton from "~/components/ui/StyledButton";

class LoginForm {
	username: string;
	password: string;

	constructor() {
		this.username = "";
		this.password = "";
	}
}

type Action = {
	type: string;
	value: string;
};

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

// export async function action({ request }: ActionFunctionArgs) {
// 	const session = await getSession(request.headers.get("Cookie"));
// 	const form = await request.formData();
// 	const username = form.get("username");
// 	const password = form.get("password");

// 	const userId = await validateCredentials(username, password);

// 	if (userId == null) {
// 		session.flash("error", "Invalid username/password");
// 		return redirect("/login", {
// 			headers: {
// 				"Set-Cookie": await commitSession(session),
// 			},
// 		});
// 	}
// }

function reducer(state: LoginForm, action: Action) {
	if (action.type === "username" || action.type === "password") {
		return { ...state, [action.type]: action.value };
	}
	throw Error("Unknown action.");
}

export default function Login() {
	const [state, dispatch] = useReducer(reducer, new LoginForm());

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		dispatch({ type: e.target.name, value: e.target.value });

	// const [state, setState] = useState<LoginForm>(new LoginForm());
	// const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const { name, value } = e.target;
	// 	setState((p) => ({ ...p, [name]: value }));
	// };

	return (
		<Form method="post" action="/login">
			<div className="container grid place-items-center w-full">
				<BorderContainer>
					<h2>Log In</h2>
					<TextInput
						name="username"
						placeholder="Username"
						value={state.username}
						onChange={onChange}
						required
					/>
					<PasswordInput
						name="password"
						placeholder="Password"
						value={state.password}
						onChange={onChange}
					/>
					<StyledButton>Log In</StyledButton>
					<Link to="/signup" className="hover:underline">
						New user? Create an account.
					</Link>
				</BorderContainer>
			</div>
		</Form>
	);
}
