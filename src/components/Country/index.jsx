import React from "react";
import { Link } from "react-router-dom";
import "./Country.css";

function Country({country}) {
  return (
    <>
      <div className="country_box">
        <p>{country.name.common}</p>
        <img src={country.flags.png} alt="" />
      </div>
    </>
  );
}

export default Country;
