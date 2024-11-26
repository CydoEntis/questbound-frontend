import { Button, Flex, Indicator, NavLink, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "@tanstack/react-router";
import { LayoutGrid, LogOut, PlusCircle, ShoppingBag, SquareLibrary } from "lucide-react";
import { User } from "../../../../features/auth/shared/types";
import ThemeToggle from "../../../theme/ThemeToggle";

type SidebarNavAuthProps = {
	user: User;
	closeNav: () => void;
};

function SidebarNavAuth({ user, closeNav }: SidebarNavAuthProps) {
	const isMobile = useMediaQuery("(max-width: 768px)");

	const handleClose = () => {
		if (isMobile) closeNav();
	};

	const logoutHandler = () => {
		// logout();
		// navigate("/login");
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
				flexGrow: 1,
				overflowY: "auto",
				maxHeight: "calc(100vh - 120px)",
			}}
		>
			<Stack gap={8}>
				{/* <AccountIndicator
					user={user!}
					onOpen={handleOpenAccountDetails}
				/> */}
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
				{/* <NavLink
					label="Most Recent"
					className="rounded-md"
					leftSection={
						isRecentOpen ? <BookOpen size={20} /> : <Book size={20} />
					}
					variant="subtle"
					color="gray"
					opened={isRecentOpen}
					onClick={toggleRecentOpen}
				> */}
				{/* {recentParties.length === 0 ? (
						<Text size="xs">No recent parties</Text>
					) : null}
					{recentParties?.map((party) => (
						<NavLink
							key={party.id}
							component={Link}
							to={`/parties/${party.id}/quests`}
							label={
								<Flex
									align="center"
									gap={16}
									px={10}
								>
									<Indicator
										inline
										color={party.color}
										processing
										size={10}
									/>
									{party.title}
								</Flex>
							}
							color="violet"
							className="rounded-md"
							mt={8}
							onClick={handleClose}
						/>
					))}
				</NavLink> */}
			</Stack>
			<Stack mt="auto">
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
