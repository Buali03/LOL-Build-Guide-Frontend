import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const GuideForm = () => {
  const navigate = useNavigate();

  const [lolGuide, setLOLGuide] = useState([]);
  const [newLOLGuide, setNewLOLGuide] = useState({});

  const handleChange = async (event) => {
    setNewLOLGuide({ ...newLOLGuide, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLOLGuide([...lolGuide, newLOLGuide]);
    console.log("All guides ", lolGuide);
    navigate("/lolguides/champions");
  };
  return (
    <div>
      <h1>Create Guide</h1>
      <form></form>
    </div>
  );
};

export default GuideForm;
