import React, { useState } from "react";
import Calculator from "../components/Calculator";
import "./style/home.css";
import HomeHeader from "../components/Header/home/home";

export default function Home () {
  const [initial_value, setInitialValue] = useState([])
  const [value_per_month, setValuePerMonth] = useState([])
  const [rate, setRate] = useState([])
  const [months, setMonths] = useState([])
  const [result, setResult] = useState([])

  return (
    <>
      <HomeHeader />
      
      <section className="container">
        <h1>Faça Simulação</h1>

        <Calculator
          initial_value={initial_value}
          setInitialValue={setInitialValue}
          value_per_month={value_per_month}
          setValuePerMonth={setValuePerMonth}
          rate={rate}
          setRate={setRate}
          months={months}
          setMonths={setMonths}
          result={result}
          setResult={setResult}
        />
      </section>

    </>
  )
}