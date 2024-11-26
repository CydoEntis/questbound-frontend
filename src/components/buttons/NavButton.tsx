import { Button } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export type ButtonVariants =
	| "default"
	| "filled"
	| "light"
	| "outline"
	| "subtle"
	| "transparent"
	| "white";

type NavButtonProps = {
	text: string;
	to: string;
	variant: ButtonVariants;
	fullWidth?: boolean;
};

function NavButton({ variant, to, text, fullWidth = false }: NavButtonProps) {
	return (
		<Button
			variant={variant}
			activeProps={{
				style: {
					background: "#5F3DC4",
					color: "#FFF",
					border: "1px solid #5F3DC4",
				},
			}}
			color="violet"
			component={Link}
			to={to}
			fullWidth={fullWidth}
		>
			{text}
		</Button>
	);
}

export default NavButton;
