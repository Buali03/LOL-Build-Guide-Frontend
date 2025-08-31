import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import ChampionsList from "./components/lol/champions-list/champions-list";

const versionApiURL = import.meta.env.VITE_VERSION_API;

function App() {
  const [champions, setChampions] = useState([]);
  const [version, setVersion] = useState();

  const getChampions = async () => {
    try {
      const response = await axios.get(versionApiURL);
      const latest = response.data[0];
      setVersion(latest);

      const res = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`
      );
      setChampions(Object.values(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChampions();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/lolguides/champions"
          element={<ChampionsList champions={champions} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
