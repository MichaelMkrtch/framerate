import Modal from "../ui/Modal";
import { ReactNode } from "react";

export default function SearchModal({ children }: { children: ReactNode }) {
  return (
    <Modal>
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Content
        title="Search"
        description="Search for a film by it's title."
      >
        <p>This works!</p>
      </Modal.Content>
    </Modal>
  );
}
