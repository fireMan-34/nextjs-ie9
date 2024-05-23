import {
  useRef,
  forwardRef,
  useState,
  useEffect,
  FormEventHandler,
  useImperativeHandle,
} from "react";

import { Fields, FormProps, FormRef } from "./type";
import styles from "./styles.module.css";
import RenderFormItem from "./item.input";

const InnerForm = (props: FormProps, ref: FormRef) => {
  const {
    fields,
    initValue,
    defaultValue,
    value,
    textMap,
    onValueChange,
    onSubmit,
  } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [formValue, setFormValue] = useState(
    value ?? initValue ?? defaultValue ?? {}
  );

  const createOnFormItemValueChannge = (item: Fields[number]) => {
    return (value: unknown) => {
      const nextValue = { ...formValue, [item.name]: value };
      setFormValue(nextValue);
      onValueChange?.(nextValue);
    };
  };

  const onFormSumbit: FormEventHandler<HTMLFormElement> = (ev) => {
    onSubmit(formValue);
    ev.preventDefault();
  };

  useImperativeHandle(ref, () => {
    return Object.assign({}, ref.current, {
      onFormSumbit(value) {
        if (ref.current) {
          ref.current.submit();
        }
      },
      onFormReset() {
        if (ref.current) {
          ref.current.reset();
        }
      },
    });
  });

  useEffect(() => {
    if (onValueChange) {
      onValueChange(formValue);
    }
  }, [formValue, onValueChange]);

  useEffect(() => {
    setFormValue(
      fields.reduce(
        (nextValue, item) =>
          Object.assign(nextValue, { [item.name]: item.value }),
        { ...formValue }
      )
    );
  }, []);

  return (
    <form
      ref={formRef}
      className={styles.form}
      method="POST"
      onSubmit={onFormSumbit}
    >
      {fields.map((item) => (
        <RenderFormItem
          key={`simpleForm.${item.label}.${item.name}`}
          onValueChange={createOnFormItemValueChannge(item)}
          {...item}
          value={formValue[item.name] ?? item.value}
        />
      ))}
      <p className={styles["form-button-group"]}>
        <button type="reset">{textMap?.reset ?? "重置"}</button>
        <button type="submit">{textMap?.submit ?? "注册"}</button>
      </p>
    </form>
  );
};

const simpleForm = forwardRef(InnerForm);

export default simpleForm;