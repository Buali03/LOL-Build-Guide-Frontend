import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./champions-list.css";

const ChampionsList = ({ champions, baseApiURL, version }) => {
  return (
    <div className="champions-list-card">
      {champions.length
        ? champions.map((champ) => {
            const imageURLFull = `${baseApiURL}${version}/img/champion/${champ.image.full}`;
            return (
              <Link
                to={`/lolguides/champions/${champ.id}`}
                key={champ.id}
                className="champion-card"
              >
                <img src={imageURLFull} className="champion-img" />

                <ul className="champion-ul">
                  <li className="champion-name">{champ.name}</li>
                  <li className="champion-title">{champ.title}</li>
                </ul>
              </Link>
            );
          })
        : null}
    </div>
  );
};

export default ChampionsList;
