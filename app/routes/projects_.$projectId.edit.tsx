import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	json,
	redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import DialogContainer from "~/components/container/DialogContainer";
import ProjectEditor from "~/components/item/projects/ProjectEditor";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import { getProject, updateProject } from "~/queries/projects.server";

export async function action({ request, params }: ActionFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.projectId) {
		return redirect("/projects");
	}
	const formData = await request.formData();
	const data = {
		title: String(formData.get("title")),
		description: String(formData.get("description")),
		externalLink: String(formData.get("externalLink")),
	};
	const { error, statusCode } = await updateProject({
		userId,
		projectId: params.projectId,
		data,
	});

	return error
		? json({ error }, statusCode)
		: redirect(`/projects/${params.projectId}/tasks`);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params.projectId) {
		return redirect("/projects");
	}
	const { data, message, error, statusCode } = await getProject({
		userId,
		projectId: params.projectId,
	});

	return json({ data, message, error }, statusCode);
}

export default function EditProject() {
	const loaderData = useLoaderData<typeof loader>();
	const project = loaderData?.data;
	const message = loaderData?.message;
	const error = loaderData?.error;

	return (
		<>
			{message && <MessageBanner>{message}</MessageBanner>}
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{project && (
				<Form
					method="patch"
					action={`/projects/${project.projectId}/edit`}
				>
					<DialogContainer
						headerText="Edit Project"
						openButtonText="Edit Project"
						closeButtonText="Cancel"
					>
						<ProjectEditor
							title={project.title}
							description={project?.description}
							externalLink={project?.externalLink}
						/>
					</DialogContainer>
				</Form>
			)}
		</>
	);
}
