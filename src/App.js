import React from "react";
import "./App.css";

import Header from "./components/Header";
import GameSearchPage from "./components/GameSearchPage";
import CurrentLibrary from "./components/CurrentLibrary";

import { LibraryProvider } from "./contexts/LibraryContext";

function App() {
  return (
    <LibraryProvider>
      <div className="App container">
        <Header />
        <GameSearchPage />
        <CurrentLibrary />
      </div>
    </LibraryProvider>
  );
}

export default App;
