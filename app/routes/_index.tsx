import type { MetaFunction } from "@remix-run/node";
import BasicContainer from "~/components/container/BasicContainer";

export const meta: MetaFunction = () => {
	return [{ title: "Projects" }, { name: "app home", content: "app home" }];
};

export default function Index() {
	return (
		<BasicContainer>
			<h1 className="font-bold">Hi Mom!</h1>
			<h2 className="italic">Test test test</h2>
		</BasicContainer>
	);
}
