import { Button, Container, Input } from "@chakra-ui/react";

import { NextPage } from "next";
import useAgora from "../hooks/useAgora";
import { useState } from "react";
import MediaPlayer from "./MediaPlayer";

const AgoraClient: NextPage = () => {
  const [channel, setChannel] = useState("");
  const { remoteUsers, join, leave } = useAgora();

  const onClickJoin = () => {
    join("audience", channel);
  };

  const onClickLeave = () => {
    leave();
  };

  return (
    <Container mt={10}>
      <Input
        mb={3}
        placeholder="チャンネル名"
        onChange={(e) => setChannel(e.target.value)}
      />
      <Button colorScheme="pink" isFullWidth onClick={onClickJoin} mb={3}>
        参加
      </Button>
      <Button colorScheme="pink" isFullWidth onClick={onClickLeave}>
        退出
      </Button>
      {remoteUsers.map((user) => (
        <div className="remote-player-wrapper" key={user.uid}>
          <p className="remote-player-text">{`remoteVideo(${user.uid})`}</p>
          <MediaPlayer
            videoTrack={user.videoTrack}
            audioTrack={user.audioTrack}
          ></MediaPlayer>
        </div>
      ))}
    </Container>
  );
};

export default AgoraClient;
