import React from "react";
import { useRouter } from "next/router";
import { loginUserSelectors } from "../../states/loginUser";

type Props = {
  children?: React.ReactNode;
  redirectTo?: string;
};

export const RequiredLogin: React.FC<Props> = ({
  children,
  redirectTo = "/login",
}) => {
  const loginUser = loginUserSelectors.useLoginUser();
  const router = useRouter();

  if (loginUser === undefined) {
    return <div>Loading...</div>;
  }

  if (!loginUser) {
    router.push(redirectTo);
    return null;
  }

  return <>{children}</>;
};
