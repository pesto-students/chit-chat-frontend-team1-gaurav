import React from "react";
import SideBar from "Common/SideBar/SideBar";
import GroupSearch from "Common/GroupSearch/GroupSearch";
import DefaultPage from "Pages/Chat/DefaultPage/DefaultPage";

function CreateGroupChat() {
  return (
    <div className="main-container">
      <section className="sidebar">
        <SideBar />
      </section>

      <section className="contact-list">
        <GroupSearch />
      </section>

      <seciton className="default-page">
        <DefaultPage />
      </seciton>
    </div>
  );
}

export default CreateGroupChat;
