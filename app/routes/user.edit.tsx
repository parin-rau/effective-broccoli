import { ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import StyledInput from "~/components/ui/StyledInput";
import { changePassword } from "~/queries/users.server";
import { DataResponse } from "~/queries/utils/dataResponse";
import { validatePassword } from "~/utils/validate";

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	const formData = await request.formData();
	const oldPassword = String(formData.get("oldPassword"));
	const newPassword = String(formData.get("newPassword"));
	const newPasswordConfirm = String(formData.get("newPasswordConfirm"));

	const validationErrors = validatePassword(newPassword, newPasswordConfirm);
	if (validationErrors) {
		const { statusCode, ...response } = new DataResponse(
			{ error: validationErrors },
			400
		);
		console.log({ response });
		return json(response, statusCode);
	}
	const { statusCode, ...response } = await changePassword({
		userId,
		oldPassword,
		newPassword,
		newPasswordConfirm,
	});
	return json(response, statusCode);
}

export default function EditUser() {
	const fetcher = useFetcher<typeof action>();
	const error = fetcher.data?.error;
	const message = fetcher.data?.message;

	return (
		<>
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{message && <MessageBanner>{message}</MessageBanner>}

			<fetcher.Form method="patch" action="/user/edit">
				<DialogContainer
					headerText="Password Change"
					openButtonText="Change Password"
					closeButtonText="Cancel"
				>
					<StyledInput
						name="oldPassword"
						type="password"
						required
						label="Current Password"
						placeholder="Enter Current Password"
					/>
					<StyledInput
						name="newPassword"
						type="password"
						required
						label="New Password"
						placeholder="Enter New Password"
					/>
					<StyledInput
						name="newPasswordConfirm"
						type="password"
						required
						label="Confirm New Password"
						placeholder="Re-Enter New Password"
					/>
				</DialogContainer>
			</fetcher.Form>
		</>
	);
}
