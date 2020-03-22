import React from "react";

import Link from "next/link";

class App extends React.Component {
  // static getInitialProps({store}) {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link href="/code">
        <a>New Code</a>
      </Link>
    );
  }
}

export default App;
