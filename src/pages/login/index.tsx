import { AuthPage } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";

export const Login = () => {
  const translate = useTranslate();

  return (
    <AuthPage
      type="login"
      title={<h3><b>{translate("projectName")}</b></h3>}
      formProps={{
        initialValues: { email: "jane@mail.com", password: "demodemo", },
      }}
      registerLink={false}
      forgotPasswordLink={false}
    />
  );
};
