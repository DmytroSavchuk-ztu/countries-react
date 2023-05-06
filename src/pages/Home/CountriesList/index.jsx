import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CountriesList.css";

function CountriesList({ contriesOnPage, Contries }) {
  const [showDivAboutCountry, setShowDivAboutCountry] = useState({
    isVisible: false,
    object: null,
  });
  const [countriesSearch, setCountriesSearch] = useState([])
  const [contryInSearch, setContryInSearch] = useState(null)

  const handleMouseEnter = (id) => {
    setShowDivAboutCountry({
      isVisible: true,
      object: contriesOnPage.find((item) => item.id === id),
    });
  };
  const handleMouseLeave = () => {
    setShowDivAboutCountry({
      isVisible: false,
      object: null,
    });
  };
  const handleSearchChange = (e) => {
    if (e.target.value === '') {
      setCountriesSearch([])
      setContryInSearch(null)
      return
    }

    const resultArr = Contries.filter((item) => String(item.name.common).toLowerCase().includes(e.target.value.toLowerCase()))
    resultArr.length === 1 ? resultArr[0].name.common.toLowerCase() === e.target.value.toLowerCase() ? setContryInSearch(resultArr[0]) : setContryInSearch(null) :

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
            to={`/about/${item.cca2}`}
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
        <div className="input_box">
          <input placeholder="Enter country name" onChange={handleSearchChange} list="countries" type="text" />
          <Link to={ contryInSearch === null ? '' : `/about/${contryInSearch.cca2}`}>
            <button className= {`submit ${contryInSearch === null ? '' : 'active'}`}>SUBMIT</button>
          </Link>
        </div>
        <datalist id="countries">
          {countriesSearch.map((item) => (
            <option key={item.name.common} value={item.name.common}></option>
          )
            
          )}
        </datalist>
        {showDivAboutCountry.isVisible && (
          <div className="short_info_container">
            <div className="about_country">
              <div className="flag">
                <img
                  src={showDivAboutCountry.object.flags.png}
                  alt={showDivAboutCountry.object.flags.alt}
                />
              </div>
              <div className="country_short_info">
                <p>name: {showDivAboutCountry.object.name.common}</p>
                <p>capital: {showDivAboutCountry.object.capital}</p>
                <p>population: {showDivAboutCountry.object.population}</p>
                <p>region: {showDivAboutCountry.object.region}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CountriesList;
