import { type MutableRefObject, type ReactNode, forwardRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { type FormState } from "@/types";

import { useListContentStore } from "@/store/listContentStore";
import { useListsStore } from "@/store/listsStore";

type ListsFormProps = {
  action: (prevState: FormState, data: FormData) => Promise<FormState>;
  children: ReactNode;
};

const ListsForm = forwardRef<HTMLFormElement, ListsFormProps>(
  function ListsForm({ action, children }, ref) {
    const [formState, formAction] = useFormState(action, {
      status: "",
      message: "",
      data: null,
    });

    const { addList } = useListsStore((state) => ({
      addList: state.addList,
    }));

    const { addMedia } = useListContentStore((state) => ({
      addMedia: state.addMedia,
    }));

    const formRef = ref as MutableRefObject<HTMLFormElement>;

    if (formState.status === "success") {
      if (formState.data?.type === "list") addList(formState.data);
      if (formState.data?.type === "listContent") addMedia(formState.data);
      toast.success(formState.message);
      formState.status = "";
    } else if (formState.status === "fail") {
      toast.error(formState.message, { duration: 5000 });
      formState.status = "";
    }

    return (
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(event) => {
          event.preventDefault();
          formAction(new FormData(formRef.current!));
        }}
      >
        {children}
      </form>
    );
  },
);

export default ListsForm;
