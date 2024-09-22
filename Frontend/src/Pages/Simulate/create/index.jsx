import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Calculator from "../../../components/Calculator";
import axiosClient from "../../../axios";
import './style.css';

export default function Create() {
  const [initial_value, setInitialValue] = useState(0);
  const [value_per_month, setValuePerMonth] = useState(0);
  const [rate, setRate] = useState(0);
  const [months, setMonths] = useState(0);
  const [result, setResult] = useState(0);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient.post("/simulate/store", {
        initial_value,
        value_per_month,
        rate,
        months,
        result,
      });

      setSuccess(response.data.success);
      navigate("/simulate/index");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response ? error.response.data.message : "An unexpected error occurred.");
    }
  };

  return (
    <>
      <section className="container">
        {success && <div style={{ color: 'green' }}><p>{success}</p></div>}
        {error && <div style={{ color: 'red' }}><p>{error}</p></div>}

        <h1>Criar Simulação</h1>

        <form onSubmit={onSubmit} >
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

          <button type="submit" id="submit">Salvar</button>
        </form>
      </section>
    </>
  )
}
