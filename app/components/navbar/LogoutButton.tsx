import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import TransparentButton from "../ui/TransparentButton";
import LogoutIcon from "~/assets/LogoutIcon";

export async function action({ request }: ActionFunctionArgs) {}

export default function LogoutButton() {
	return (
		<Form>
			<TransparentButton>
				<div className="flex gap-2">
					<LogoutIcon />
					<span>Log Out</span>
				</div>
			</TransparentButton>
		</Form>
	);
}
