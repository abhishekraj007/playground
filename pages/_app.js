import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";

import { initStore, initPersistStore, persistor } from "../redux/store";

import "../style/editor.css";
import "../style/editor-override.scss";
import "../style/pane.scss";
import "../style/global.css";

const MyApp = props => {
  const { Component, pageProps, store } = props;
  return (
    <Provider store={store}>
      <PersistGate loading={<Component {...pageProps} />} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default withRedux(initStore)(MyApp);
