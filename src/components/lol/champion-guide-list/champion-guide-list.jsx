import "./champion-guide-list.css";
const ChampionGuideList = ({ thisChamp }) => {
  return (
    <div className="champion-guide-list">
      <h1 className="champion-guide-list-title">
        {thisChamp.name}'s Build Guides
      </h1>
    </div>
  );
};

export default ChampionGuideList;
