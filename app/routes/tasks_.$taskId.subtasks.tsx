import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useOutletContext, useParams } from "@remix-run/react";
import { json, redirect } from "react-router";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import SubtaskTable from "~/components/item/subtasks/SubtaskTable";
import ErrorBanner from "~/components/ui/ErrorBanner";
import MessageBanner from "~/components/ui/MessageBanner";
import { getSubtasksByTaskId } from "~/queries/subtasks.server";
import CreateSubtask from "./subtasks.create";
import SubtaskCard from "~/components/item/subtasks/SubtaskCard";
import { SubtaskCardProps } from "~/components/item/itemTypes";
import { DataResponse } from "~/queries/utils/dataResponse";

export async function loader({ request, params }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	if (!params?.taskId) {
		return redirect(`/tasks`);
	}
	const response = await getSubtasksByTaskId({
		userId,
		taskId: params.taskId,
	});
	return json(response, response.statusCode);
}

export default function SubtaskFeedForTask() {
	const outletContext = useOutletContext<{ projectId?: string }>();
	const params = useParams();
	const {
		data: subtasks,
		message,
		error,
	} = useLoaderData<DataResponse<SubtaskCardProps[]>>();
	const projectId = outletContext?.projectId;
	const taskId = params?.taskId;

	return (
		<div className="flex flex-col gap-4">
			{message && <MessageBanner>{message}</MessageBanner>}
			{error && <ErrorBanner>{error}</ErrorBanner>}
			{projectId && taskId && (
				<SubtaskTable
					title="Subtasks"
					headerButtons={
						<CreateSubtask taskId={taskId} projectId={projectId} />
					}
				>
					{subtasks &&
						subtasks.map((subtask) => (
							<SubtaskCard
								key={subtask.subtaskId}
								{...{ ...subtask }}
							/>
						))}
				</SubtaskTable>
			)}
		</div>
	);
}
