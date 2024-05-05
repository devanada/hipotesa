import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

import { IResponseFailed } from "@/lib/types/api";

export type FormState = {
  message: string;
  reason: string;
};

const initialState: FormState = {
  message: "",
  reason: "",
};

export function useFormAction(
  props: (prevState: FormState, formData: FormData) => Promise<IResponseFailed>
): [state: Awaited<IResponseFailed>, dispatch: (payload: FormData) => void] {
  const [state, formAction] = useFormState(props, initialState);

  useEffect(() => {
    if (state.reason) {
      toast.error(state.message, {
        description: JSON.stringify(state.reason),
      });
    }
  }, [state]);

  return [state, formAction];
}
