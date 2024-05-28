import type { MetaFunction } from "@remix-run/node";
import BasicContainer from "~/components/container/BasicContainer";
import Navbar from "~/components/navbar/Navbar";

export const meta: MetaFunction = () => {
	return [{ title: "Projects" }, { name: "app home", content: "app home" }];
};

export default function Index() {
	return (
		<BasicContainer>
			<Navbar />
			<h1 className="font-bold">Hi Mom!</h1>
			<h2 className="italic">Test test test</h2>
		</BasicContainer>
	);
}
