import { NextPage } from "next";
import dynamic from "next/dynamic";

const AgoraClient = dynamic(
  () => {
    return import("../components/AgoraClient");
  },
  { ssr: false }
);

const Live: NextPage = () => {
  return <AgoraClient />;
};

export default Live;
