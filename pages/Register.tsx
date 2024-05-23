import { FormEventHandler, useEffect, useRef, useState } from "react";
import useUser from "hooks/useUser";
import styles from "@styles/Login.module.css";

interface FormItemProps {
  label: string;
  name: string;
  type: "text" | "password"|"email";
  value?: number | string | string[];
  onFormChange: (value: string | number | string[]) => void;
}

const RenderFormItem = (props: FormItemProps) => {
  return (
    <p>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={(ev) => {
          console.log();
          props.onFormChange(ev.target.value);
        }}
      />
    </p>
  );
};

const items: Omit<FormItemProps, "onFormChange">[] = [
  { label: "账号", name: "username", type: "text", value: "fireMan34" },
  { label: "邮箱", name: "email", type: "email", value: "524915379@qq.com" },
  { label: "密码", name: "password", type: "password", value: "123456" },
];

export default function RegisterPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formValue, setFormValue] = useState<{
    username?: string;
    password?: string;
    email?: string;
  }>({});
  const { registerCustomUser } = useUser({});

  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    if (formValue.username && formValue.password) {
      registerCustomUser({
        userName: formValue.username,
        password: formValue.password,
        email: formValue.email,
      });
    }

    ev.preventDefault();
    return false;
  };

  useEffect(() => {
    setFormValue(
      items.reduce(
        (acc, item) => {
          return Object.assign(acc, { [item.name]: item.value });
        },
        { ...formValue }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(formValue, "formValue");
  }, [formValue]);

  return (
    <div className={styles.container}>
      <main>
        <form
          ref={formRef}
          className={styles.form}
          method="POST"
          onSubmit={onSubmit}
        >
          {items.map((item) => (
            <RenderFormItem
              key={`form.${item.label}.${item.name}`}
              {...item}
              value={formValue[item.name] ?? item.value}
              onFormChange={(value) =>
                setFormValue((originalValue) => ({
                  ...originalValue,
                  [item.name]: value,
                }))
              }
            />
          ))}
          <p className={styles["form-button-group"]}>
            <button type="reset">重置</button>
            <button type="submit">注册账号</button>
          </p>
        </form>
      </main>
    </div>
  );
}
