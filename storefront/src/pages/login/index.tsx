import { PageLayout } from "@/features/layout";
import { LoginForm } from "@/features/forms";

const LoginPage = () => {
  return (
    <PageLayout title="Logowanie" showTitle>
      <LoginForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      />
    </PageLayout>
  );
};

export default LoginPage;
