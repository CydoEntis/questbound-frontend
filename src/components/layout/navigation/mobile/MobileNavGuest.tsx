import { Box, Flex, Stack } from "@mantine/core";
import React from "react";
import NavButton from "../../../buttons/NavButton";

type Props = {};

function MobileNavGuest({}: Props) {
	return (
		<Stack
			justify="space-between"
			h="100%"
		>
			<Box>Something goes here soon</Box>
			<Flex
				direction={{ base: "row" }}
				gap="xs"
				w="100%"
			>
				<NavButton
					text="Login"
					to="/login"
					variant={"subtle"}
					fullWidth
				/>
				<NavButton
					text="Register"
					to="/register"
					variant={"outline"}
					fullWidth
				/>
			</Flex>
		</Stack>
	);
}

export default MobileNavGuest;
