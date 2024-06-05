import { redirect } from "@remix-run/react";
import { authCookie } from "~/auth";

export async function action() {
	return redirect("/login", {
		headers: {
			"Set-Cookie": await authCookie.serialize("", {
				maxAge: 0,
			}),
		},
	});
}
