import React, { useState } from "react";
import "./App.css";
import { Example, PostList, Login } from "./pages";

function App() {
  const [forceRerender, updateForceRerender] = useState(0);
  return (
    <>
      <Login/>
      <Example name={{ value: "Example", id: 3 }} />
      <button onClick={() => updateForceRerender(forceRerender + 1)}>
        Force Rerender {forceRerender}
      </button>
      <PostList />
    </>
  );
}

export default App;
