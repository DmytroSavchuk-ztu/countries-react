import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Sorts.css";

function Sorts({
                 allContries,
                 setCountries,
                 filtredCountries,
                 setFiltred,
                 setCurrentPage,
                 isOpenPanel,
                 setIsOpenPanel,
                 regions,
               }) {
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeButton, setActiveButtonSort] = useState(null);
  const [activeContinent, setActiveContinent] = useState(null);
  const [activeSubRegion, setActiveSubRegion] = useState(null);

  const toggleSortOrder = (order) => (order === "asc" ? "desc" : "asc");

  const handleSort = (type, order) => {
    setActiveButtonSort(type);
    const sortedCountries = (filtredCountries.length === 0 ? allContries : filtredCountries)
        .slice()
        .sort((a, b) => {
          if (type === "name") {
            return order === "asc"
                ? a.name.common.localeCompare(b.name.common)
                : b.name.common.localeCompare(a.name.common);
          }
          return order === "asc" ? a.id - b.id : b.id - a.id;
        });

    setCountries(sortedCountries);
    setFiltred(sortedCountries);
  };

  const resetCountries = () => {
    setCountries(allContries.slice().sort((a, b) => a.id - b.id));
  };

  const resetSort = () => {
    resetCountries();
    if (activeContinent !== null) {
      sortByContinent(activeContinent);
    } else if (activeSubRegion !== null) {
      sortBySubRegion(activeSubRegion, activeContinent);
    }
    setSortOrder("asc");
    setActiveButtonSort(null);
  };

  const resetFilter = () => {
    setFiltred(allContries);
    setActiveContinent(null);
    setActiveSubRegion(null);
  };

  const sortByContinent = (continent) => {
    const filteredByContinent = (filtredCountries.length === 0 ? allContries : filtredCountries)
        .filter((item) => item.continents === continent);

    setActiveContinent(continent);
    setCurrentPage(1);
    setFiltred(filteredByContinent);
    setActiveSubRegion(null);
  };

  const sortBySubRegion = (subRegion, continent) => {
    const filteredBySubRegion = allContries.filter(
        (item) => item.subregion === subRegion && item.continents === continent
    );

    setActiveSubRegion(subRegion);
    setCurrentPage(1);
    setFiltred(filteredBySubRegion);
  };

  return (
      <div>
        <div className={`panel ${isOpenPanel ? "open" : ""}`}>
          <div onClick={() => setIsOpenPanel(false)} className="closeModal"></div>
          <div className="btnsFilter_container">
            <div className="continents_filter">
              <p className="continents">CONTINENTS</p>
              <div className="continents_btns">
                {Object.keys(regions).map((item) => (
                    <div
                        key={item}
                        onClick={() => sortByContinent(item)}
                        className={`btn ${item === activeContinent ? "active_btn" : ""}`}
                    >
                      {item}
                    </div>
                ))}
              </div>
            </div>
            <div className="subregions_filter">
              <p className="subregions">{activeContinent ? "SUBREGIONS" : ""}</p>
              <div className="subregions_btns">
                {activeContinent &&
                    regions[activeContinent].map(
                        (item) =>
                            item && (
                                <div
                                    key={item}
                                    onClick={() => sortBySubRegion(item, activeContinent)}
                                    className={`btn ${item === activeSubRegion ? "active_btn" : ""}`}
                                >
                                  {item}
                                </div>
                            )
                    )}
              </div>
            </div>
          </div>
        </div>

        <div className="btnsSort_container">
          <div
              className={`btn ${activeButton === 1 ? "active_btn" : ""}`}
              onClick={() => {
                setSortOrder(toggleSortOrder(sortOrder));
                handleSort("name", sortOrder);
              }}
          >
            Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </div>
          <div
              className={`btn ${activeButton === 2 ? "active_btn" : ""}`}
              onClick={() => {
                setSortOrder(toggleSortOrder(sortOrder));
                handleSort("id", sortOrder);
              }}
          >
            Sort by index {sortOrder === "asc" ? "↑" : "↓"}
          </div>
          <div className="btn" onClick={resetSort}>
            Reset sort
          </div>
        </div>

        <div className="btnsSort_container">
          <div className="btn" onClick={() => setIsOpenPanel(!isOpenPanel)}>
            {isOpenPanel ? "Close filter" : "Open filter"}
          </div>
          <div className="btn" onClick={resetFilter}>
            Reset filter
          </div>
          <div className="chosen_filter_box">
            {activeContinent && <div className="chosen_filter">{activeContinent}</div>}
            {activeSubRegion && <div className="chosen_filter red">{activeSubRegion}</div>}
          </div>
        </div>
      </div>
  );
}

export default Sorts;
