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
     
      <SplitPane className="question-page" split="vertical" defaultSize="100%">
       <Editor className="editor" />
        <Viewer className="viewer" />
      </SplitPane>
    );
  }
}

export default connect(null, null)(App);
