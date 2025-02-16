import React from "react";
import Header from "../components/Header";
import StatusMessage from "../components/StatusMessage";
import Controls from "../components/Controls";
import TextAreaContainer from "../components/TextAreaContainer";
import GameDisplay from "../components/GameDisplay";
import Settings from "../components/Settings";
import Playlist from "../components/Playlist";
import Modal from "../components/Modal";



import AudioControl from "../components/FunctionalityComponents/AudioControl";
import FileLoader from "../components/FunctionalityComponents/FileLoader";
import Playback from "../components/FunctionalityComponents/Playback";
import UI from "../components/FunctionalityComponents/UI";



function Index() {
  return (
    <div className="container">
      <Header />
      <StatusMessage />
      <Controls />
      <TextAreaContainer />
      <GameDisplay />
      <Settings />
      <Playlist />
      <Modal />
      {/* <AudioControl />
      <FileLoader />
      <Playback />
      <UI /> */}
    </div>
  );
}

export default Index;
