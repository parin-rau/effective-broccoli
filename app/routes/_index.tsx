import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";
import DialogContainer from "~/components/container/DialogContainer";

export const meta: MetaFunction = () => {
	return [{ title: "Projects" }, { name: "app home", content: "app home" }];
};

async function getHomeData() {
	return json([
		{ name: "test 1", value: 200 },
		{ name: "test 2", value: 400 },
	]);
}

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	const res = await getHomeData(userId);
	const views = await res.json();
	return { views, userId };
}

function Views({ views }: { views: { name: string; value: number }[] }) {
	return (
		<div className="grid grid-cols-3">
			{views.map((v, i) => (
				<div key={i} className="flex flex-col">
					<p>{v.name}</p>
					<p>{v.value}</p>
				</div>
			))}
		</div>
	);
}

export default function IndexPage() {
	const { views, userId } = useLoaderData<typeof loader>();

	return (
		<BasicContainer>
			<h1 className="font-bold">Hi Mom!</h1>
			<h2 className="italic">Test test test</h2>
			<h3>{`userId: ${userId}`}</h3>
			<DialogContainer
				openButtonText="New Project"
				closeButtonText="Cancel"
				headerText="Create New Project"
			>
				{"I'm a modal"}
			</DialogContainer>
			<Views views={views} />
		</BasicContainer>
	);
}
