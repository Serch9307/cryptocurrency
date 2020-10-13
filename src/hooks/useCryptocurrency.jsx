import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const SelectComponent = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  --webkit-appearance: none;
  border-radius: 5px;
  border: none;
  font-size: 1.2rem;
`;

const useCryptocurrency = (label, initialState, options) => {
  // State de nuestro custom hook
  const [state, updateState] = useState(initialState);

  const SelectCrypto = () => (
    <Fragment>
      <Label>{label}</Label>
      <SelectComponent
        onChange={(e) => updateState(e.target.value)}
        value={state}
      >
        <option value="">-- Select --</option>
        {options.map((option) => (
          <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>
            {option.CoinInfo.FullName}
          </option>
        ))}
      </SelectComponent>
    </Fragment>
  );
  // Return state, interface and function to update the state
  return [state, SelectCrypto, updateState];
};
export default useCryptocurrency;
