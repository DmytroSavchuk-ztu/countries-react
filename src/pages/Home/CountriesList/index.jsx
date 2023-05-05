import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CountriesList.css";

function CountriesList({ contriesOnPage, allContries }) {
  const [showDiv, setShowDiv] = useState({
    isVisible: false,
    object: null,
  });
  const [countriesSearch, setCountriesSearch] = useState([])

  const handleMouseEnter = (id) => {
    setShowDiv({
      isVisible: true,
      object: contriesOnPage.find((item) => item.id === id),
    });
  };
  const handleMouseLeave = () => {
    setShowDiv({
      isVisible: false,
      object: null,
    });
  };
  const handleSearchChange = (e) => {
    if (e.target.value === '') return setCountriesSearch([])

    const resultArr = allContries.filter(item => item.name.common.toLowerCase().includes(e.target.value.toLowerCase()))

    setCountriesSearch(resultArr)
  };
  return (
    <>
      <div className="countries_container">
        {contriesOnPage.map((item) => (
          <Link
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave()}
            key={item.name.common}
            to={`/about/${item.name.common}`}
          >
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
      <div className="aboutCountry_container">
        <input onChange={handleSearchChange} list="countries" type="text" />
        <datalist id="countries">
          {countriesSearch.map((item) => (
            <option key={item.name.common} value={item.name.common}></option>
          )
            
          )}
        </datalist>
        {showDiv.isVisible && (
          <div className="aboutCountry">
            <div className="flag">
              <img
                src={showDiv.object.flags.png}
                alt={showDiv.object.flags.alt}
              />
            </div>
            <div className="country_name">
              <p>name: {showDiv.object.name.common}</p>
              <p>capital: {showDiv.object.capital}</p>
              <p>population: {showDiv.object.population}</p>
              <p>region: {showDiv.object.region}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CountriesList;
