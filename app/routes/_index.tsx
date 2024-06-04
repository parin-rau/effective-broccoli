import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuthCookie } from "~/auth";
import BasicContainer from "~/components/container/BasicContainer";

export const meta: MetaFunction = () => {
	return [{ title: "Projects" }, { name: "app home", content: "app home" }];
};

function getHomeData() {
	return [
		{ name: "test 1", value: 200 },
		{ name: "test 2", value: 400 },
	];
}

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireAuthCookie(request);
	const views = await getHomeData(userId);
	return views;
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

export default function Index() {
	const { views } = useLoaderData<typeof loader>();

	return (
		<BasicContainer>
			<h1 className="font-bold">Hi Mom!</h1>
			<h2 className="italic">Test test test</h2>
			<Views views={views} />
		</BasicContainer>
	);
}
