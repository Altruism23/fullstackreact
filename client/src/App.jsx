import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Layout from "./layout";
import Login from "./pages/login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/user";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const getData = async () => {
    try {
      if (!token) {
        return;
      }
      const { data } = await axios.get("/profile", {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (data) {
        dispatch(setUser(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
