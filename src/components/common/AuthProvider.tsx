import React, { FC, useEffect } from "react";
import { loginUserActions } from "../../states/loginUser";
import firebase from "../../utils/firebase";

const AuthProvider: FC = ({ children }) => {
  const setLoginUser = loginUserActions.useSetLoginUser();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setLoginUser);
  }, [setLoginUser]);

  return <>{children}</>;
};

export default AuthProvider;
