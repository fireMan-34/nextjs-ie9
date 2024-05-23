import { MutableRefObject } from "react";

export interface FormItemProps {
  label: string;
  name: string;
  type: "text" | "password"|"email";
  value?: number | string | string[];
  onValueChange: (value: string | number | string[]) => void;
}

export type Fields = Omit<FormItemProps, "onValueChange">[];

export interface FormProps<FormValue extends Object = Record<string, any>> {
  fields: Fields;
  initValue?: FormValue;
  defaultValue?: FormValue;
  value?: FormValue;
  onSubmit: (val: FormValue) => void;
  onValueChange?: (value: FormValue) => void;

  textMap?: {
    submit?: string;
    reset?: string;
  };
}

export type FormRef = MutableRefObject<HTMLFormElement>;
