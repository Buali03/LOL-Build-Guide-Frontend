import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { showLOLGuide, updateLOLGuide } from "../../../../lib/api";

const GuideEdit = ({
  champions,
  runes,
  items,
  summonerSpells,
  baseApiURL,
  version,
}) => {
  const params = useParams();
  const [formStarter, setFormStarter] = useState();

  const navigate = useNavigate();
  const [lolGuide, setLOLGuide] = useState([]);
  const [newLOLGuide, setNewLOLGuide] = useState({});
  const selectedItems = [
    newLOLGuide?.firstItem?.name,
    newLOLGuide?.secondItem?.name,
    newLOLGuide?.thirdItem?.name,
    newLOLGuide?.fourthItem?.name,
    newLOLGuide?.fifthItem?.name,
    newLOLGuide?.sixthItem?.name,
  ];

  const getGuideDetails = async () => {
    const response = await showLOLGuide(params.guideId);
    const guideData = {
      title: response.title,
      champion: {
        name: response.champion.name,
        image: response.champion.image,
      },
      primaryRune: {
        name: response.primaryRune.name,
        image: response.primaryRune.image,
      },
      secondaryRune: {
        name: response.secondaryRune.name,
        image: response.secondaryRune.image,
      },
      firstSpell: {
        name: response.firstSpell.name,
        image: response.firstSpell.image,
      },
      secondSpell: {
        name: response.secondSpell.name,
        image: response.secondSpell.image,
      },
      firstItem: {
        name: response.firstItem.name,
        image: response.firstItem.image,
      },
      secondItem: {
        name: response.secondItem.name,
        image: response.secondItem.image,
      },
      thirdItem: {
        name: response.thirdItem.name,
        image: response.thirdItem.image,
      },
      fourthItem: {
        name: response.fourthItem.name,
        image: response.fourthItem.image,
      },
      fifthItem: {
        name: response.fifthItem.name,
        image: response.fifthItem.image,
      },
      sixthItem: {
        name: response.sixthItem.name,
        image: response.sixthItem.image,
      },
    };
    setFormStarter(guideData);
    setNewLOLGuide(guideData);
  };
  const handleChange = async (event) => {
    let data;
    try {
      data = JSON.parse(event.target.value);
    } catch {
      data = event.target.value;
    }
    setNewLOLGuide({ ...newLOLGuide, [event.target.name]: data });
    // console.log("Guide: ", newLOLGuide);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const guideSubmit = {
      ...newLOLGuide,
      title: newLOLGuide.title || `${newLOLGuide.champion.name}'s Build Guide`,
    };
    setNewLOLGuide(guideSubmit);
    setLOLGuide([...lolGuide, guideSubmit]);
    const response = await updateLOLGuide(params.guideId, guideSubmit);
    // console.log("All guides ", lolGuide);
    navigate("/lolguides");
  };
  useEffect(() => {
    getGuideDetails();
  }, []);
  return (
    <div className="main-content">
      <div className="guide-form-container">
        <h1 className="guide-form-title">Edit Guide</h1>
        {champions && items && runes && summonerSpells && newLOLGuide ? (
          <form className="guide-form" onSubmit={handleSubmit}>
            <label className="guide-form-label">Guide Title: (Optional)</label>
            <input
              className="guide-form-title-input"
              id="title"
              name="title"
              type="text"
              value={newLOLGuide?.title}
              onChange={handleChange}
            />
            <label className="guide-form-label">Champion:</label>
            <div className="guide-form-champion-div">
              <img
                className="guide-form-champion-img"
                src={`${baseApiURL}${version}/img/champion/${newLOLGuide?.champion?.image}`}
              />
              <select
                className="guide-form-champion-select"
                onChange={handleChange}
                name="champion"
                id="champion"
                value={JSON.stringify(newLOLGuide?.champion)}
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
                      src={`${baseApiURL}img/${newLOLGuide?.primaryRune?.image}`}
                    />
                    <select
                      className="guide-form-rune-spell-select"
                      onChange={handleChange}
                      name="primaryRune"
                      id="primaryRune"
                      value={JSON.stringify(newLOLGuide?.primaryRune)}
                    >
                      {runes
                        .filter(
                          (rune) =>
                            rune.name != newLOLGuide?.secondaryRune?.name
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
                      src={`${baseApiURL}img/${newLOLGuide?.secondaryRune?.image}`}
                    />
                    <select
                      className="guide-form-rune-spell-select"
                      onChange={handleChange}
                      name="secondaryRune"
                      id="secondaryRune"
                      value={JSON.stringify(newLOLGuide?.secondaryRune)}
                    >
                      {runes
                        .filter(
                          (rune) => rune.name != newLOLGuide?.primaryRune?.name
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
                      src={`${baseApiURL}${version}/img/spell/${newLOLGuide?.firstSpell?.image}`}
                    />
                    <select
                      className="guide-form-rune-spell-select"
                      onChange={handleChange}
                      name="firstSpell"
                      id="firstSpell"
                      value={JSON.stringify(newLOLGuide?.firstSpell)}
                    >
                      {summonerSpells
                        .filter(
                          (spell) =>
                            spell.name != newLOLGuide?.secondSpell?.name
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
                      src={`${baseApiURL}${version}/img/spell/${newLOLGuide?.secondSpell?.image}`}
                    />
                    <select
                      className="guide-form-rune-spell-select"
                      onChange={handleChange}
                      name="secondSpell"
                      id="secondSpell"
                      value={JSON.stringify(newLOLGuide?.secondSpell)}
                    >
                      {summonerSpells
                        .filter(
                          (spell) => spell.name != newLOLGuide?.firstSpell?.name
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
                          src={`${baseApiURL}${version}/img/item/${currentItem?.image}`}
                        />
                      </div>
                      <select
                        className="guide-form-item-select"
                        onChange={handleChange}
                        name={itemSlot}
                        id={itemSlot}
                        value={JSON.stringify(newLOLGuide?.[itemSlot])}
                      >
                        {items
                          .filter(
                            (item) =>
                              item.name === currentItem?.name ||
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
              Save Guide Changes
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default GuideEdit;
