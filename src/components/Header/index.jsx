import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css"

function Header({allContries}) {
  const [countriesSearch, setCountriesSearch] = useState([])
  const [contryInSearch, setContryInSearch] = useState(null)
  console.log(allContries)
  const handleSearchChange = (e) => {
    if (e.target.value === '') {
      setCountriesSearch([])
      setContryInSearch(null)
      return
    }

    const resultArr = allContries.filter((item) => String(item.name.common).toLowerCase().includes(e.target.value.toLowerCase()))

    resultArr.length === 1 ? resultArr[0].name.common.toLowerCase() === e.target.value.toLowerCase() ? setContryInSearch(resultArr[0]) : setContryInSearch(null) :
    // if(resultArr.length === 1){
    //   if(resultArr[0].name.common.toLowerCase() === e.target.value.toLowerCase()){
    //     setContryInSearch(resultArr[0])
    //   }
    //   else{
    //     setContryInSearch(null)
    //   }
    // }

    console.log(resultArr)
    setCountriesSearch(resultArr)
  };

  return (
    <>
      <div className="header header_container">
        <div className="logo">
          <Link to={"/"}>COUNTRIES LIST</Link>
        </div>
        <div className="input_box">
        <input placeholder="Enter country name" onChange={handleSearchChange} list="countries" type="text" />
          <Link to={ contryInSearch === null ? '' : `/about/${contryInSearch.cca2}`}>
            <button className = {contryInSearch === null ? 'submit' : 'submit active'}>SUBMIT</button>
          </Link>
        </div>
        <datalist id="countries">
          {countriesSearch.map((item) => (
            <option key={item.name.common} value={item.name.common}></option>
          )
            
          )}
        </datalist>
      </div>
    </>
  );
}

export default Header;
