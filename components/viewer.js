import _ from "lodash";
import { connect } from "react-redux";
import parseExpressions from "../redux/selectors/parse_expressions";
import SplitPane, {Pane} from "react-split-pane";

class Viewer extends React.Component {
  state = {
    defaultHeight: 200
  };

  evaluateExpressions(expressions) {
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

  componentDidMount() {
    this.setState({
      defaultHeight: window.innerHeight / 1.3
    });
  }

  renderExpressions(code) {
    return this.evaluateExpressions(this.props.expressions);
  }

  render() {
    const { defaultHeight } = this.state;

    return (
      <SplitPane
        split="horizontal"
        defaultSize={defaultHeight}
        className="viewer"
      >
        <div initialSize="50%" className="result">{this.renderExpressions(this.props.code)}</div>
       <div initialSize="50%" className="errors">{this.props.errors ? this.props.errors : null }</div> 
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
  console.log(expressions);
  return { expressions, errors };
}

export default connect(mapStateToProps)(Viewer);
