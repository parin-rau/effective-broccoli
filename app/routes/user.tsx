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
	// edit/delete user buttons

	const loaderData = useLoaderData<typeof loader>();
	const data = loaderData.data;
	const error = loaderData.error;

	return (
		<BasicContainer>
			{error && <ErrorBanner>{error}</ErrorBanner>}
			<PageHeading>User Info</PageHeading>

			{data && (
				<BorderContainer>
					<SubHeading>Stats</SubHeading>
					<span>Username: {data?.username}</span>
					{/* <span>
						Projects: {data?.projects.total ?? 0} Created,{" "}
						{data?.projects.completed ?? 0} Completed
					</span> */}
					<ProgressBar {...{ ...data.projects, uom: "Projects" }} />
					{/* <span>
						Tasks: {data?.tasks.total ?? 0} Created,{" "}
						{data?.tasks.completed ?? 0} Completed
					</span> */}
					<ProgressBar {...{ ...data.tasks, uom: "Tasks" }} />
					{/* <span>
						Subtasks: {data?.subtasks.total ?? 0} Created,{" "}
						{data?.subtasks.completed ?? 0} Completed
					</span> */}
					<ProgressBar {...{ ...data.subtasks, uom: "Subtasks" }} />
				</BorderContainer>
			)}

			<BorderContainer>
				<SubHeading>Settings</SubHeading>
				<div className="flex flex-col gap-2">
					<EditUser />
					<DeleteUser />
				</div>
			</BorderContainer>
		</BasicContainer>
	);
}
