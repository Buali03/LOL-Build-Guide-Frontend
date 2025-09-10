import { useState, useEffect } from "react";
import { allLOLGuide } from "../../../../lib/api";
import axios from "axios";
import { Link } from "react-router-dom";
import "./guide-list.css";

const GuideList = ({ baseApiURL, version }) => {
  const [allLOLGuides, setAllLOLGuides] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("Descending");
  const [runeFilter, setRuneFilter] = useState("all");
  const getAllLOLGuides = async () => {
    const guides = await allLOLGuide();
    setAllLOLGuides(guides);
  };
  const query = searchQuery.trim().toLowerCase();

  const filteredGuides = allLOLGuides
    .filter(
      (guide) =>
        ((guide.title ?? "") + " " + (guide.champion?.name ?? ""))
          .toLowerCase()
          .includes(query) &&
        (runeFilter === "all" || guide.primaryRune?.name === runeFilter)
    )
    .sort((a, b) =>
      sortOrder === "Ascending"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  useEffect(() => {
    getAllLOLGuides();
  }, []);

  return (
    <div className="main-content">
      <div className="all-guide-list-page">
        <h1 className="all-guide-list-page-title">All Guides</h1>
        <div className="champion-guide-list-query-row">
          <input
            className="champion-guide-list-search-bar"
            type="text"
            placeholder="Search guide or champion..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <select
            className="champion-guide-list-rune-select"
            value={runeFilter}
            onChange={(event) => setRuneFilter(event.target.value)}
          >
            <option value="all">All Runes</option>
            <option value="Domination">Domination</option>
            <option value="Precision">Precision</option>
            <option value="Inspiration">Inspiration</option>
            <option value="Resolve">Resolve</option>
            <option value="Sorcery">Sorcery</option>
          </select>

          <select
            className="champion-guide-list-date-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="Descending">Order by Newest</option>
            <option value="Ascending">Order by Oldest</option>
          </select>
        </div>
        <div className="all-guide-list-container">
          {filteredGuides.length ? (
            filteredGuides.map((guide) => {
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
                      <p>{guide.title}</p>
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
            })
          ) : (
            <div className="no-guide-found-msg">
              <h1>No Guides Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideList;
