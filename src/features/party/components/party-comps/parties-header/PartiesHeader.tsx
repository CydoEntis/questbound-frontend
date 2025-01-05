import ClearFilters from "../../../../../components/clear-filters/ClearFilters";
import PageHeader from "../../../../../components/page/PageHeader";
import { Title, Flex, Group } from "@mantine/core";
import PartyDateRangePicker from "../date-range-picker/PartyDateRangePicker";
import PartyOrderToggle from "../party-order/PartyOrderToggle";
import PartySearch from "../party-search/PartySearch";
import PartySortMenu from "../party-sort/PartySortMenu";

function PartiesHeader() {
  return (
    <PageHeader>
      <Title>Your Joined Parties</Title>
      <Flex align="end" justify="space-between">
        <Group align="end">
          <Group>
            <PartySearch />
          </Group>
          <PartyDateRangePicker />
          <Group gap={8}>
            <PartySortMenu />
            <PartyOrderToggle />
            <ClearFilters />
          </Group>
        </Group>
      </Flex>
    </PageHeader>
  );
}

export default PartiesHeader;
