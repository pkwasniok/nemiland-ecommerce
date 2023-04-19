import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { PageLayout } from "@/features/layout";
import {
  PasswordResetWidget,
  RequestPasswordResetWidget,
} from "@/features/account";

const PasswordResetPage = () => {
  const [view, setView] = useState<"RequestPasswordReset" | "PasswordReset">(
    "RequestPasswordReset"
  );

  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query.token != undefined) {
      setView("PasswordReset");
    }
  }, [router]);

  return (
    <PageLayout title="Resetowanie hasła" backlinkHref="/login" showTitle>
      {view == "RequestPasswordReset" && (
        <RequestPasswordResetWidget onSuccess={() => router.push("/login")} />
      )}

      {view == "PasswordReset" && (
        <PasswordResetWidget
          token={router.query.token as string}
          onSuccess={() => router.push("/login")}
          onError={(e) =>
            e == "InvalidTokenError"
              ? setView("RequestPasswordReset")
              : router.push("/verify")
          }
        />
      )}
    </PageLayout>
  );
};

export default PasswordResetPage;
