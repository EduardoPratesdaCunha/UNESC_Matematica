import React, { useState } from "react";
import { useStateContext } from "../context/ContexProvider"
import axiosClient from "../axios";
import "../Pages/style/login.css"
import HomeHeader from "../components/Header/home/home";
import TButton from "../components/core/TButton";

export default function Login () {

  const { setCurrentUser, setUserToken } = useStateContext();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    setError({__html: ""});

    axiosClient.post("/login", {
      cpf,
      password
    })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          setError({ __html: finalErrors.join("<br>") });
        } else {
          setError({ __html: "Erro desconhecido." });
        }
        console.error(error);
      });
  };

  return (
    <>
      <HomeHeader />

      <div className="container">
        <h1>Faça seu login</h1>
        <form onSubmit={onSubmit} action="#">
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder='Digite seu CPF' />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Digite sua Senha' />
          <div>
            <TButton className="login__btn">Logar</TButton>
          </div>
        </form>

        <div className="container--buttons">
          <TButton className="login__btn" to="/register">Registrar-se</TButton>
          <TButton onClick={onSubmit} className="login__btn" id="btnBack" to="/">Voltar</TButton>
        </div>
      </div>
    </>
  )
}