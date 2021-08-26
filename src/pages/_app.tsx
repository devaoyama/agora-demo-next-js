import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import AuthProvider from "../components/common/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}
export default MyApp;
