import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useCurrency from "../hooks/useCurrency";
import useCryptocurrency from "../hooks/useCryptocurrency";
import axios from "axios";
import Error from "./Error";

const Botton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Form = ({ setCurrency, setCryptocurrency }) => {
  // Cryptocurrency list State
  const [listCrypto, setListCrypto] = useState([]);
  // Error State
  const [error, setError] = useState(false);

  // array Currencies
  const CURRENCIES = [
    { code: "USD", name: "United State Dollar" },
    { code: "MXN", name: "Mexican Pesos" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "Pound Sterling" },
  ];

  // use useCurrency
  const [currency, SelectCurrency] = useCurrency(
    "Choose your currency!",
    "",
    CURRENCIES
  );

  // use useCryptocurrency
  const [cryptocurrency, SelectCrypto] = useCryptocurrency(
    "Choose your chryptocurrency!",
    "",
    listCrypto
  );

  const callApi = async () => {
    const url =
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
    const result = await axios.get(url);
    setListCrypto(result.data.Data);
  };

  // call Api Crytocurrency
  useEffect(() => {
    callApi();
  }, []);

  // when the user execute the submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validating Currency and Cryptocurrency
    if (currency === "" || cryptocurrency === "") {
      setError(true);
      return;
    }
    setError(false);

    // send the information to principal component
    setCurrency(currency);
    setCryptocurrency(cryptocurrency);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error message="All fields are required" /> : null}
      <SelectCurrency />
      <SelectCrypto />
      <Botton type="submit" value="Calc" />
    </form>
  );
};

export default Form;
