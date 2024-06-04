//import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import TransparentButton from "~/components/ui/TransparentButton";
import LogoutIcon from "~/assets/LogoutIcon";
import { authCookie, logout } from "~/auth";

export async function action() {
	return redirect("/login", {
		headers: {
			"Set-Cookie": await authCookie.serialize("", {
				maxAge: 0,
			}),
		},
	});
}

// export default function LogoutButton() {
// 	return (
// 		<Form method="post">
// 			<TransparentButton fullWidth>
// 				<div className="flex gap-2">
// 					<LogoutIcon />
// 					<span>Log Out</span>
// 				</div>
// 			</TransparentButton>
// 		</Form>
// 	);
// }
