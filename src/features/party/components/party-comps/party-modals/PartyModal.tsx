import { Modal } from "@mantine/core";

import { ReactNode } from "react";

type PartyModalProps = {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
};

function PartyModal({ isOpened, children, onClose, title }: PartyModalProps) {
  return (
    <Modal title={title} size="xl" opened={isOpened} onClose={onClose}>
      {children}
    </Modal>
  );
}

export default PartyModal;
