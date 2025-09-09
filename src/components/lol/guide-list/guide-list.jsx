import { useState, useEffect } from "react";
import { allLOLGuide } from "../../../../lib/api";
import axios from "axios";
import { Link } from "react-router-dom";
import "./guide-list.css";

const GuideList = ({ baseApiURL, version }) => {
  const [allLOLGuides, setAllLOLGuides] = useState();

  const getAllLOLGuides = async () => {
    const guides = await allLOLGuide();
    setAllLOLGuides(guides);
  };

  useEffect(() => {
    getAllLOLGuides();
  }, []);

  return (
    <div className="main-content">
      <div className="all-guide-list-page">
        <h1 className="all-guide-list-page-title">All Guides</h1>
        {allLOLGuides ? (
          <div className="all-guide-list-container">
            {allLOLGuides.map((guide) => {
              const date = new Date(guide.createdAt);
              const formattedDate = date
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-");
              return (
                <Link to={`/lolguides/${guide._id}`} key={guide.id}>
                  <div className="one-guide-preview">
                    <div className="one-guide-preview-img" key={guide.id}>
                      <img
                        src={`${baseApiURL}${version}/img/champion/${guide.champion.image}`}
                      />
                    </div>
                    <div className="one-guide-preview-info">
                      <p>
                        {guide.champion.name}'s {guide.title} Build Guide
                      </p>
                      <p>Guide Date: {formattedDate}</p>
                      <p>Created by: {guide.username.username}</p>
                      <div className="one-guide-preview-rune-info">
                        <img
                          src={`${baseApiURL}img/${guide.primaryRune.image}`}
                        />
                        <p>{guide.primaryRune.name}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GuideList;
