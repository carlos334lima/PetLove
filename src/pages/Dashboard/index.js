import React, { useState } from "react";

import api from "../../service/api";

import "./style.css";

const Dashboard = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const [inputError, setInputError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const response = await api.get(`ws/${input}/json`);
      setData(response.data);

      console.log(response.data);
    } catch (error) {
      setInputError("Erro! Verifique o campo digitado.");
    }
  }

  return (
    <div>
      <div className="container-search">
        <form>
          <input
            type="number"
            placeholder="  000-000"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit" onClick={handleSubmit}>
            Buscar CEP
          </button>
        </form>
      </div>
      {!!inputError && <span className="hasError">{inputError}</span>}

      <div className="container-response">
        <div>
          <h1>CEP: </h1>
          <span>{data.cep}</span>
        </div>
        <div>
          <h1>Estado: </h1>
          <span>{data.uf}</span>
        </div>
        <div>
          <h1>Cidade: </h1>
          <span>{data.localidade}</span>
        </div>
        <div>
          <h1>Logradouro: </h1>
          <span>{data.logradouro}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
