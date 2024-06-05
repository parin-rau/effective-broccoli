import { Form } from "@remix-run/react";
import TransparentButton from "../ui/TransparentButton";
import LogoutIcon from "~/assets/LogoutIcon";

export default function LogoutButton() {
	return (
		<Form method="post" action="/logout">
			<TransparentButton fullWidth>
				<div className="flex gap-2">
					<LogoutIcon />
					<span>Log Out</span>
				</div>
			</TransparentButton>
		</Form>
	);
}
