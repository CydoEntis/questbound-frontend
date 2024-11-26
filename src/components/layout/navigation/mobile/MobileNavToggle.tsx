import { Burger } from "@mantine/core";

type MobileNavToggleProps = { opened: boolean; toggle: () => void };

function MobileNavToggle({ opened, toggle }: MobileNavToggleProps) {
	return (
		<Burger
			opened={opened}
			onClick={toggle}
			hiddenFrom="sm"
			size="sm"
		/>
	);
}

export default MobileNavToggle;
