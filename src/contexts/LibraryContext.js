import React, { useState, createContext } from "react";

export const LibraryContext = createContext();

export const LibraryProvider = (props) => {

  const [selectedGames, setSelectedGames] = useState([
    // {
    //   id: 123,
    //   title: "Subnautica",
    //   released: "Date 3",
    //   rating: 4.5,
    //   image: "https://via.placeholder.com/150",
    //   playtime: 10,
    //   extraPlaytime: 20,
    //   completePlaytime: 100,
    //   yourPlaytime: 10
    // },
    // {
    //   id: 234,
    //   title: "Dota 2",
    //   released: "Date 1",
    //   rating: 4.2,
    //   image: "https://via.placeholder.com/150",
    //   playtime: 10,
    //   extraPlaytime: 20,
    //   completePlaytime: 30,
    //   yourPlaytime: 10
    // },
    // {
    //   id: 456,
    //   title: "CSGO",
    //   released: "Date 2",
    //   rating: 4.8,
    //   image: "https://via.placeholder.com/150",
    //   playtime: 10,
    //   extraPlaytime: 20,
    //   completePlaytime: 30,
    //   yourPlaytime: 10
    // },
  ]);
  return (
    <LibraryContext.Provider value={[selectedGames, setSelectedGames]}>
      {props.children}
    </LibraryContext.Provider>
  );
};
