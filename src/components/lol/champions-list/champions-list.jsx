import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ChampionsList = ({ champions, baseApiURL, version }) => {
  return (
    <div className="grid grid-cols-5 gap-6 p-6">
      {champions.length
        ? champions.map((champ) => {
            console.log(champ);
            const imageURLFull = `${baseApiURL}${version}/img/champion/${champ.image.full}`;
            return (
              <Link
                to={`/lolguides/champions/${champ.id}`}
                key={champ.id}
                className="flex flex-col items-center bg-black rounded-xl shadow-md p-4 hover:scale-105 transition-transform duration-200"
              >
                <img src={imageURLFull} className="w-20 h-20 rounded-lg mb-2" />

                <p className="text-sm font-semibold text-gray-200">
                  {champ.name}
                </p>
              </Link>
            );
          })
        : null}
    </div>
  );
};

export default ChampionsList;
