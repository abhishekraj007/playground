import React from "react";
import SplitPane from "react-split-pane";

import Editor from "../components/Editor";
import EditorHeader from "../components/EditorHeader";
import Viewer from "../components/Viewer";

const Code = () => {
  const isClient = typeof window !== "undefined";

  return (
    <React.Fragment>
      <EditorHeader />

      <SplitPane
        minSize={100}
        maxSize={1000}
        className="question-page"
        split="vertical"
        defaultSize={
          (isClient && parseInt(localStorage.getItem("editorSize"))) || "70%"
        }
        onChange={size => localStorage.setItem("editorSize", size)}
      >
        <Editor />
        <Viewer />
      </SplitPane>
    </React.Fragment>
  );
};

export default Code;
