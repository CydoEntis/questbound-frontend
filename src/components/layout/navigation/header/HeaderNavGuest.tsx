import { Container, Group, Image } from "@mantine/core";
import NavButton from "../../../buttons/NavButton";
import ThemeToggle from "../../../theme/ThemeToggle";
import { ReactElement } from "react";
import Logo from "../../../../assets/logo.png";

type HeaderNavGuestProps = { mobileNavToggle: ReactElement };

function HeaderNavGuest({ mobileNavToggle }: HeaderNavGuestProps) {
  return (
    <Container size="lg" h="100%">
      <Group h="100%" align="center">
        <Group justify="space-between" align="center" style={{ flex: 1 }}>
          <Group>
            <Image src={Logo} w={200} />
            {/* <Title component={Link}>Questbound</Title> */}
          </Group>
          <Group ml="xl" gap={8} visibleFrom="xs">
            <NavButton text="Login" to="/login" variant={"subtle"} />
            <NavButton text="Register" to="/register" variant={"outline"} />
            <ThemeToggle />
          </Group>
          {mobileNavToggle}
        </Group>
      </Group>
    </Container>
  );
}

export default HeaderNavGuest;
