import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./guide-form.css";

const GuideForm = ({
  champions,
  runes,
  items,
  summonerSpells,
  baseApiURL,
  version,
}) => {
  const navigate = useNavigate();
  const [lolGuide, setLOLGuide] = useState([]);
  // const [selectedItems, setSelectedItems] = useState([
  //   "Overlord's Bloodmail",
  //   "Unending Despair",
  //   "Blackfire Torch",
  //   "Kaenic Rookern",
  //   "Trailblazer",
  //   "Manamune",
  // ]);
  const [newLOLGuide, setNewLOLGuide] = useState({
    title: "",
    champion: { name: "Aatrox", image: "Aatrox.png" },
    primaryRune: {
      name: "Domination",
      image: "perk-images/Styles/7200_Domination.png",
    },
    secondaryRune: {
      name: "Inspiration",
      image: "perk-images/Styles/7203_Whimsy.png",
    },
    firstSpell: { name: "Barrier", image: "SummonerBarrier.png" },
    secondSpell: { name: "Exhaust", image: "SummonerBoost.png" },
    firstItem: { name: "Overlord's Bloodmail", image: "447111.png" },
    secondItem: { name: "Unending Despair", image: "2502.png" },
    thirdItem: { name: "Blackfire Torch", image: "2503.png" },
    fourthItem: { name: "Kaenic Rookern", image: "2504.png" },
    fifthItem: { name: "Trailblazer", image: "3002.png" },
    sixthItem: { name: "Manamune", image: "3004.png" },
  });
  const selectedItems = [
    newLOLGuide.firstItem?.name,
    newLOLGuide.secondItem?.name,
    newLOLGuide.thirdItem?.name,
    newLOLGuide.fourthItem?.name,
    newLOLGuide.fifthItem?.name,
    newLOLGuide.sixthItem?.name,
  ];

  const handleChange = async (event) => {
    let data;
    try {
      data = JSON.parse(event.target.value);
    } catch {
      data = event.target.value;
    }
    setNewLOLGuide({ ...newLOLGuide, [event.target.name]: data });
    // setSelectedItems([
    //   newLOLGuide.firstItem.name,
    //   newLOLGuide.secondItem.name,
    //   newLOLGuide.thirdItem.name,
    //   newLOLGuide.fourthItem.name,
    //   newLOLGuide.fifthItem.name,
    //   newLOLGuide.sixthItem.name,
    // ]);
    console.log("Guide: ", newLOLGuide);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLOLGuide([...lolGuide, newLOLGuide]);
    setNewLOLGuide();
    console.log("All guides ", lolGuide);
    navigate("/lolguides/champions");
  };
  return (
    <div className="main-content">
      <div className="guide-form-container">
        <h1 className="guide-form-title">Create Guide</h1>
        {champions && items && runes && summonerSpells ? (
          <form className="guide-form" onSubmit={handleSubmit}>
            <label className="guide-form-label">Guide Title:</label>
            <input
              className="guide-form-title-input"
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
            />
            <label className="guide-form-label">Champion:</label>
            <div className="guide-form-champion-div">
              <img
                className="guide-form-champion-img"
                src={`${baseApiURL}${version}/img/champion/${newLOLGuide.champion.image}`}
              />
              <select
                className="guide-form-champion-select"
                onChange={handleChange}
                name="champion"
                id="champion"
              >
                {champions.map((champ) => {
                  return (
                    <option
                      key={champ.id}
                      value={JSON.stringify({
                        name: champ.id,
                        image: champ.image.full,
                      })}
                    >
                      {champ.id}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="guide-form-rune-spell-container-div">
              <div className="guide-form-rune-spell-row">
                <div className="guide-form-rune-spell-div">
                  <label className="guide-form-label">
                    Select Primary Rune:
                  </label>
                  <div className="guide-form-rune-spell-details">
                    <img
                      className="guide-form-rune-spell-img"
                      src={`${baseApiURL}img/${newLOLGuide.primaryRune.image}`}
                    />
                    <select
                      className="guide-form-rune-spell-select"
                      onChange={handleChange}
                      name="primaryRune"
                      id="primaryRune"
                    >
                      {runes
                        .filter(
                          (rune) => rune.name != newLOLGuide.secondaryRune.name
                        )
                        .map((rune) => {
                          return (
                            <option
                              key={rune.name}
                              value={JSON.stringify({
                                name: rune.name,
                                image: rune.icon,
                              })}
                            >
                              {rune.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>

                <div className="guide-form-rune-spell-div">
                  <label className="guide-form-label">
                    Select Secondary Rune:
                  </label>
                  <div className="guide-form-rune-spell-details">
                    <img
                      className="guide-form-rune-spell-img"
                      src={`${baseApiURL}img/${newLOLGuide.secondaryRune.image}`}
                    />
                    <select
                      className="guide-form-rune-spell-select"
                      onChange={handleChange}
                      name="secondaryRune"
                      id="secondaryRune"
                    >
                      {runes
                        .filter(
                          (rune) => rune.name != newLOLGuide.primaryRune.name
                        )
                        .map((rune) => {
                          return (
                            <option
                              key={rune.name}
                              value={JSON.stringify({
                                name: rune.name,
                                image: rune.icon,
                              })}
                            >
                              {rune.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="guide-form-rune-spell-row">
                <div className="guide-form-rune-spell-div">
                  <label className="guide-form-label">
                    Select First Spell:
                  </label>
                  <div className="guide-form-rune-spell-details">
                    <img
                      className="guide-form-rune-spell-img"
                      src={`${baseApiURL}${version}/img/spell/${newLOLGuide.firstSpell.image}`}
                    />
                    <select
                      className="guide-form-rune-spell-select"
                      onChange={handleChange}
                      name="firstSpell"
                      id="firstSpell"
                    >
                      {summonerSpells
                        .filter(
                          (spell) => spell.name != newLOLGuide.secondSpell.name
                        )
                        .map((spell) => {
                          return (
                            <option
                              key={spell.name}
                              value={JSON.stringify({
                                name: spell.name,
                                image: spell.image.full,
                              })}
                            >
                              {spell.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="guide-form-rune-spell-div">
                  <label className="guide-form-label">
                    Select Second Spell:
                  </label>
                  <div className="guide-form-rune-spell-details">
                    <img
                      className="guide-form-rune-spell-img"
                      src={`${baseApiURL}${version}/img/spell/${newLOLGuide.secondSpell.image}`}
                    />
                    <select
                      className="guide-form-rune-spell-select"
                      onChange={handleChange}
                      name="secondSpell"
                      id="secondSpell"
                    >
                      {summonerSpells
                        .filter(
                          (spell) => spell.name != newLOLGuide.firstSpell.name
                        )
                        .map((spell) => {
                          return (
                            <option
                              key={spell.name}
                              value={JSON.stringify({
                                name: spell.name,
                                image: spell.image.full,
                              })}
                            >
                              {spell.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <label className="guide-form-label">Select Items:</label>
              <div className="guide-form-item-container">
                {[
                  "firstItem",
                  "secondItem",
                  "thirdItem",
                  "fourthItem",
                  "fifthItem",
                  "sixthItem",
                ].map((itemSlot, index) => {
                  const currentItem = newLOLGuide?.[itemSlot];
                  return (
                    <div className="guide-form-item" key={itemSlot}>
                      <div className="guide-form-item-figure">
                        <span className="guide-form-item-slot">
                          {index + 1}
                        </span>
                        <img
                          className="guide-form-item-img"
                          src={`${baseApiURL}${version}/img/item/${currentItem.image}`}
                        />
                      </div>
                      <select
                        className="guide-form-item-select"
                        onChange={handleChange}
                        name={itemSlot}
                        id={itemSlot}
                      >
                        {items
                          .filter(
                            (item) =>
                              item.name === currentItem.name ||
                              !selectedItems?.includes?.(item.name)
                          )
                          .map((item) => {
                            return (
                              <option
                                key={`${item.name}-${item.image.full}`}
                                value={JSON.stringify({
                                  name: item.name,
                                  image: item.image.full,
                                })}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
            <button type="submit" className="guide-form-submit">
              Save Guide
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default GuideForm;
