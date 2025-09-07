import "./champion-guide-list.css";
import { allLOLGuide } from "../../../../lib/api";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const ChampionGuideList = ({ thisChamp, baseApiURL, version }) => {
  const [thisChampGuides, setThisChampGuides] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("Descending");
  const [runeFilter, setRuneFilter] = useState("all");

  const getThisChampGuides = async () => {
    const allGuides = await allLOLGuide();
    const guides = allGuides.filter(
      (guide) => guide.champion.name == thisChamp.name
    );
    setThisChampGuides(guides);
  };

  const filteredGuides = thisChampGuides
    .filter(
      (guide) =>
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (runeFilter === "all" || guide.primaryRune.name === runeFilter)
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "Ascending" ? dateA - dateB : dateB - dateA;
    });

  useEffect(() => {
    getThisChampGuides();
  }, [thisChamp]);

  return thisChampGuides ? (
    <div className="champion-guide-list">
      <h1 className="champion-guide-list-title">
        {thisChamp.name}'s Build Guides
      </h1>
      <div className="this-champion-guide-list-container">
        <input
          type="text"
          placeholder="Search guide title..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <select
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
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="Descending">Order by Newest</option>
          <option value="Ascending">Order by Oldest</option>
        </select>

        {console.log(filteredGuides)}
        {filteredGuides.map((guide) => {
          const date = new Date(guide.createdAt);
          const formattedDate = date
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-");
          return (
            <Link to={`/lolguides/${guide._id}`} key={guide._id}>
              <div className="this-champion-guide-preview">
                <div className="this-champion-preview-img" key={guide._id}>
                  <img
                    src={`${baseApiURL}${version}/img/champion/${guide.champion.image}`}
                  />
                </div>
                <div className="this-champion-preview-info">
                  <p>{guide.title}</p>
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
