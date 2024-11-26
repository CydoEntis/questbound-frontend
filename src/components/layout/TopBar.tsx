import { AppShell } from "@mantine/core";
import useGetColorTheme from "../theme/hooks/useGetColorScheme";
import UnauthenticatedNav from "../navigation/UnauthenticatedNav";
import AuthenticatedNav from "../navigation/AuthenticatedNav";
import MobileNavToggle from "./MobileNavToggle";

type TopBarProps = {
	isAuthenticated: boolean;
	opened: boolean;
	toggle: () => void;
};

function TopBar({ isAuthenticated, opened, toggle }: TopBarProps) {
	const { isLightMode } = useGetColorTheme();

	return (
		<AppShell.Header
			bg="secondary"
			styles={{
				header: {
					borderColor: `${isLightMode ? "#DCDEE0" : "#3A3A3A"}`,
				},
			}}
		>
			{isAuthenticated ? (
				<AuthenticatedNav
					mobileNavToggle={
						<MobileNavToggle
							opened={opened}
							toggle={toggle}
						/>
					}
				/>
			) : (
				<UnauthenticatedNav
					mobileNavToggle={
						<MobileNavToggle
							opened={opened}
							toggle={toggle}
						/>
					}
				/>
			)}
		</AppShell.Header>
	);
}

export default TopBar;
