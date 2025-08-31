import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./champion-details.css";

const ChampionDetails = ({ baseApiURL, version, tagIcons }) => {
  const { champId } = useParams();
  const [thisChamp, setThisChamp] = useState();
  const getThisChamp = async () => {
    const response = await axios.get(
      `${baseApiURL}${version}/data/en_US/champion/${champId}.json`
    );
    console.log(response.data.data[champId]);
    setThisChamp(response.data.data[champId]);
  };

  useEffect(() => {
    if (baseApiURL && version && champId) {
      getThisChamp();
    }
  }, [baseApiURL, version, champId]);

  return thisChamp ? (
    <div className="main-content">
      <div>
        <div className="champ-info">
          <img
            src={`${baseApiURL}${version}/img/champion/${thisChamp.image.full}`}
          />
          <div className="champ-info-text">
            <h1>{thisChamp.name}</h1>
            <h3>{thisChamp.title}</h3>
            <div className="champ-info-tag">
              {thisChamp.tags.map((tag) => {
                return <h3 key={tag}>{tag}</h3>;
              })}
            </div>
          </div>
          <p className="champ-info-lore">{thisChamp.lore}</p>
        </div>
        <div></div>
      </div>
    </div>
  ) : (
    <ClipLoader color="red" />
  );
};

export default ChampionDetails;
