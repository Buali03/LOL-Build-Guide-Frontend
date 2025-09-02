import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const GuideForm = ({ champions }) => {
  const navigate = useNavigate();

  const [lolGuide, setLOLGuide] = useState([]);
  const [newLOLGuide, setNewLOLGuide] = useState({});

  const handleChange = async (event) => {
    setNewLOLGuide({ ...newLOLGuide, [event.target.name]: event.target.value });
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
        <select>
          {champions.map((champ) => {
            return (
              <option key={champ.id} value={champ.id}>
                {champ.id}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
};

export default GuideForm;
