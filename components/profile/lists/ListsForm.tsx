import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Lists from "./Lists";
import { listSchema } from "./listSchema";

import { submitList } from "@/actions/list-action";
import { Form } from "@/components/ui/Form";
import { validateRequest } from "@/lib/auth";

export default function ListsForm() {
  const [formState, formAction] = useFormState(submitList, {
    status: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof listSchema>>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      listName: "",
    },
  });

  if (formState.status === "success") {
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
        console.log(formState);
        formAction(new FormData(formRef.current!));
        // form.handleSubmit(() => {
        //   console.log("submitted");
        //   formAction(new FormData(formRef.current!));
        // })(event);
      }}
    >
      <Lists />
    </form>
  );
}
