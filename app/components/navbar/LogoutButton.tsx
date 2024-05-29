import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {}

export default function LogoutButton() {
	return (
		<Form>
			<button className={"p-2 w-fit rounded-lg hover:bg-neutral-200"}>
				Log Out
			</button>
		</Form>
	);
}
