import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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
  const [newLOLGuide, setNewLOLGuide] = useState({});
  const [primaryRuneImage, setPrimaryRuneImage] = useState(
    "perk-images/Styles/7200_Domination.png"
  );
  const [secondaryRuneImage, setSecondaryRuneImage] = useState(
    "perk-images/Styles/7203_Whimsy.png"
  );
  const [firstSpellImage, setFirstSpellImage] = useState("SummonerBarrier.png");
  const [secondSpellImage, setSecondSpellImage] = useState(
    "SummonerExhaust.png"
  );

  const handleChange = async (event) => {
    setNewLOLGuide({ ...newLOLGuide, [event.target.name]: event.target.value });
    console.log("Guide: ", newLOLGuide);
  };

  const handlePrimaryRuneChange = async (event) => {
    const selectedRune = runes.find((rune) => rune.name === event.target.value);
    setPrimaryRuneImage(selectedRune.icon);
    // console.log("Primary Rune: ", primaryRuneImage);
  };
  const handleSecondaryRuneChange = async (event) => {
    const selectedRune = runes.find((rune) => rune.name === event.target.value);
    setSecondaryRuneImage(selectedRune.icon);
    // console.log("Secondary Rune: ", secondaryRuneImage);
  };

  const handleFirstSpellChange = async (event) => {
    const selectedSpell = summonerSpells.find(
      (spell) => spell.name === event.target.value
    );
    setFirstSpellImage(selectedSpell.image.full);
    console.log("First Spell: ", firstSpellImage);
  };
  const handleSecondSpellChange = async (event) => {
    const selectedSpell = summonerSpells.find(
      (spell) => spell.name === event.target.value
    );
    setSecondSpellImage(selectedSpell.image.full);
    console.log("Second Spell: ", secondSpellImage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLOLGuide([...lolGuide, newLOLGuide]);
    setNewLOLGuide();
    console.log("All guides ", lolGuide);
    navigate("/lolguides/champions");
  };
  return (
    <div>
      <h1>Create Guide</h1>
      <form onSubmit={handleSubmit}>
        <label>Guide Title:</label>
        <input id="title" name="title" type="text" onChange={handleChange} />
        <br />
        <label>Champion:</label>
        <select onChange={handleChange} name="champion" id="champion">
          {champions.map((champ) => {
            return (
              <option key={champ.id} value={champ.id}>
                {champ.id}
              </option>
            );
          })}
        </select>
        <br />
        <label>Select Primary Rune:</label>
        <img src={`${baseApiURL}img/${primaryRuneImage}`} />
        <select
          onChange={(event) => {
            handleChange(event);
            handlePrimaryRuneChange(event);
          }}
          name="primaryRune"
          id="primaryRune"
        >
          {runes
            .filter((rune) => rune.icon != secondaryRuneImage)
            .map((rune) => {
              return (
                <option key={rune.name} value={rune.name}>
                  {rune.name}
                </option>
              );
            })}
        </select>
        <br />

        <label>Select Secondary Rune:</label>
        <img src={`${baseApiURL}img/${secondaryRuneImage}`} />
        <select
          onChange={(event) => {
            handleChange(event);
            handleSecondaryRuneChange(event);
          }}
          name="secondaryRune"
          id="secondaryRune"
        >
          {runes
            .filter((rune) => rune.icon != primaryRuneImage)
            .map((rune) => {
              return (
                <option key={rune.name} value={rune.name}>
                  {rune.name}
                </option>
              );
            })}
        </select>
        <br />

        <label>Select First Summoner Spell:</label>
        <img src={`${baseApiURL}${version}/img/spell/${firstSpellImage}`} />
        <select
          onChange={(event) => {
            handleChange(event);
            handleFirstSpellChange(event);
          }}
          name="firstSpell"
          id="firstSpell"
        >
          {summonerSpells
            .filter((spell) => spell.image.full != secondSpellImage)
            .map((spell) => {
              return (
                <option key={spell.name} value={spell.name}>
                  {spell.name}
                </option>
              );
            })}
        </select>
        <br />

        <label>Select Second Summoner Spell:</label>
        <img src={`${baseApiURL}${version}/img/spell/${secondSpellImage}`} />
        <select
          onChange={(event) => {
            handleChange(event);
            handleSecondSpellChange(event);
          }}
          name="secondSpell"
          id="secondSpell"
        >
          {summonerSpells
            .filter((spell) => spell.image.full != firstSpellImage)
            .map((spell) => {
              return (
                <option key={spell.name} value={spell.name}>
                  {spell.name}
                </option>
              );
            })}
        </select>
        <br />
      </form>
    </div>
  );
};

export default GuideForm;
