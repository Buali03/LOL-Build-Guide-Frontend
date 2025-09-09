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

// league of legend components
import ChampionsList from "./components/lol/champions-list/champions-list";
import ChampionDetails from "./components/lol/champion-details/champion-details";
import GuideForm from "./components/lol/guide-form/guide-form";
import GuideList from "./components/lol/guide-list/guide-list";
import GuideDetails from "./components/lol/guide-details/guide-details";
import GuideEdit from "./components/lol/guide-edit/guide-edit";
import NavBar from "./components/NavBar/NavBar";

// user components
import LoginForm from "./components/user/login-form/login-form";
import SignUpForm from "./components/user/signup-form/signup-form";

const versionApiURL = import.meta.env.VITE_VERSION_API;
const baseApiURL = import.meta.env.VITE_BASE_API;

function App() {
  const [champions, setChampions] = useState([]);
  const [runes, setRunes] = useState([]);
  const [items, setItems] = useState([]);
  const [summonerSpells, setSummonerSpells] = useState([]);
  const [version, setVersion] = useState();

  // Auth:
  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLogin(newToken) {
    setToken(newToken);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
  }

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
      const res = await axios.get(
        `${baseApiURL}${version}/data/en_US/item.json`
      );
      const filteredItems = Object.values(res.data.data).filter((item) => {
        return item.gold.base > 500 && item.maps["11"] === true && !item.into;
      });
      setItems(filteredItems);
    } catch (error) {
      console.log(error);
    }
  };

  const getSummonerSpells = async () => {
    try {
      const res = await axios.get(
        `${baseApiURL}${version}/data/en_US/summoner.json`
      );
      const allSummoners = Object.values(res.data.data);
      const filteredSummonerSpells = allSummoners.filter((spell) =>
        [
          "SummonerFlash",
          "SummonerIgnite",
          "SummonerBarrier",
          "SummonerHeal",
          "SummonerGhost",
          "SummonerSmite",
          "SummonerTeleport",
          "SummonerExhaust",
          "SummonerCleanse",
        ].includes(spell.id)
      );
      setSummonerSpells(filteredSummonerSpells);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVersion();
    if (!version) return;
    getChampions();
    getRunes();
    getItems();
    getSummonerSpells();
  }, [version]);

  return (
    <Router>
      <NavBar token={token} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/user/login"
          element={<LoginForm onLogin={handleLogin} />}
        />
        <Route path="/user/signup" element={<SignUpForm />} />
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
            <GuideForm
              baseApiURL={baseApiURL}
              version={version}
              champions={champions}
              runes={runes}
              items={items}
              summonerSpells={summonerSpells}
            />
          }
        />
        <Route
          path="/lolguides/:guideId"
          element={<GuideDetails baseApiURL={baseApiURL} version={version} />}
        />
        <Route
          path="/lolguides/:guideId/edit"
          element={
            <GuideEdit
              version={version}
              baseApiURL={baseApiURL}
              champions={champions}
              items={items}
              runes={runes}
              summonerSpells={summonerSpells}
            />
          }
        />
        <Route
          path="/lolguides"
          element={<GuideList baseApiURL={baseApiURL} version={version} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
