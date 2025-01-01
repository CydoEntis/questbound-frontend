import { Center, Container, Image, Stack, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Index,
});

function Index() {
  return (
    <Container size="xl" p={32}>
      <Center>
        <Stack gap={100} align="center" justify="center">
          <Title size="4rem" c="green">Do you even lift?</Title>
          <Image
            w={320}
            src="https://preview.redd.it/me6t1sihdg6z.png?auto=webp&s=75767650e92744703d8dcff96a3f973c7c98d30d"
          />
        </Stack>
      </Center>
    </Container>
  );
}
