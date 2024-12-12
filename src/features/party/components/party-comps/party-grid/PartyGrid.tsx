import { SimpleGrid } from "@mantine/core";
import { Party } from "../../../shared/party.types";
import PartyCard from "../party-card/PartyCard";

type PartyGridProps = {
  parties: Party[];
};

function PartyGrid({ parties }: PartyGridProps) {

  return (
    <div>
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
        {parties &&
          parties.map((party, index) => (
            <PartyCard
              key={index}
              party={party}
            />
          ))}
      </SimpleGrid>
    </div>
  );
}

export default PartyGrid;
