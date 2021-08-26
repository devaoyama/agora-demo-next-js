import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import type firebase from "firebase/app";
import { RecoilAtomKeys } from "./keys";
import React from "react";

type LoginUserState = firebase.User | null | undefined;

const loginUserState = atom<LoginUserState>({
  key: RecoilAtomKeys.LOGIN_USER_STATE,
  dangerouslyAllowMutability: true,
  default: undefined,
});

type LoginUserActions = {
  useSetLoginUser: () => void;
};

export const loginUserActions = {
  useSetLoginUser: () => {
    const setState = useSetRecoilState(loginUserState);

    return React.useCallback(
      (loginUser: LoginUserState) => {
        setState(loginUser);
      },
      [setState]
    );
  },
};

type LoginUserSelectors = {
  useLoginUser: () => LoginUserState;
};

export const loginUserSelectors: LoginUserSelectors = {
  useLoginUser: () => useRecoilValue(loginUserState),
};
