import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import ProjectEditor from "~/components/item/projects/ProjectEditor";
import ErrorBanner from "~/components/ui/ErrorBanner";
import { createProject } from "~/queries/projects.server";

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const title = String(formData.get("title"));
	const description = String(formData.get("description"));
	const externalLink = String(formData.get("externalLink"));
	if (!title) {
		throw new Response("Bad request", { status: 400 });
	}

	const userId = await requireAuthCookie(request);
	const { data, error, statusCode } = await createProject({
		userId,
		title,
		description,
		externalLink,
	});

	return data?.projectId
		? redirect(`/projects/${data.projectId}`)
		: json({ error }, statusCode);
}

export default function CreateProject() {
	const loaderData = useActionData<typeof action>();
	const error = loaderData?.error;

	return (
		<Form method="post" action="/projects/create">
			<DialogContainer
				headerText="Create New Project"
				openButtonText="Create Project"
				closeButtonText="Cancel"
			>
				{error && <ErrorBanner>{error}</ErrorBanner>}
				<ProjectEditor />
			</DialogContainer>
		</Form>
	);
}
