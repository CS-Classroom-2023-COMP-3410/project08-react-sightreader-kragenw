import React from "react";
import Header from "../components/Header";
import StatusMessage from "../components/StatusMessage";
import Controls from "../components/Controls";
import TextAreaContainer from "../components/TextAreaContainer";
import GameDisplay from "../components/GameDisplay";
import Settings from "../components/Settings";
import Playlist from "../components/Playlist";
import Modal from "../components/Modal";

// function Index() {
//     return (
//         <div className="container">
//             <Header />
//             <div className="container">
//                 <StatusMessage />
//                 <Controls />
//                 <TextAreaContainer />
//                 <GameDisplay />
//                 <Settings />
//                 <Playlist />
//             </div>

//             <Modal />
//         </div>

//     )
// }

// export default Index;


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
    </div>
  );
}

export default Index;
