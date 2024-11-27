import { Box, Container } from "@mantine/core";
import { ReactElement } from "react";

type AuthWrapperProps = { children: ReactElement };

function AuthWrapper({ children }: AuthWrapperProps) {
	return (
		<Box
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "flex-start",
				minHeight: "calc(100vh - 60px)",
				height: "100%",
				position: "relative",
			}}
		>
			<Container
				p={0}
				w="100%"
				maw={520}
				style={{
					position: "absolute",
					top: "20%",
					left: "50%",
					transform: "translateX(-50%)",
				}}
			>
				{children}
			</Container>
		</Box>
	);
}

export default AuthWrapper;
