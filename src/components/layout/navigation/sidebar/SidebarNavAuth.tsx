import { Button, NavLink, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link, useNavigate } from "@tanstack/react-router";
import {
	LayoutGrid,
	LogOut,
	PlusCircle,
	ShoppingBag,
	SquareLibrary,
} from "lucide-react";
import { User } from "../../../../features/auth/shared/types";
import ThemeToggle from "../../../theme/ThemeToggle";
import { useLogout } from "../../../../features/auth/api/auth";
import useAuthStore from "../../../../stores/useAuthStore";
import UserInfo from "../../../../features/user/user-info/UserInfo";

type SidebarNavAuthProps = {
	user: User;
	closeNav: () => void;
};

function SidebarNavAuth({ user, closeNav }: SidebarNavAuthProps) {
	const navigate = useNavigate();
	const { tokens } = useAuthStore();
	const logout = useLogout();
	const isMobile = useMediaQuery("(max-width: 768px)");

	const handleClose = () => {
		if (isMobile) closeNav();
	};

	const logoutHandler = async () => {
		await logout.mutateAsync(tokens!);
		navigate({
			to: "/login",
		});
		handleClose();
	};

	const handleOpenAccountDetails = () => {
		// openAccountDetails();
		handleClose();
	};

	const handleOpenNewParty = () => {
		// onOpenNewParty();
		handleClose();
	};

	const handleOpenAvatarShop = () => {
		// onOpenAvatarShop();
		handleClose();
	};

	return (
		<Stack
			style={{
				display: "flex",
				flexDirection: "column",
				height: "calc(100vh - 120px)", 
			}}
		>
			<Stack
				gap={8}
				style={{
					flexGrow: 1,
					overflowY: "auto",
				}}
			>
				<UserInfo
					user={user!}
					onOpen={handleOpenAccountDetails}
				/>
				<Button
					color="violet"
					variant="light"
					rightSection={<PlusCircle size={20} />}
					h={40}
					onClick={handleOpenNewParty}
					my={20}
				>
					New Party
				</Button>
				<NavLink
					component={Link}
					to="/dashboard"
					leftSection={<LayoutGrid size={20} />}
					label="Dashboard"
					className="rounded-md"
					color="violet"
					onClick={handleClose}
				/>
				<NavLink
					component={Link}
					to="/parties"
					leftSection={<SquareLibrary size={20} />}
					label="Your Parties"
					className="rounded-md"
					color="violet"
					onClick={handleClose}
				/>
			</Stack>

			{/* Bottom Buttons */}
			<Stack
				mt="auto" // Moves this section to the bottom
			>
				<Button
					justify="start"
					leftSection={<ShoppingBag size={20} />}
					variant="light"
					color="violet"
					h={40}
					onClick={handleOpenAvatarShop}
				>
					Avatar Shop
				</Button>
				<Button
					justify="start"
					leftSection={<LogOut size={20} />}
					variant="light"
					color="violet"
					h={40}
					onClick={logoutHandler}
				>
					Log out
				</Button>
				<ThemeToggle />
			</Stack>
		</Stack>
	);
}

export default SidebarNavAuth;
