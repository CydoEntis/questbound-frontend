import { createFileRoute, useLocation } from "@tanstack/react-router";
import Page from "../components/page/Page";
import { Title } from "@mantine/core";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {

	return <Title>WELCOME TO THE APP U POS</Title>;
}
