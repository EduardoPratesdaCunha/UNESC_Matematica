import React from "react";
import { useStateContext } from "../context/ContexProvider";

export default function Calculator({
  initial_value, setInitialValue,
  value_per_month, setValuePerMonth,
  rate, setRate,
  months, setMonths,
  result, setResult,
}) {
  const { userToken } = useStateContext();

  const calculateResult = () => {
    let monthsValue = months * 12;
    let rateValue = (rate / 100) / 12;

    let resultValue = initial_value * Math.pow((1 + rateValue), monthsValue);

    if (value_per_month > 0) {
      const result2 = value_per_month * (Math.pow((1 + rateValue), monthsValue) - 1) / rateValue;
      resultValue += result2;
    }

    setResult(resultValue.toFixed(2));
  }

  return (
    <>
      <div className="container--calculate">
        <div className="container__field">
          <div>
            <label>Valor Inicial</label>
            <input className=""
              type="number"
              value={initial_value}
              onChange={(e) => setInitialValue(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Valor Adicional Mensal</label>
            <input className=""
              type="number"
              value={value_per_month}
              onChange={(e) => setValuePerMonth(parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div className="container__field">
          <div>
            <label>Taxa de Juros Anual (%)</label>
            <input className=""
              type="number"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Número de Períodos (Anos)</label>
            <input className=""
              type="number"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            id="btnCalculate"
            onClick={calculateResult}
          >
            Calcular
          </button>
        </div>
        <div className="container__field" id="result">
          <div>
            <label>Resultado</label>
            <input
              type="number"
              value={result}
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  )
}
