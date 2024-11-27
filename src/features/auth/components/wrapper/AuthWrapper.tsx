import { Box, Container } from "@mantine/core";
import { useState, useEffect, ReactElement } from "react";
import useGetColorTheme from "../../../../components/theme/hooks/useGetColorScheme";

import classes from "./auth-wrapper.module.css";

type AuthWrapperProps = {
	children: ReactElement;
};

function AuthWrapper({ children }: AuthWrapperProps) {
	const {isLightMode} = useGetColorTheme();
	const [themeClass, setThemeClass] = useState("");

	useEffect(() => {
		setThemeClass(isLightMode ? classes.lightBg : classes.darkBg);
	}, [isLightMode]); 

	console.log(themeClass)

	return (
		<Box
			className={themeClass}
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