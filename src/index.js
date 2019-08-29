import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class AccordionClass extends Component {
  state = {
    open: false
  };

  toggle = () => {
    this.setState(oldState => {
      const newState = {
        open: !oldState.open
      };

      return newState;
    });
  };

  render() {
    const { open } = this.state;
    const { children, open: openDefault } = this.props;
    const { toggle } = this;

    return (
      <div>
        <button type="button" onClick={toggle}>
          Open
        </button>
        {(open || openDefault) && <div>{children}</div>}
      </div>
    );
  }
}

function AccordionFunction({ children, open: openDefault }) {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  useEffect(() => {
    if (openDefault) {
      setOpen(openDefault);
    }
  }, [openDefault]);

  return (
    <div>
      <button type="button" onClick={toggle}>
        Open
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(false);

  function openAll() {
    setOpen(!open);
  }

  return (
    <div>
      <AccordionClass open={open}>AccordionClass 1</AccordionClass>
      <AccordionFunction open={open}>AccordionFunction 2</AccordionFunction>

      <button type="button" onClick={openAll}>
        Open all
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
