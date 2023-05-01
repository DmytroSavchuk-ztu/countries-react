import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Home.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Country from "../../components/Country";

function Home() {
  const [contriesList, setContriesList] = useState([]);
  const [contriesListSerch, setContriesListSerch] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((result) => {
        setContriesList(result);
        setContriesListSerch(result);
      });
  }, []);

  const handleSearchChange = (e) => {
    if (!e.target.value) return setContriesListSerch(contriesList)

    const resultArr = contriesList.filter(item => item.name.common.toLowerCase().includes(e.target.value.toLowerCase()))

    setContriesListSerch(resultArr)
  };

  return (
    <>
      <Header />
      <input type="text" id="search" onChange={handleSearchChange} />
      <div className="container">
        <div className="countries_container">
          {contriesListSerch.map((item) => (
            <Link key={item.name.common} to="/about">
              {" "}
              <Country country={item} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
