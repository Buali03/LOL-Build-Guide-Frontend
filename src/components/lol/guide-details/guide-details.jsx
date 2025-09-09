import { Link, useParams, Navigate, useNavigate } from "react-router";
import { showLOLGuide, deleteLOLGuide } from "../../../../lib/api";
import { useState, useEffect } from "react";
import "./guide-details.css";
import { FaArrowRight } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const GuideDetails = ({ baseApiURL, version, token }) => {
  const navigate = useNavigate();
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

          <div className="this-guide-runes-spells-container">
            <div className="this-guide-runes-spells-headers">
              <h2>Runes</h2>

              <h2>Summoner Spells</h2>
            </div>
            <div className="this-guide-runes-spells-list">
              <div className="this-guide-runes-section">
                <div className="this-guide-rune-card">
                  <p>Primary Rune:</p>
                  <div className="this-guide-rune-card-info tooltip">
                    <img
                      className="this-guide-rune-card-img"
                      src={`${baseApiURL}img/${thisGuide.primaryRune.image}`}
                    />
                    <span className="this-guide-tooltip-text">
                      {thisGuide.primaryRune.name}
                    </span>
                  </div>
                </div>
                <div className="this-guide-rune-card">
                  <p>Secondary Rune:</p>
                  <div className="this-guide-rune-card-info tooltip">
                    <img
                      className="this-guide-rune-card-img"
                      src={`${baseApiURL}img/${thisGuide.secondaryRune.image}`}
                    />
                    <span className="this-guide-tooltip-text">
                      {thisGuide.secondaryRune.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="this-guide-spells-section">
                <div className="this-guide-spell-card">
                  <p>First Spell:</p>
                  <div className="this-guide-spell-card-info tooltip">
                    <img
                      className="this-guide-spell-card-img"
                      src={`${baseApiURL}${version}/img/spell/${thisGuide.firstSpell.image}`}
                    />
                    <span className="this-guide-tooltip-text">
                      {thisGuide.firstSpell.name}
                    </span>
                  </div>
                </div>
                <div className="this-guide-spell-card tooltip">
                  <p>Second Spell:</p>
                  <div className="this-guide-spell-card-info tooltip">
                    <img
                      className="this-guide-spell-card-img"
                      src={`${baseApiURL}${version}/img/spell/${thisGuide.secondSpell.image}`}
                    />
                    <span className="this-guide-tooltip-text">
                      {thisGuide.secondSpell.name}
                    </span>
                  </div>
                </div>
              </div>
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
              <div className="this-guide-items-cards tooltip" key={index}>
                <span className="this-guide-tooltip-text">{item.name}</span>
                <img
                  className="this-guide-items-cards-img"
                  src={`${baseApiURL}${version}/img/item/${item.image}`}
                />
                {index < 5 ? (
                  <div>
                    <FaArrowRight />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          {jwtDecode(token).id === thisGuide.username._id && (
            <>
              <div>
                <Link to={`/lolguides/${params.guideId}/edit`}>Edit Guide</Link>
              </div>
              <button
                onClick={async () => {
                  deleteLOLGuide(params.guideId);
                  navigate("/lolguides");
                }}
              >
                Delete Guide
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default GuideDetails;
