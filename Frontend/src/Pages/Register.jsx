import React, { useState } from "react";
import { useStateContext } from "../context/ContexProvider"
import axiosClient from "../axios";
import "../Pages/style/login.css"
import HomeHeader from "../components/Header/home/home";
import TButton from "../components/core/TButton";
import { useNavigate } from "react-router-dom";

export default function Register () {

  const { setCurrentUser, setUserToken } = useStateContext();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    axiosClient.post("/register", {
      name,
      email,
      cpf,
      password,
      password_confirmation
    })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        navigate('/login');
        setSuccess()
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          setError(finalErrors.join("<br>"));
        } else {
          setError("Erro desconhecido.");
        }
      });
  };

  return (
    <>
      <HomeHeader />
        {success && (<div style={{ color: 'green' }}><p>{success?.success}</p></div>)}
        {error && (<div style={{ color: 'red' }}><p dangerouslySetInnerHTML={{ __html: error }} /></div>)}

      <div className="container">
        <div>
          <h1>Faça seu login</h1>
          <form onSubmit={onSubmit} action="#">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu Nome" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu E-mail" />
            <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder='Digite seu CPF' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Digite sua Senha' />
            <input type="password" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder='Digite sua Senha' />

            <div>
              <button id="submit" type="submit">Registrar</button>
            </div>
          </form>
        </div>
        <div className="container--buttons">
          <TButton className="login__btn" to="/login">Logar</TButton>
          <TButton className="login__btn" id="btnBack" to="/">Voltar</TButton>
        </div>
      </div>
    </>
  )
}