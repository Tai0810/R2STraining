import React, { useState } from "react";
import "./App.css";
import { Example, PostList, Login, ListPost } from "./pages";

function App() {
  return (
    <div className="app">
      <Login/>
      <ListPost/>
    </div>
  );
}

export default App;
