import { useFormState } from "react-dom";

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

  return [state, formAction];
}
