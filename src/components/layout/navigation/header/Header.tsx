import { AppShell } from "@mantine/core";
import useGetColorTheme from "../../../theme/hooks/useGetColorScheme";
import MobileNavToggle from "../mobile/MobileNavToggle";
import HeaderNavAuth from "./HeaderNavAuth";
import HeaderNavGuest from "./HeaderNavGuest";

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
				<HeaderNavAuth
					mobileNavToggle={
						<MobileNavToggle
							opened={opened}
							toggle={toggle}
						/>
					}
				/>
			) : (
				<HeaderNavGuest
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
