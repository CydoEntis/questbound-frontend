import { Anchor, Paper, Title, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { ReactElement } from "react";

type AuthCardProps = {
	title: string;
	anchorLabel: string;
	anchorText: string;
	to: string;
	children: ReactElement;
};

function AuthCard({
	title,
	anchorLabel,
	anchorText,
	to,
	children,
}: AuthCardProps) {
	return (
		<Paper
			withBorder
			shadow="md"
			p={{base: 16, md: 32}}
			pt={30}
			radius="md"
			bg="card"
		>
			<Title ta="center">{title}</Title>
			<Text
				c="dimmed"
				size="sm"
				ta="center"
				mt={5}
			>
				{anchorLabel}{" "}
				<Anchor
					component={Link}
					to={to}
					size="sm"
					c="violet"
				>
					{anchorText}
				</Anchor>
			</Text>
			{children}
		</Paper>
	);
}

export default AuthCard;
