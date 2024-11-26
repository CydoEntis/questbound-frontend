import { AppShell } from "@mantine/core";
import useGetColorTheme from "../../../theme/hooks/useGetColorScheme";
import UnauthenticatedNav from "./HeaderNavGuest";
import AuthenticatedNav from "./HeaderNavAuth";
import MobileNavToggle from "../mobile/MobileNavToggle";

type HeaderProps = {
	isAuthenticated: boolean;
	opened: boolean;
	toggle: () => void;
};

function Header({ isAuthenticated, opened, toggle }: HeaderProps) {
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

export default Header;
