import React from "react";
import Login from "./Login";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Specialization = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  return <>{!user ? <Login /> : <main>Specialization</main>}</>;
};

export default Specialization;
