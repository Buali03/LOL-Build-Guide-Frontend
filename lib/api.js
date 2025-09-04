import axios from "axios";

const backendServerURL = import.meta.env.VITE_BACK_END_SERVER_URL;

const allLOLGuide = async () => {
  const token = localStorage.getItem("token");
  try {
    const url = `${backendServerURL}/lolguides`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const showLOLGuide = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${backendServerURL}/lolguides/${id}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createLOLGuide = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${backendServerURL}/lolguides/create`;
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const updateLOLGuide = async (id, data) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${backendServerURL}/lolguides/${id}`;
    const response = await axios.put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteLOLGuide = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const url = `${backendServerURL}/lolguides/${id}`;
    const response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export {
  allLOLGuide,
  showLOLGuide,
  createLOLGuide,
  updateLOLGuide,
  deleteLOLGuide,
};
