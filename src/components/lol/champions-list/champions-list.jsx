import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ChampionsList = ({ champions }) => {
  return (
    <div>
      {champions.length
        ? champions.map((champ) => {
            return <h1 key={champ.id}>{champ.name}</h1>;
          })
        : null}
    </div>
  );
};

export default ChampionsList;
