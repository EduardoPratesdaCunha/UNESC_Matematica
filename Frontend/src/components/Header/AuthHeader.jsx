import React from "react";
import { useStateContext } from "../../context/ContexProvider";
import TButton from "../core/TButton";
import axiosClient from '../../axios';
import "./style.css"
import { Navigate } from "react-router-dom";

const AuthHeader = () => {
  const { setCurrentUser, setUserToken } = useStateContext();
  const { userToken } = useStateContext();

  // if (!userToken) {
  //   return <Navigate to="/home" />
  // }

  const Logout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout");

    setCurrentUser({});
    setUserToken(null);
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USER');
    window.location.reload();
  }

  return (
    <>
      <header>
        <h1>Proto. Invest</h1>

        <ul>
          <li><TButton to="/simulate/index">Lista de Simulação</TButton></li>
          <li><TButton to="/simulate/create">Nova Simulação</TButton></li>
        </ul>
        <form className="form--logout" onClick={Logout}>
          <button className="submit" type="submit">
            Logout
          </button>
        </form>
      </header>

    </>
  )
}

export default AuthHeader;