import React, { useState, useEffect, useContext } from "react";
import { LibraryContext } from "../contexts/LibraryContext";
import "./GameLibraryCard.css";

function GameLibraryCard({ game }) {
  // For the global game library
  const [selectedGames, setSelectedGames] = useContext(LibraryContext);

  // For displaying the currently selected playtime
  const [selectedPlaytime, setSelectedPlaytime] = useState(game.yourPlaytime);

  // State for the current playtype
  const [currentPlayType, setcurrentPlayType] = useState("mainStory");

  // State for the personal time
  const [personalTime, setPersonalTime] = useState("");

  // Execute whenever the play type or the personal time value changes
  useEffect(() => {
    const updatePlayTime = () => {
      let selectedTime;

      switch (currentPlayType) {
        case "mainStory":
          selectedTime = game.playtime;
          break;
        case "mainExtra":
          selectedTime = game.extraPlaytime;
          break;
        case "completionist":
          selectedTime = game.completePlaytime;
          break;
        case "customPlaytime":
          selectedTime = parseInt(personalTime);
          break;
        default:
      }

      setSelectedPlaytime(selectedTime);

      let newGames = selectedGames.map((gtmp) => {
        return gtmp.id === game.id
          ? { ...gtmp, yourPlaytime: selectedTime }
          : gtmp;
      });

      setSelectedGames(newGames);
    };

    updatePlayTime();
  }, [currentPlayType, personalTime]);

  const updatePlayType = (e) => setcurrentPlayType(e.currentTarget.value);

  const deleteGame = () => {
    let newGames = selectedGames.filter((gtmp) => gtmp.id !== game.id);
    setSelectedGames(newGames);
  };

  return (
    <div className="game-card">
      <button className="delete game-delete-btn is-large" onClick={deleteGame}></button>
      <div className="game-details">
        <div className="game-card-header">
          <div className="game-card-header-title">{game.title}</div>
        </div>
        {/* <div className="game-image">
          <img src={game.image} alt={game.title} />
        </div> */}

        <div className="game-list">
          <div>
            <span className="game-list-item-title">Release</span> <br />
            <span className="game-list-item-content">
              {new Date(game.released).toDateString()}
            </span>
          </div>
          <div>
            <span className="game-list-item-title">Rating</span> <br />
            <span className="game-list-item-content">
              {game.rating ? game.rating : "Unrated"}
            </span>
          </div>
          <div>
            <span className="game-list-item-title">Your Playtime</span> <br />
            <span className="game-list-item-content">
              {selectedPlaytime ? selectedPlaytime : "Not Played"}
            </span>
          </div>

          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name={"time-selector-" + game.id}
                value="mainStory"
                onChange={updatePlayType}
                defaultChecked
                disabled={game.playtime ? false : true}
              />
              <span className="game-list-item-title">Main Story</span>
            </label>
            <br />
            <label className="radio">
              <input
                type="radio"
                name={"time-selector-" + game.id}
                value="mainExtra"
                onChange={updatePlayType}
                disabled={game.extraPlaytime ? false : true}
              />
              <span className="game-list-item-title">Main Story + Extras</span>
            </label>
            <br />
            <label className="radio">
              <input
                type="radio"
                name={"time-selector-" + game.id}
                value="completionist"
                onChange={updatePlayType}
                disabled={game.completePlaytime ? false : true}
              />
              <span className="game-list-item-title">Completionist</span>
            </label>
            <br />
            <label className="radio">
              <input
                type="radio"
                name={"time-selector-" + game.id}
                value="customPlaytime"
                onChange={updatePlayType}
              />
              <span className="game-list-item-title">Personal Time</span>
              <span className="game-list-item-content">
                <input
                  type="number"
                  className="personal-time-input"
                  defaultValue={personalTime}
                  onChange={(e) => setPersonalTime(e.target.value)}
                />
                {/* &nbsp;hours */}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameLibraryCard;
