import { SimpleGrid, Skeleton } from "@mantine/core";

function QuestsLoadingSkeleton() {
  return (
    <SimpleGrid
      type="container"
      cols={{
        base: 1,
        "550px": 1,
        "725px": 2,
        "1000px": 3,
        "1700px": 4,
        "2000px": 6,
      }}
    >
      {Array.from({ length: 24 }).map((_, index) => (
        <Skeleton key={index} visible h={320} />
      ))}
    </SimpleGrid>
  );
}

export default QuestsLoadingSkeleton;
