import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";
import { useState, useEffect } from "react";

const useAgora = () => {
  const [client, setClient] = useState<undefined | IAgoraRTCClient>();
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  useEffect(() => {
    if (client !== undefined) return;
    const newClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    setClient(newClient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (client === undefined) return;
    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      console.log("subscribe success");

      setRemoteUsers((prev) => [...prev, user]);
    });
    client.on("user-unpublished", (user) => {
      setRemoteUsers((prev) => prev.filter((item) => item.uid !== user.uid));
    });
  }, [client]);

  const join = async (role: "audience" | "host", channel: string) => {
    if (client === undefined) return;
    client.setClientRole(role, { level: 1 });
    await client.join(process.env.NEXT_PUBLIC_AGORA_TOKEN || "", channel, null);
  };

  const leave = async () => {
    if (client === undefined) return;
    setRemoteUsers([]);
    client.leave();
  };

  return {
    remoteUsers,
    join,
    leave,
  };
};

export default useAgora;
