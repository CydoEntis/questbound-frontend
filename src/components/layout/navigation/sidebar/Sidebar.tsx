import { useDisclosure } from "@mantine/hooks";
import UserManagementModal from "../../../../features/user/user-management/UserManagementModal";
import useAuthStore from "../../../../stores/useAuthStore";
import SidebarNavAuth from "./SidebarNavAuth";

type SidebarProps = {
	onClose: () => void;
};

function Sidebar({ onClose }: SidebarProps) {
	const { user } = useAuthStore();

	const [
		userManagementOpen,
		{ open: openUserManagement, close: closeUserManagement },
	] = useDisclosure(false);

	return (
		<>
			<UserManagementModal
				isOpened={userManagementOpen}
				onClose={closeUserManagement}
			/>
			<SidebarNavAuth
				user={user!}
				closeNav={onClose}
				onOpenUserManagement={openUserManagement}
			/>
		</>
	);
}

export default Sidebar;
