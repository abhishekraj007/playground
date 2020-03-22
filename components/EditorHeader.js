import React from "react";
import Link from "next/link";

import Style from "./EditorHeader.module.scss";

const EditorHeader = () => {
  return (
    <header className={Style.header}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <button>Save</button>
    </header>
  );
};

export default EditorHeader;
