import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

type AppWrapper = { children: ReactNode; opened: boolean };

function AppWrapper({ opened, children }: AppWrapper) {
	return (
		<AppShell
			header={{ height: { base: 60 } }}
			bg={"primary"}
			navbar={{
				width: { base: 200, md: 300 },
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
		>
			{children}
		</AppShell>
	);
}

export default AppWrapper;
