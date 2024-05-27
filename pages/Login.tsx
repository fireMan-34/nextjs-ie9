import useUser from "hooks/useUser";
import SimpleForm from "compoents/simpleForm";
import styles from "@styles/Login.module.css";

export default function LoginPage() {
  const {} = useUser({});

  return (
    <div className={styles.container}>
      <main>
        <SimpleForm
          fields={[
            { label: "账号", name: "username", type: "text", value: "fireMan34" },
            { label: "密码", name: "password", type: "password", value: "123456" },
          ]}
          textMap={{
            submit: '登录',
          }}
          onSubmit={console.log}
        />
      </main>
    </div>
  );
}
