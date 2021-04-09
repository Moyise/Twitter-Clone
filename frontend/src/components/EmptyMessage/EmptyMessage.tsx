import React, { useState } from "react";
import NewMessage from "../NewMessage/NewMessage";
import "./emptyMessage.scss";

const EmptyMessage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="emptyMessage">
        <div className="emptyMessageCtn">
          <p className="top">You don’t have a message selected</p>
          <p className="middle">
            Choose one from your existing messages, or start a new one.
          </p>
          <button className="bottom" onClick={() => setShowModal(!showModal)}>
            New message
          </button>
        </div>
        <NewMessage showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default EmptyMessage;
