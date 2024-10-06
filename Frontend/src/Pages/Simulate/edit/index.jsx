import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios";
import Calculator from "../../../components/Calculator";


export default function Edit () {
  const [initial_value, setInitialValue] = useState(0);
  const [value_per_month, setValuePerMonth] = useState(0);
  const [rate, setRate] = useState(0);
  const [months, setMonths] = useState(0);
  const [result, setResult] = useState(0);
  const {id} = useParams();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`simulate/edit/${id}`)
        if (response.status === 200) {
          setInitialValue(parseFloat(response.data.simulate.initial_value))
          setValuePerMonth(parseFloat(response.data.simulate.value_per_month))
          setRate(parseFloat(response.data.simulate.rate))
          setMonths(parseFloat(response.data.simulate.months) / 12)
          setResult(parseFloat(response.data.simulate.result))

        }

      } catch (error) {
        setError(error.response.data.error)
        navigate('/simulate/index')
      }

    }
    fetchData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault()

    axiosClient.put(`/simulate/update/${id}`, {
      id: `${id}`,
      initial_value,
      value_per_month,
      rate,
      months,
      result,
    })
    .then((response) => {
      navigate('/simulate/index')
    })
    .catch((error) => {
      setError(error.response.data.error)
    })
  }

  return (
    <>
     <div className="container">
      {success && <div style={{ color: 'green' }}><p>{success}</p></div>}
      {error && <div style={{ color: 'red' }}><p>{error}</p></div>}
      <h1>Editar Simulação</h1>

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
          <div className="submit">
            <button type="submit" id="submit">Salvar</button>
          </div>
        </form>
     </div>
    </>
  )
}