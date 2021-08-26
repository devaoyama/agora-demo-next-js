import React from "react";
import { useRouter } from "next/router";
import { loginUserSelectors } from "../../states/loginUser";

type Props = {
  children?: React.ReactNode;
  redirectTo?: string;
};

export const RequiredNotLogin: React.FC<Props> = ({
  children,
  redirectTo = "/",
}) => {
  const loginUser = loginUserSelectors.useLoginUser();
  const router = useRouter();

  if (loginUser) {
    router.push(redirectTo);
    return null;
  }

  if (loginUser === undefined) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
