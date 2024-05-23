import useUser from "hooks/useUser";
import SimpleForm from "compoents/simpleForm";
import styles from "@styles/Login.module.css";

interface FormItemProps {
  label: string;
  name: string;
  type: "text" | "password" | "email";
  value?: number | string | string[];
  onFormChange: (value: string | number | string[]) => void;
}

const items: Omit<FormItemProps, "onFormChange">[] = [
  { label: "账号", name: "username", type: "text", value: "fireMan34" },
  { label: "邮箱", name: "email", type: "email", value: "524915379@qq.com" },
  { label: "密码", name: "password", type: "password", value: "123456" },
];

export default function RegisterPage() {
  const { registerCustomUser } = useUser({});

  return (
    <div className={styles.container}>
      <main>
        <SimpleForm
          fields={[
            { label: "账号", name: "username", type: "text", value: "fireMan34" },
            { label: "邮箱", name: "email", type: "email", value: "524915379@qq.com" },
            { label: "密码", name: "password", type: "password", value: "123456" },
          ]}
          onSubmit={(formValue) => {
            if (formValue.username && formValue.password) {
              registerCustomUser({
                userName: formValue.username,
                password: formValue.password,
                email: formValue.email,
              });
            }
          }}
        />
      </main>
    </div>
  );
}
