import { useState, useEffect } from "react";
import { allLOLGuide } from "../../../../lib/api";
import axios from "axios";
import { Link } from "react-router";

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
      <div>
        <h1>All Guides</h1>
      </div>
      {allLOLGuides ? (
        <div>
          {console.log(allLOLGuides)}
          <div>
            {allLOLGuides.map((guide) => {
              return (
                <Link to={"/lolguides/:guideId"} key={guide.id}>
                  <div key={guide.id}>
                    <img
                      src={`${baseApiURL}${version}/img/champion/${guide.champion.image}`}
                    />
                    <div>
                      <p>
                        {guide.champion.name}'s {guide.title} Build Guide
                      </p>
                      <p>{guide.createdAt}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GuideList;
