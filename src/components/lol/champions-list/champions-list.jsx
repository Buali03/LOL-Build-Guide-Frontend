import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ChampionsList = ({ champions, baseApiURL, version }) => {
  return (
    <div>
      {champions.length
        ? champions.map((champ) => {
            console.log(champ);
            const imageURLFull = `${baseApiURL}${version}/img/champion/${champ.image.full}`;
            return (
              <div key={champ.id}>
                <img src={imageURLFull} />
                <p>{champ.name}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ChampionsList;
