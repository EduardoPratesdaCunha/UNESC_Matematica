import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios";
import "./style.css";
import TButton from "../../../components/core/TButton";
import { useNavigate } from "react-router-dom";

export default function Index () {
  const [simulates, setSimulates] = useState([]);
  const [initialValue, setInitialValue] = useState([]);
  const [valuePerMonth, setValuePerMonth] = useState([]);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get('simulate/index');

      setSimulates(response.data.simulates);
      setInitialValue(response.data.initialValue);
      setValuePerMonth(response.data.valuePerMonth);
      setResult(response.data.result);
      if (response.status != 200) {
        setError("Confere os Logs");
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  const destroy = (e, id) => {
    e.preventDefault();

    axiosClient.delete(`/simulate/destroy/${id}`)
      .then((response) => {
        if (response.data) {
          setSuccess(response.data);
        }
        window.location.reload();
      })
      .catch((error) => {
        if (error.response?.data) {
          setError(error.response.data);
        }
      });
  };


  return (
    <>
      <section className="simulation-container">
        {success && (<div style={{ color: 'green' }}><p>{success?.success}</p></div>)}
        {error && (<div style={{ color: 'red' }}><p>{error?.error}</p></div>)}

        <h1>Lista de Simulados</h1>

        <table className="simulation-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Valor Inicial</th>
              <th>Valor Mensal</th>
              <th>Taxa</th>
              <th>Tempo</th>
              <th>Resultado</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total</td>
              <td>{initialValue}</td>
              <td>{valuePerMonth}</td>
              <td></td>
              <td></td>
              <td>{result}</td>
              <td></td>
              <td></td>
            </tr>

            {simulates.map((simulate, num) => (
              <tr key={simulate.id}>
                <td>{`#0${num+1}`}</td>
                <td>{simulate.initial_value}</td>
                <td>{simulate.value_per_month}</td>
                <td>{simulate.rate}</td>
                <td>{simulate.months} <small>anos</small></td>
                <td>{simulate.result}</td>
                <td>{simulate.created_at}</td>
                <td>
                  <span className="container--btn">
                    <TButton to={`/simulate/edit/${simulate.id}`}>Editar</TButton>

                    <form onSubmit={(e) => destroy(e, simulate.id)}>
                      <TButton>Excluir</TButton>
                    </form>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );

}