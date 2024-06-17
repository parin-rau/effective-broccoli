import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { authCookie, requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import WarningBanner from "~/components/ui/WarningBanner";
import { deleteUser } from "~/queries/users.server";

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	const { statusCode, ...response } = await deleteUser(userId);
	if (![200, 204].includes(statusCode)) {
		return json(response, statusCode);
	} else {
		return redirect("/login", {
			headers: {
				"Set-Cookie": await authCookie.serialize("", {
					maxAge: 0,
				}),
			},
		});
	}
}

export default function DeleteUser() {
	const actionData = useActionData<typeof action>();
	const error = actionData?.error;
	const message = actionData?.message;

	return (
		<>
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{message && <MessageBanner>{message}</MessageBanner>}
			<Form method="post" action="/user/delete">
				<DialogContainer
					headerText="Delete Account"
					openButtonText="Delete Account"
					closeButtonText="Cancel"
				>
					<WarningBanner>
						<span>
							Are you sure you want to delete your account?
						</span>
						<span>
							This will also delete all projects, tasks, and
							subtasks.
						</span>
						<span>This action cannot be undone.</span>
					</WarningBanner>
				</DialogContainer>
			</Form>
		</>
	);
}
