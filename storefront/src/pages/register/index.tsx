import { useRouter } from "next/router";

import { PageLayout } from "@/features/layout";
import { RegisterWidget } from "@/features/account";

const RegisterPage = () => {
  const router = useRouter();

  return (
    <PageLayout title="Rejestracja" backlinkHref="/login" showTitle>
      <RegisterWidget onSuccess={() => router.push("/login")} />
    </PageLayout>
  );
};

export default RegisterPage;
