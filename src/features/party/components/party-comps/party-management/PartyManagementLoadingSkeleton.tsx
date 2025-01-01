import { Skeleton, Table } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function PartyManagementLoadingSkeleton() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Table w="100%">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Avatar</Table.Th>
          <Table.Th>Username</Table.Th>
          <Table.Th>Role</Table.Th>
          {!isMobile && <Table.Th>Level</Table.Th>}
          {!isMobile && <Table.Th>Join Date</Table.Th>}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <Table.Tr key={index}>
            <Table.Td>
              <Skeleton circle width={40} height={40} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width="70%" />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width="50%" />
            </Table.Td>
            {!isMobile && (
              <Table.Td>
                <Skeleton height={20} width="40%" />
              </Table.Td>
            )}
            {!isMobile && (
              <Table.Td>
                <Skeleton height={20} width="60%" />
              </Table.Td>
            )}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default PartyManagementLoadingSkeleton;
