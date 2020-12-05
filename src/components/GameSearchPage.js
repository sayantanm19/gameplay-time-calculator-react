import React, { useEffect, useState, useContext } from "react";
import { LibraryContext } from "../contexts/LibraryContext";
import { HowLongToBeatService } from "howlongtobeat";
import { toast } from "bulma-toast";
import axios from "axios";

import "./GameSearchPage.css";

function GameSearchPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [selectedGames, setSelectedGames] = useContext(LibraryContext);

  useEffect(() => {
    getGames();
  }, [query]);

  const handleSelect = async (game) =>  {
    setQuery("");
    setIsLoading(true);

    let isFound = selectedGames.some((gtmp) => gtmp.id === game.id);
    
    if (!isFound) {

      let hltbService = new HowLongToBeatService();
      
      await hltbService
        .search(game.title)
        .then((res) => {
          game.playtime = res[0].gameplayMain;
          game.extraPlaytime = res[0].gameplayMainExtra;
          game.completePlaytime = res[0].gameplayCompletionist;

          game.yourPlaytime = res[0].gameplayMain;
        })
        .catch((e) => {
          game.yourPlaytime = 0;
          console.log("Time to Beat Error:", e);

          toast({
            message: "Game may not exist in the HLTB database",
            type: "is-danger",
            dismissible: true,
          });
        });

      let newSelectedGame = [...selectedGames, game];
      setSelectedGames(newSelectedGame);

    } else {
      toast({
        message: "Game is already present in your library",
        type: "is-info",
        dismissible: true,
      });
    }
    setIsLoading(false);
  };

  async function getGames() {
    if (query !== "") {
      let games_list = await axios({
        url: `https://api.rawg.io/api/games?page_size=5&search=${query}`,
        method: "GET",
      });
      let games_data = games_list.data.results;

      let newGamesList = [];

      games_data.forEach((game) => {
        let game_image;
        try {
          game_image = game.short_screenshots[0].image;
        } catch {
          game_image = null;
        }

        let newGame = {
          id: game.id,
          title: game.name,
          released: game.released,
          rating: game.rating,
          image: game_image,
        };
        newGamesList.push(newGame);
      });

      setSearchResults(newGamesList);
    }
  }
  if (isLoading)
    return <span className="loading-text">Loading Details...</span>;

  return (
    <div>
      <div className="search-bar">
        <div className="dropdown is-active">
          <div className="dropdown-trigger">
            <div className="field">
              <p className="control is-expanded">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search the game"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </p>
            </div>
          </div>
          {query !== "" && searchResults.length > 0 ? (
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {searchResults.map((game, idx) => {
                  return (
                    <div
                      key={idx}
                      className="dropdown-item"
                      onClick={() => handleSelect(game)}
                    >
                      {game.title}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

export default GameSearchPage;
