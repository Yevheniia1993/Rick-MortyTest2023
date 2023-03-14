import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Character = () => {
  const [allCharacter, setAllCharacter] = useState([]);
  let chekmemory = localStorage.getItem("SearchText") || "";
  const [textInput, settextInput] = useState(chekmemory);
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllCharacter(data.results);
      });
  }, []);
  const filteredCharacter = allCharacter.filter((characterOne) => {
    return characterOne.name.toLowerCase().includes(textInput.toLowerCase());
  });

  const inputChangeValue = (e) => {
    settextInput(e.target.value);
    localStorage.setItem("SearchText", e.target.value);
  };

  const sortCharacter = () => {
    return filteredCharacter.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.className > b.name) {
        return 1;
      }
      return 0;
    });
  };

  const renderCharacters = () => {
    const sortedCharacters = sortCharacter();

    return sortedCharacters.map((item, index) => {
      let myUrl = "/Episodes?id=" + item.id;
      return (
        <div className="block-character" key={index}>
          <Link className="link-episodes" to={myUrl}>
            <div className="div-image-character">
              <img className="image-character" src={item.image} alt="" />{" "}
            </div>
            <h2 className="text-title">{item.name}</h2>
            <h3 className="text-species">{item.species}</h3>
          </Link>
        </div>
      );
    });
  };

  return (
    <>
      <div className="block-search">
        <input
          className="search-character"
          onChange={inputChangeValue}
          placeholder=" 🔍 Filter by name"
          value={textInput}
        />
      </div>
      <div className="block-character-all">{renderCharacters()}</div>
    </>
  );
};
export default Character;
