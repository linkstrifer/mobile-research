import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Title(props) {
  const { title } = props;
  return <h1>{title || "default title"}</h1>;
}

// class Accordion extends Component {
//   state = {
//     open: false,
//   }

//   render() {
//     const { content } = this.props

//     return (
//       <div>
//         {`opened: ${this.state.open}`}
//         <button
//           type="button"
//           onClick={() => {
//             this.setState({
//               open: !this.state.open
//             })
//           }}
//         >Show content</button>
//         {this.state.open && <div>{content}</div>}
//         <div>{JSON.stringify(this.state)}</div>
//         <div>{JSON.stringify(this.props)}</div>
//       </div>
//     )
//   }
// }

function Accordion(props) {
  const [open, setOpen] = useState(false);
  const { content } = props;

  return (
    <div>
      {`opened: ${open}`}
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Show content
      </button>
      {open && <div>{content}</div>}
      <div>{JSON.stringify(props)}</div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Title title="title 1" className="123" />
      <Accordion content="content" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
