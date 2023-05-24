import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import "./CountriesWithOneLanguage.css";
import Header from "../../components/Header";
import axios, { all } from "axios";
import CountriesList from "../Home/CountriesList";
import Pagination from "../../components/Pagination";
import Sorts from "../../components/Sorts";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

function CountriesWithOneLanguage() {
  const { langName } = useParams();
  const [allContries, setAllCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum"))
  );
  const [languageName, setLanguageName] = useState('')
  const [filtredCountries, setFiltredCountries] = useState([]);
  const [countItems, setCountItems] = useState(10);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [regions, setRegions] = useState({});
  const countPages = Math.ceil(
    filtredCountries.length === 0
      ? allContries.length / countItems
      : filtredCountries.length / countItems
  );
    const navigate = useNavigate()
  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = (filtredCountries.length === 0
    ? allContries
    : filtredCountries
  ).slice(firstCountryIndex, lastCountryIndex);

  const paginate = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem("pageNum", page);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("countries") !== "null") {
        const allContriesList = JSON.parse(localStorage.getItem("countries"));
        setAllCountries(allContriesList);
        const filteredCountries = allContriesList.filter(
          (country) => country.languages && country.languages[langName]
        );
        const tmp = filteredCountries.reduce((acc, country) => {
          const { continents, subregion } = country;
          if (acc[continents]) {
            acc[continents].add(subregion);
          } else {
            acc[continents] = new Set([subregion]);
          }
          return acc;
        }, {});
        setRegions(tmp);
        setLanguageName(filteredCountries[0].languages[langName])
        setAllCountries(filteredCountries);
        return;
      }
      try {
        const result = await axios("http://46.101.96.179/all");
        const resultId = result.data.map((item, i) => {
          return { ...item, id: i + 1 };
        });
        const filteredCountries = resultId.filter(
          (country) => country.languages && country.languages[langName]
        );
        const tmp = filteredCountries.reduce((acc, country) => {
          const { continents, subregion } = country;
          if (acc[continents]) {
            acc[continents].add(subregion);
          } else {
            acc[continents] = new Set([subregion]);
          }
          return acc;
        }, {});
        setRegions(tmp);
        setAllCountries(filteredCountries);
      } catch {
        setAllCountries([]);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header
        allContries={allContries}
        headerText={`COUNTRIES THAT SPEAKS ${languageName.toUpperCase()}`}
      />
      <div className="container">
        <div className={`main_content ${isOpenPanel ? "shifted" : ""}`}>
          <button
            className="button"
            onClick={() => navigate(-1)}
          >{`<=BACK`}</button>
          <Link className="button" to="/">
            <button className="">go back to list</button>
          </Link>
          <Sorts
            allContries={allContries}
            setCountries={setAllCountries}
            filtredCountries={filtredCountries}
            setFiltred={setFiltredCountries}
            setCurrentPage={setCurrentPage}
            isOpenPanel={isOpenPanel}
            setIsOpenPanel={setIsOpenPanel}
            regions={regions}
          ></Sorts>
          <div className="contries">
            <CountriesList contriesOnPage={currentCountry} />
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={countPages}
          onPageChange={paginate}
        />
      </div>
    </>
  );
}

export default CountriesWithOneLanguage;
