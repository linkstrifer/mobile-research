import React, { useState, createRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const nameRef = createRef();
  const [number, setNumber] = useState("");

  function onsubmit(event) {
    event.preventDefault();
    const { value } = nameRef.current;

    console.log(value, number);
  }

  function handleNumberChange({ currentTarget }) {
    const { value } = currentTarget;
    const newValue = value.replace(/[a-zA-Z-]/g, "");

    console.log(value, newValue);

    setNumber(`logo-${newValue}`);
  }

  return (
    <div>
      <form onSubmit={onsubmit}>
        <input ref={nameRef} type="text" />
        <input
          ref={nameRef}
          type="text"
          value={number}
          onInput={handleNumberChange}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
