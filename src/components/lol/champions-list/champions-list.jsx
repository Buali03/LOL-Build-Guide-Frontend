import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./champions-list.css";

const ChampionsList = ({ champions, baseApiURL, version, tagIcons }) => {
  return (
    <div className="main-content">
      <div className="champions-list-card">
        {champions.length
          ? champions.map((champ) => {
              const imageURLFull = `${baseApiURL}${version}/img/champion/${champ.image.full}`;
              const Icon = tagIcons[champ.tags?.[0]];
              return (
                <Link
                  to={`/lolguides/champions/${champ.id}`}
                  key={champ.id}
                  className="champion-card"
                >
                  <div className="champion-tag-img">{<Icon />}</div>
                  <img src={imageURLFull} className="champion-img" />

                  <ul className="champion-ul">
                    <li className="champion-name">{champ.name}</li>
                    <li className="champion-title">{champ.title}</li>
                    <div className="champion-tag">
                      {champ.tags.map((tag) => {
                        return <li key={tag}>{tag}</li>;
                      })}
                    </div>
                  </ul>
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ChampionsList;
