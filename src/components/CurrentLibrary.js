import React, { useEffect, useState, useContext } from "react";
import { LibraryContext } from "../contexts/LibraryContext";
import GameLibraryCard from "./GameLibraryCard";

import "./CurrentLibrary.css";

function CurrentLibrary() {
  const [selectedGames, setSelectedGames] = useContext(LibraryContext);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let total = 0;
    selectedGames.forEach((game) => {
      total += game.yourPlaytime;
    });
    setTotalTime(total);
  }, [selectedGames]);

  const clearSelected = () => {
    setSelectedGames([]);
  };

  return (
    <div>
      {selectedGames.length ? (
        <div className="current-library">
          <div className="clear-btn">
            <button
              className="button is-danger is-pulled-right"
              onClick={clearSelected}
            >
              Clear All
            </button>
          </div>
          <div className="selected-text">Selected Games</div>
          {totalTime ? (
            <div className="total-playtime">
              You have spent {totalTime} hours playing video games
            </div>
          ) : (
            <div />
          )}
          
          <div className="game_list">
            <div className="columns is-multiline ">
              {selectedGames.map((game, index) => (
                <div key={game.id} className="column">
                  <GameLibraryCard index={index} game={game} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default CurrentLibrary;
