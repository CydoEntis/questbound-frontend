import { Stack, Flex, Skeleton, Group, Box } from "@mantine/core";
import PageHeader from "../../../../../components/page/PageHeader";
import QuestsLoadingSkeleton from "../../quest-comps/quest-loading/QuestsLoadingSkeleton";

function PartiesPageLoadingSkeleton() {
  return (
    <>
      <PageHeader>
        <Stack>
          <Flex justify="space-between">
            <Group>
              <Skeleton height={48} width={250} />
              <Skeleton height={48} width={48} />
            </Group>
            <Skeleton height={48} width={100} />
          </Flex>
          <Group>
            <Group gap={1}>
              <Skeleton height={48} width={48} radius="xl" />
              <Skeleton height={48} width={48} radius="xl" />
              <Skeleton height={48} width={48} radius="xl" />
            </Group>
            <Skeleton height={48} width={150} />
          </Group>
          <Group>
            <Skeleton height={48} width={250} />
            <Skeleton height={48} width={125} />
            <Skeleton height={48} width={125} />
            <Skeleton height={48} width={250} />
            <Skeleton height={48} width={125} />
            <Skeleton height={48} width={50} />
            <Skeleton height={48} width={50} />
          </Group>
        </Stack>
      </PageHeader>
      <Box p={32}>
        <QuestsLoadingSkeleton />
      </Box>
    </>
  );
}

export default PartiesPageLoadingSkeleton;
