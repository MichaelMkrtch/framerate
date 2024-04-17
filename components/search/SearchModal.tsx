import { ReactNode } from "react";
import Modal from "../ui/Modal";
import SearchBar from "./SearchBar";

export default function SearchModal({ children }: { children: ReactNode }) {
  return (
    <Modal>
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Content
        title="Search"
        description="Search for a film by it's title."
      >
        <SearchBar />
      </Modal.Content>
    </Modal>
  );
}
