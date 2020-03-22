import _ from "lodash";
import React, { Component } from "react";
import CodeMirror from "react-codemirror";
import * as actions from "../redux/actions";
import { connect } from "react-redux";

let modeLoaded = false;

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  // import 'codemirror/mode/jsx/jsx';
  // require('codemirror/mode/jxs/jxs')
  require("codemirror/mode/jsx/jsx");
  modeLoaded = true;
}

class Editor extends Component {
  onCodeChange(code) {
    this.props.updateCode(code);
  }

  render() {
    const options = {
      // theme: "dracula",
      theme: "monokai",
      lineNumbers: true,
      tabSize: 2
    };

    if (modeLoaded) options.mode = "jsx";

    return (
      <React.Fragment>
        <div className="pane-header">Javascript</div>
        <CodeMirror
          value={this.props.code}
          onChange={this.onCodeChange.bind(this)}
          options={options}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps({ code }) {
  return { code };
}

export default connect(mapStateToProps, actions)(Editor);
