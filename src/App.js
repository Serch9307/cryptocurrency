import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import axios from "axios";
import Quote from "./components/Quote";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [currency, setCurrency] = useState("");
  const [cryptocurrency, setCryptocurrency] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    // show Spinner
    setLoading(true);

    // call the api to get the quote
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;

    const result = await axios.get(url);

    setTimeout(() => {
      setResult(result.data.DISPLAY[cryptocurrency][currency]);
      // hide Spinner
      setLoading(false);
    }, 5000);
  };

  useEffect(() => {
    // to avoid execution the first time
    if (currency === "" || cryptocurrency === "") {
      return;
    }
    // call the api to get the quote
    callApi();
  }, [currency, cryptocurrency]);

  return (
    <Container>
      <div>
        <Imagen src={imagen} alt="crypto imagen" />
      </div>
      <div>
        <Heading>Instant cryptocurrency quote!</Heading>
        <Form setCurrency={setCurrency} setCryptocurrency={setCryptocurrency} />
        {loading ? <Spinner /> : <Quote result={result} />}
      </div>
    </Container>
  );
}

export default App;
