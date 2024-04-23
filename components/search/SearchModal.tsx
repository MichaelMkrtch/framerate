import Modal from "../ui/Modal";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";
import { type ReactNode } from "react";

export default function SearchModal({ children }: { children: ReactNode }) {
  return (
    <Modal>
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Content
        title="Search"
        description="Search for a film by it's title."
      >
        <SearchBar />
        <SearchResultList />
      </Modal.Content>
    </Modal>
  );
}
