import _ from "lodash";
import { connect } from "react-redux";
import parseExpressions from "../redux/selectors/parse_expressions";
import SplitPane, { Pane } from "react-split-pane";

class Viewer extends React.Component {
  evaluateExpressions(expressions) {
    console.log(expressions);
    const formattedExpressions = _.mapValues(expressions, expression => {
      const result = eval(expression);

      try {
        if (result && result.type && result.props) {
          return result;
        } else if (_.isFunction(result) && result.name) {
          return <i>Function {result.name}</i>;
        } else if (_.isBoolean(result)) {
          return result ? "True" : "False";
        } else if (_.isFunction(result.print) && _.isFunction(result.matMul)) {
          return result.toString().replace("Tensor\n", "");
        } else if (_.isObject(result) || _.isArray(result)) {
          return JSON.stringify(result);
        }
      } catch (e) {
        return "";
      }

      return result;
    });

    return _.map(formattedExpressions, (expression, line) => {
      return <div key={line}>{expression}</div>;
    });
  }

  componentDidCatch(error, info) {
    return true;
  }

  renderExpressions(code) {
    return this.evaluateExpressions(this.props.expressions);
  }

  render() {
    const isClient = typeof window !== "undefined";

    return (
      <SplitPane
        split="vertical"
        minSize={50}
        maxSize={600}
        defaultSize={
          (isClient &&
            parseInt(localStorage && localStorage.getItem("viewerSize"))) ||
          "50%"
        }
        onChange={size => localStorage.setItem("viewerSize", size)}
      >
        <div className="pane-header-wrapper">
          <div className="pane-header">Result</div>
          <div className="editor-result">
            {this.renderExpressions(this.props.code)}
          </div>
        </div>
        <div className="editor-error-wrapper">
          <div className="pane-header">Errors</div>
          <div className="editor-error">
            <div>{this.props.errors ? this.props.errors : null}</div>
          </div>
        </div>
      </SplitPane>
    );
  }
}

function mapStateToProps(state) {
  let expressions, errors;
  // console.log("window", window);

  try {
    expressions = parseExpressions(state);
  } catch (e) {
    errors = e.toString();
  }
  return { expressions, errors };
}

export default connect(mapStateToProps)(Viewer);
