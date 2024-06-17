import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import BorderContainer from "~/components/container/BorderContainer";
import SubHeading from "~/components/text/SubHeading";
import { getUserStats } from "~/queries/users.server";
import EditUser from "./user.edit";
import DeleteUser from "./user.delete";
import PageHeading from "~/components/text/PageHeading";
import ErrorBanner from "~/components/ui/ErrorBanner";
import ProgressBar from "~/components/item/ProgressBar";

export async function loader({ request }: LoaderFunctionArgs) {
	// Loader summary stats for user:
	// total projects, tasks, subtasks created and completed
	// account age
	// username

	const userId = await requireAuthCookie(request);
	const { statusCode, ...response } = await getUserStats(userId);

	return json(response, statusCode);
}

export default function UserPage() {
	const loaderData = useLoaderData<typeof loader>();
	const data = loaderData.data;
	const error = loaderData.error;

	return (
		<BasicContainer>
			<BasicContainer>
				{error && <ErrorBanner>{error}</ErrorBanner>}
				<PageHeading>User Info</PageHeading>
			</BasicContainer>

			{data && (
				<BorderContainer>
					<BasicContainer>
						<SubHeading>Overall Stats</SubHeading>
						<span>Username: {data?.username}</span>
						<span>Account created: {data?.accountAge}</span>
					</BasicContainer>

					<ProgressBar {...{ ...data.projects, uom: "Projects" }} />
					<ProgressBar {...{ ...data.tasks, uom: "Tasks" }} />
					<ProgressBar {...{ ...data.subtasks, uom: "Subtasks" }} />
				</BorderContainer>
			)}

			<BorderContainer>
				<BasicContainer>
					<SubHeading>Settings</SubHeading>
					<EditUser />
					<DeleteUser />
				</BasicContainer>
			</BorderContainer>
		</BasicContainer>
	);
}
