import UpdatePartyForm from "../party-form/UpdatePartyForm";
import PartyModal from "../party-modals/PartyModal";

type UpdatePartyModalProps = {
  isOpened: boolean;
  onClose: () => void;
  partyId: number;
};

function UpdatePartyModal({ isOpened, onClose, partyId }: UpdatePartyModalProps) {
  return (
    <PartyModal onClose={onClose} isOpened={isOpened} title="Edit New Party">
      <UpdatePartyForm onClose={onClose} partyId={partyId} />
    </PartyModal>
  );
}

export default UpdatePartyModal;
