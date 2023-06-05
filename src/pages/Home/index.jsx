import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Home.css";
import Header from "../../components/Header";
import axios, { all } from "axios";
import CountriesList from "./CountriesList";
import Pagination from "../../components/Pagination";
import Sorts from "../../components/Sorts";

function Home() {
  const [allContries, setAllCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum"))
  );
  const [filtredCountries, setFiltredCountries] = useState([]);
  const [countItems, setCountItems] = useState(10);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [regions, setRegions] = useState({});

  const countPages = Math.ceil(
    filtredCountries.length === 0
      ? allContries.length / countItems
      : filtredCountries.length / countItems
  );

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
      let allContriesList = [];
      if (localStorage.getItem("countries") !== "null") {
        allContriesList = JSON.parse(localStorage.getItem("countries"))
      }
      else{
        try {
          const result = await axios("http://46.101.96.179/all");
          allContriesList = result.data.map((item, i) => {
            if (item.languages && item.languages["de"]) {
              item.languages["deu"] = item.languages["de"];
              delete item.languages["de"];
            }
            return { ...item, id: i + 1 };
          });
          localStorage.setItem("countries", JSON.stringify(allContriesList));
        } catch {
          setAllCountries([]);
        }
      }
      const tmp = allContriesList.reduce((acc, country) => {
        const { continents, subregion } = country;
        if (acc[continents]) {
          acc[continents].add(subregion);
        } else {
          acc[continents] = new Set([subregion]);
        }
        return acc;
      }, {});
      setRegions(tmp)
      setAllCountries(allContriesList)
    };

    fetchData();
  }, []);
  if (allContries === null) {
    return (
      <div className="message_box">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Header allContries={allContries} headerText={"COUNTRIES LIST"} isOpenPanel={isOpenPanel} />
      <div className="container">
        <div className={`main_content ${isOpenPanel ? "shifted" : ""}`}>
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

export default Home;
