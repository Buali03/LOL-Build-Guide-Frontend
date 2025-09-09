import { useParams } from "react-router";
import { showLOLGuide } from "../../../../lib/api";
import { useState, useEffect } from "react";
import "./guide-details.css";

const GuideDetails = ({ baseApiURL, version }) => {
  const params = useParams();
  const [thisGuide, setThisGuide] = useState();

  const getThisGuide = async () => {
    const guide = await showLOLGuide(params.guideId);
    setThisGuide(guide);
  };

  useEffect(() => {
    getThisGuide();
  }, []);
  console.log(thisGuide);
  return (
    <div className="main-content">
      {thisGuide ? (
        <div className="this-guide-card">
          <div className="this-guide-header">
            <img
              className="this-guide-champion-img"
              src={`${baseApiURL}${version}/img/champion/${thisGuide.champion.image}`}
            />
            <div>
              <h1>{thisGuide.title}</h1>
              <p>
                Guide Date:{" "}
                {new Date(thisGuide.createdAt)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, "-")}{" "}
                | Created by: {thisGuide.username.username}
              </p>
            </div>
          </div>

          <h2>Runes</h2>
          <div className="this-guide-runes-section">
            <div className="this-guide-rune-card">
              <p>Primary Rune: {thisGuide.primaryRune.name}</p>
              <img
                className="this-guide-rune-card-img"
                src={`${baseApiURL}img/${thisGuide.primaryRune.image}`}
              />
            </div>
            <div className="this-guide-rune-card">
              <p>Secondary Rune: {thisGuide.secondaryRune.name}</p>
              <img
                className="this-guide-rune-card-img"
                src={`${baseApiURL}img/${thisGuide.secondaryRune.image}`}
              />
            </div>
          </div>

          <h2>Summoner Spells</h2>
          <div className="this-guide-spells-section">
            <div className="this-guide-spell-card">
              <p>{thisGuide.firstSpell.name}</p>
              <img
                className="this-guide-spell-card-img"
                src={`${baseApiURL}${version}/img/spell/${thisGuide.firstSpell.image}`}
              />
            </div>
            <div className="this-guide-spell-card">
              <p>{thisGuide.secondSpell.name}</p>
              <img
                className="this-guide-spell-card-img"
                src={`${baseApiURL}${version}/img/spell/${thisGuide.secondSpell.image}`}
              />
            </div>
          </div>

          <h2>Items</h2>
          <div className="this-guide-items-section">
            {[
              thisGuide.firstItem,
              thisGuide.secondItem,
              thisGuide.thirdItem,
              thisGuide.fourthItem,
              thisGuide.fifthItem,
              thisGuide.sixthItem,
            ].map((item, index) => (
              <div className="this-guide-items-cards" key={index}>
                <p>{item.name}</p>
                <img
                  className="this-guide-items-cards-img"
                  src={`${baseApiURL}${version}/img/item/${item.image}`}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GuideDetails;
