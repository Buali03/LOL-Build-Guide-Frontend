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
  });

  const handleChange = async (event) => {
    let data;
    try {
      data = JSON.parse(event.target.value);
    } catch {
      data = event.target.value;
    }
    setNewLOLGuide({ ...newLOLGuide, [event.target.name]: data });
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
      <h1>Create Guide</h1>
      <form className="guide-form-container" onSubmit={handleSubmit}>
        <label className="guide-form-label">Guide Title:</label>
        <input id="title" name="title" type="text" onChange={handleChange} />
        <br />
        <label className="guide-form-label">Champion:</label>
        <img
          className="guide-form-champion-img"
          src={`${baseApiURL}${version}/img/champion/${newLOLGuide.champion.image}`}
        />
        <select onChange={handleChange} name="champion" id="champion">
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
        <br />
        <label className="guide-form-label">Select Primary Rune:</label>
        <img
          className="guide-form-rune-img"
          src={`${baseApiURL}img/${newLOLGuide.primaryRune.image}`}
        />
        <select onChange={handleChange} name="primaryRune" id="primaryRune">
          {runes
            .filter((rune) => rune.name != newLOLGuide.secondaryRune.name)
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
        <br />

        <label className="guide-form-label">Select Secondary Rune:</label>
        <img
          className="guide-form-rune-img"
          src={`${baseApiURL}img/${newLOLGuide.secondaryRune.image}`}
        />
        <select onChange={handleChange} name="secondaryRune" id="secondaryRune">
          {runes
            .filter((rune) => rune.name != newLOLGuide.primaryRune.name)
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
        <br />

        <label className="guide-form-label">Select First Summoner Spell:</label>
        <img
          className="guide-form-spell-img"
          src={`${baseApiURL}${version}/img/spell/${newLOLGuide.firstSpell.image}`}
        />
        <select onChange={handleChange} name="firstSpell" id="firstSpell">
          {summonerSpells
            .filter((spell) => spell.name != newLOLGuide.secondSpell.name)
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
        <br />

        <label className="guide-form-label">
          Select Second Summoner Spell:
        </label>
        <img
          className="guide-form-spell-img"
          src={`${baseApiURL}${version}/img/spell/${newLOLGuide.secondSpell.image}`}
        />
        <select onChange={handleChange} name="secondSpell" id="secondSpell">
          {summonerSpells
            .filter((spell) => spell.name != newLOLGuide.firstSpell.name)
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
        <br />
        <button type="submit" className="guide-form-submit">
          Save Guide
        </button>
      </form>
    </div>
  );
};

export default GuideForm;
