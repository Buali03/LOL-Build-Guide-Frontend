import "./champion-guide-list.css";
import { allLOLGuide } from "../../../../lib/api";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const ChampionGuideList = ({ thisChamp, baseApiURL, version }) => {
  const [thisChampGuides, setThisChampGuides] = useState();

  const getThisChampGuides = async () => {
    const allGuides = await allLOLGuide();
    const guides = allGuides.filter(
      (guide) => guide.champion.name == thisChamp.name
    );
    setThisChampGuides(guides);
  };

  useEffect(() => {
    getThisChampGuides();
  }, [thisChamp]);

  return thisChampGuides ? (
    <div className="champion-guide-list">
      <h1 className="champion-guide-list-title">
        {thisChamp.name}'s Build Guides
      </h1>
      <div className="champion-guide-list-container">
        {console.log(thisChampGuides)}
        {thisChampGuides.map((guide) => {
          const date = new Date(guide.createdAt);
          const formattedDate = date
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-");
          return (
            <Link to={`/lolguides/${guide._id}`} key={guide.id}>
              <div className="this-champion-guide-preview">
                <div className="this-champion-preview-img" key={guide.id}>
                  <img
                    src={`${baseApiURL}${version}/img/champion/${guide.champion.image}`}
                  />
                </div>
                <div className="this-champion-preview-info">
                  <p>
                    {guide.champion.name}'s {guide.title} Build Guide
                  </p>
                  <div className="this-champion-preview-rune-info">
                    <img src={`${baseApiURL}img/${guide.primaryRune.image}`} />
                    <p>{guide.primaryRune.name}</p>
                  </div>
                  <p>
                    Guide Date: {formattedDate} | Created by:{" "}
                    {guide.username.username}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default ChampionGuideList;
