import useAuthStore from "../../../../stores/useAuthStore";
import SidebarNavAuth from "./SidebarNavAuth";

type SidebarProps = {
	onClose: () => void;
};

function Sidebar({ onClose }: SidebarProps) {
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
