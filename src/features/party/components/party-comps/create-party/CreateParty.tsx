import CreatePartyForm from "../party-form/CreatePartyForm";
import PartyModal from "../party-modals/PartyModal";

type CreatePartyProps = {
  isOpened: boolean;
  onClose: () => void;
};

function CreateParty({ isOpened, onClose }: CreatePartyProps) {
  return (
    <PartyModal onClose={onClose} isOpened={isOpened} title="Create New Party">
      <CreatePartyForm onClose={onClose} />
    </PartyModal>
  );
}

export default CreateParty;
