import React from "react";
import Link from "next/link";

const EditorHeader = () => {
  return (
    <header>
      <Link href="/">
        <button>Home</button>
      </Link>
      <button>Save</button>
    </header>
  );
};

export default EditorHeader;
