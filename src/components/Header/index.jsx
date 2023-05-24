import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css"

function Header({allContries, headerText, isOpenPanel}) {
  const [countriesSearch, setCountriesSearch] = useState([])
  const [contryInSearch, setContryInSearch] = useState(null)
  const handleSearchChange = (e) => {
    if (e.target.value === '') {
      setCountriesSearch([])
      setContryInSearch(null)
      return
    }

    const resultArr = allContries.filter((item) => String(item.name.common).toLowerCase().startsWith(e.target.value.toLowerCase()))

    resultArr.length === 1 ? resultArr[0].name.common.toLowerCase() === e.target.value.toLowerCase() ? setContryInSearch(resultArr[0]) : setContryInSearch(null) :

    setCountriesSearch(resultArr)
  };

  return (
    <>
      <div className={`header header_container`}>
        <div className={`logo ${isOpenPanel ? "shifted_logo" : ""}`}>
          {headerText}
        </div>
        <div className="input_box">
          <input
            placeholder="Enter country name"
            onChange={handleSearchChange}
            list="countries"
            type="text"
          />
          <Link
            to={contryInSearch === null ? "" : `/about/${contryInSearch.cca3}`}
          >
            <button
              className={contryInSearch === null ? "submit" : "submit active"}
            >
              <img src="https://images.vexels.com/media/users/3/143436/isolated/preview/d9be9586ae36ea50337870fec296eb79-desenhos-animados-de-lupa.png" alt="" />
            </button>
          </Link>
        </div>
        <datalist id="countries">
          {countriesSearch.map((item) => (
            <option key={item.name.common} value={item.name.common}></option>
          ))}
        </datalist>
      </div>
    </>
  );
}

export default Header;
