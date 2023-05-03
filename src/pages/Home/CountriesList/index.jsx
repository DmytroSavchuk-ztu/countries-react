import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./CountriesList.css";

function CountriesList({allCountry}) {

  return (
    <>
      <div className="countries_container">
        {allCountry.map((item) => (
          <Link key={item.name.common} to="/about">
            <div className="country_box">
              <div className="index">{item.id}</div>
              <div className="country_info">
                <img src={item.flags.png} alt="" />
                <p>{item.name.common}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default CountriesList;
