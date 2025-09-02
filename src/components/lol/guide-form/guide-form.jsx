import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const GuideForm = ({ champions, runes, items, baseApiURL, version }) => {
  const navigate = useNavigate();

  const [lolGuide, setLOLGuide] = useState([]);
  const [newLOLGuide, setNewLOLGuide] = useState({});
  const [primaryRuneImage, setPrimaryRuneImage] = useState(
    "perk-images/Styles/7200_Domination.png"
  );
  const [secondaryRuneImage, setSecondaryRuneImage] = useState(
    "perk-images/Styles/7203_Whimsy.png"
  );

  const handleChange = async (event) => {
    setNewLOLGuide({ ...newLOLGuide, [event.target.name]: event.target.value });
    console.log("Guide: ", newLOLGuide);
  };
  const handlePrimaryRuneChange = async (event) => {
    const selectedRune = runes.find((rune) => rune.name === event.target.value);
    setPrimaryRuneImage(selectedRune.icon);
    console.log("Primary Rune: ", primaryRuneImage);
  };
  const handleSecondaryRuneChange = async (event) => {
    const selectedRune = runes.find((rune) => rune.name === event.target.value);
    setSecondaryRuneImage(selectedRune.icon);
    console.log("Secondary Rune: ", secondaryRuneImage);
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
        <label>Select Primary Rune:</label>
        <img src={`${baseApiURL}img/${primaryRuneImage}`} />
        <select
          onChange={(event) => {
            handleChange(event);
            handlePrimaryRuneChange(event);
          }}
          name="primary-rune"
          id="primary-rune"
        >
          {runes.map((rune) => {
            if (rune.icon != secondaryRuneImage) {
              return (
                <option key={rune.name} value={rune.name}>
                  {rune.name}
                </option>
              );
            }
          })}
        </select>

        <label>Select Secondary Rune:</label>
        <img src={`${baseApiURL}img/${secondaryRuneImage}`} />
        <select
          onChange={(event) => {
            handleChange(event);
            handleSecondaryRuneChange(event);
          }}
          name="secondary-rune"
          id="secondary-rune"
        >
          {runes.map((rune) => {
            if (rune.icon != primaryRuneImage) {
              return (
                <option key={rune.name} value={rune.name}>
                  {rune.name}
                </option>
              );
            }
          })}
        </select>
      </form>
    </div>
  );
};

export default GuideForm;
