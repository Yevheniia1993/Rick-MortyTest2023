import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowBack } from "../img/arrow_back.svg";
import { useNavigate } from "react-router-dom";

const Episodes = (props) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("id");
  const [characterInfo, setInfo] = useState([]);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${product}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let SaveCharacter = [data];
        setInfo(SaveCharacter);
      });
  }, []);

  const Character = characterInfo.map((item, index) => {
    return (
      <div className="choice-character-block" align="center" key={index}>
        <img className="avatar-character" src={item.image} alt="" />
        <h1 className="name-character-choice">{item.name}</h1>
        <h2 className="Info-all">Informations</h2>
        <div className="block-info">
          <div className="name-info">Gender</div>
          <div className="name-data">{item.gender}</div>
        </div>
        <div className="block-info">
          <div className="name-info">Status</div>
          <div className="name-data">{item.status}</div>
        </div>
        <div className="block-info">
          <div className="name-info">Species</div>
          <div className="name-data">{item.species}</div>
        </div>
        <div className="block-info">
          <div className="name-info">Origin</div>
          <div className="name-data">{item.origin.name}</div>
        </div>
        <div className="block-info">
          <div className="name-info">Type</div>
          <div className="name-data">{item.type || "Unknown"}</div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="link-back">
        <div onClick={goBack} className="link-back-content">
          <ArrowBack /> GO BACK
        </div>
      </div>
      {Character}
    </>
  );
};
export default Episodes;
