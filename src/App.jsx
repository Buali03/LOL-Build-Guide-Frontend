import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const versionApiURL = import.meta.env.VITE_VERSION_API;

function App() {
  const [champions, setChampions] = useState([]);
  const [version, setVersion] = useState();

  const getChampions = async () => {
    try {
      const response = await axios.get(versionApiURL);
      setVersion(response.data[0]);

      const res = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${response.data[0]}/data/en_US/champion.json`
      );
      setChampions(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const getChampions = async () => {
  //   const response = await axios.get("");
  // };
  useEffect(() => {
    getChampions();
  }, []);
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default App;
