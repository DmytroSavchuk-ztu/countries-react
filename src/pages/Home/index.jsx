import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Home.css";
import Header from "../../components/Header";
import axios, { all } from "axios";
import CountriesList from "./CountriesList";
import Pagination from "../../components/Pagination";

function Home() {
  const [allContries, setAllCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum"))
  );
  const [filtredCountries, setFiltredCountries] = useState([]);
  const [countItems, setCountItems] = useState(10);
  const [flagSortAB, setFlagSortAB] = useState(false)

  const countPages = allContries.length / countItems;

  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = (filtredCountries.length === 0 ? allContries : filtredCountries).slice(firstCountryIndex, lastCountryIndex);

  const paginate = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem("pageNum", page);
  };

  const sortAlph = () => {
    setFlagSortAB(!flagSortAB);
    if (flagSortAB){
            const tmp = allContries.sort(function(a, b) {
              if (a.name.common < b.name.common) {
                return 1;
              }
              if (a.name.common > b.name.common) {
                return -1;
              }
              return 0;
            });
    }
    else {
            const tmp = allContries.sort(function(a, b) {
              if (a.name.common < b.name.common) {
                return -1;
              }
              if (a.name.common > b.name.common) {
                return 1;
              }
              return 0;
            });
    }
    setFiltredCountries(tmp);
  };
  useEffect(
    () => async () => {
      try {
        const result = await axios("https://restcountries.com/v3.1/all");

        const resultId = result.data.map((item, i) => {
          return { ...item, id: i + 1 };
        });

        setAllCountries(resultId);
      } catch {
        setAllCountries("Error");
      }
    },
    []
  );

  return (
    <>
      <Header allContries={allContries} />
      <div className="container">
        <div className="btnsSort_container">
          <div onClick={() => sortAlph()}>Sort A-UA</div>
        </div>
        <div className="contries">
          <CountriesList contriesOnPage={currentCountry} />
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

export default Home;
