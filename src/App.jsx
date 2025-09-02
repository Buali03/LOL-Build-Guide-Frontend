import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaBookOpen } from "react-icons/fa";
import {
  GiBattleAxe,
  GiPlainDagger,
  GiBowArrow,
  GiSpellBook,
  GiShield,
  GiAngelWings,
} from "react-icons/gi";

import ChampionsList from "./components/lol/champions-list/champions-list";
import ChampionDetails from "./components/lol/champion-details/champion-details";
import NavBar from "./components/NavBar/NavBar";
import GuideForm from "./components/lol/guide-form/guide-form";

const versionApiURL = import.meta.env.VITE_VERSION_API;
const baseApiURL = import.meta.env.VITE_BASE_API;

function App() {
  const [champions, setChampions] = useState([]);
  const [runes, setRunes] = useState([]);
  const [items, setItems] = useState([]);
  const [version, setVersion] = useState();

  const tagIcons = {
    Fighter: GiBattleAxe,
    Assassin: GiPlainDagger,
    Marksman: GiBowArrow,
    Mage: GiSpellBook,
    Tank: GiShield,
    Support: GiAngelWings,
  };

  const getVersion = async () => {
    try {
      const response = await axios.get(versionApiURL);
      const latest = response.data[0];
      setVersion(latest);
    } catch (error) {
      console.log(error);
    }
  };

  const getChampions = async () => {
    try {
      getVersion();
      const res = await axios.get(
        `${baseApiURL}${version}/data/en_US/champion.json`
      );
      setChampions(Object.values(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getRunes = async () => {
    try {
      getVersion();
      const res = await axios.get(
        `${baseApiURL}${version}/data/en_US/runesReforged.json`
      );
      setRunes(Object.values(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async () => {
    try {
      getVersion();
      const res = await axios.get(
        `${baseApiURL}${version}/data/en_US/item.json`
      );
      setItems(Object.values(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChampions();
    getRunes();
    getItems();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/lolguides/champions"
          element={
            <ChampionsList
              champions={champions}
              version={version}
              baseApiURL={baseApiURL}
              tagIcons={tagIcons}
            />
          }
        />
        <Route
          path="/lolguides/champions/:champId"
          element={
            <ChampionDetails
              champions={champions}
              version={version}
              baseApiURL={baseApiURL}
              tagIcons={tagIcons}
            />
          }
        />
        <Route
          path="/lolguides/new"
          element={
            <GuideForm champions={champions} runes={runes} items={items} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
