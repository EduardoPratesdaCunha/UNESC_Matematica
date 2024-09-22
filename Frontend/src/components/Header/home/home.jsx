import React from "react";
import "./style.css"
import TButton from "../../core/TButton";

export default function HomeHeader () {
  return (
    <>
      <header>
        <h1>Proto. Invest</h1>

        <nav>
          <TButton to="/login">Login</TButton>
          <TButton to="#">Registre-se</TButton>
        </nav>

      </header>
    </>
  )
}

