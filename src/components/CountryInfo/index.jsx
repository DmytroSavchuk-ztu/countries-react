import React, {} from "react";
import "./ContryInfo.css"

function CountryInfo({chosenCountry}) {

  return (
    <>
       <div className="aboutCountry">
            <div className="flag">
              <img
                src={chosenCountry.flags.png}
                alt={chosenCountry.flags.alt}
              />
            </div>
            <div className="country_name">
              <p>name: {chosenCountry.name.common}</p>
              <p>capital: {chosenCountry.capital}</p>
              <p>population: {chosenCountry.population}</p>
              <p>region: {chosenCountry.region}</p>
            </div>
          </div>
    </>
  );

}
export default CountryInfo;