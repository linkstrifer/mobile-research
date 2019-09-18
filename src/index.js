import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { getMessages, addMessage, listenForNewMesages } from "./firebase";

import "./styles.css";

function Message({ id, text, timestamp }) {
  return (
    <div key={`${id}`}>
      {text}
      <div>{new Date(timestamp.seconds * 1000).toLocaleString()}</div>
    </div>
  );
}

function Messages({ messages }) {
  const [order, setOrder] = useState(false);

  const orderedMessages = messages.sort((a, b) => {
    if (order) {
      return a.timestamp.seconds - b.timestamp.seconds;
    } else {
      return b.timestamp.seconds - a.timestamp.seconds;
    }
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setOrder(!order);
        }}
      >
        Order
      </button>
      {orderedMessages.map(Message)}
    </div>
  );
}

function Compose({ messages }) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const form = event.target;
        const message = form.message.value;

        form.message.value = "";

        addMessage(message);
      }}
    >
      <input type="text" name="message" />
      <button type="submit">Send</button>
    </form>
  );
}

function App({ name }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messages.length === 0) {
      getMessages().then(messages => {
        setMessages(messages);
      });
    } else {
      listenForNewMesages(newMessage => {
        const exist = messages.find(({ id }) => {
          return newMessage.id === id;
        });

        if (!exist) {
          setMessages([...messages, newMessage]);
        }
      });
    }
  }, [messages]);

  return (
    <div>
      <h1>{name}</h1>
      <Messages messages={messages} />
      <Compose messages={messages} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <div style={{ display: "flex", justifyContent: "space-around" }}>
    <App name="user 1" />
  </div>,
  rootElement
);
