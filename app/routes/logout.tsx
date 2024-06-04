import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import TransparentButton from "~/components/ui/TransparentButton";
import LogoutIcon from "~/assets/LogoutIcon";
import { destroySession, getSession } from "~/sessions";

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	return redirect("/login", {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
}

export default function LogoutButton() {
	return (
		<Form method="post">
			<TransparentButton fullWidth>
				<div className="flex gap-2">
					<LogoutIcon />
					<span>Log Out</span>
				</div>
			</TransparentButton>
		</Form>
	);
}
