import useAuthStore from "../../../../stores/useAuthStore";
import SidebarNavAuth from "./SidebarNavAuth";

type SidebarProps = {
	isAuthenticated: boolean;
	onClose: () => void;
};

function Sidebar({ isAuthenticated, onClose }: SidebarProps) {
	const { user } = useAuthStore();

	return (
		<div>
			<SidebarNavAuth
				user={user!}
				closeNav={onClose}
			/>
		</div>
	);
}

export default Sidebar;
