import React from "react";
import { connect } from "react-redux";
import SplitPane from "react-split-pane";
import Editor from "../components/editor";
import Viewer from "../components/viewer";

class App extends React.Component {
  // static getInitialProps({store}) {}

  constructor(props) {
    super(props);
  }

  render() {
    const width = 500;
    const clientAvailable = typeof window !== "undefined";

    return (
      <SplitPane
        minSize={100}
        maxSize={1000}
        className="question-page"
        split="vertical"
        defaultSize={parseInt(localStorage.getItem("editorSize")) || "70%"}
        onChange={size => localStorage.setItem("editorSize", size)}
      >
        <Editor />
        <Viewer />
      </SplitPane>
    );
  }
}

export default connect(null, null)(App);
