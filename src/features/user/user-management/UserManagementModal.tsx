import { Modal } from "@mantine/core";
import useAuthStore from "../../../stores/useAuthStore";
import UserManagement from "./UserManagement";


type UserManagementModalProps = { isOpened: boolean; onClose: () => void };

function UserManagementModal({
	isOpened,
	onClose,
}: UserManagementModalProps) {
	const { user } = useAuthStore();
	return (
		<Modal
			opened={isOpened}
			onClose={onClose}
			title="Account Overview"
			size="lg"
			yOffset="10vh"
		>
			<UserManagement user={user!} />
		</Modal>
	);
}

export default UserManagementModal;
