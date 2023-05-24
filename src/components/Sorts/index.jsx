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
  const [flagSortAB, setFlagSortAB] = useState(false);
  const [flagSortId, setFlagSortId] = useState(false);
  const [activeButton, setActiveButtonSort] = useState(null);
  const [activeContinent, setActiveContinent] = useState(null);
  const [activeSubRegion, setActiveSubRegion] = useState(null);
  const sortAlph = () => {
    setActiveButtonSort(1);
    setFlagSortAB(!flagSortAB);
    if (flagSortAB) {
      const tmpCountries = allContries.sort((a, b) => {
        if (a.name.common > b.name.common) return -1;
        if (a.name.common < b.name.common) return 1;
        return 0;
      });
      setCountries([...tmpCountries]);

      const tmp = (filtredCountries.length === 0
        ? allContries
        : filtredCountries
      ).sort((a, b) => {
        if (a.name.common > b.name.common) return -1;
        if (a.name.common < b.name.common) return 1;
        return 0;
      });
      setFiltred([...tmp]);
    } else {
      const tmpCountries = allContries.sort((a, b) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
      });
      setCountries([...tmpCountries]);


      const tmp = (filtredCountries.length === 0
        ? allContries
        : filtredCountries
      ).sort((a, b) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
      });
      setFiltred([...tmp]);
    }
  };
  const resetCountries = () => {
    const tmp = allContries.sort(function(a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    setCountries(tmp);
  };
  const sortId = () => {
    setActiveButtonSort(2);
    setFlagSortId(!flagSortId);
    if (flagSortId) {
      const tmpCountries = allContries.sort((a, b) => a.id - b.id);
      setCountries([...tmpCountries]);
      const tmpFiltredCountries = filtredCountries.length === 0 ? [] : filtredCountries.sort((a, b) => a.id - b.id);
      setFiltred([...tmpFiltredCountries]);
    } else {
      const tmpCountries = allContries.sort((a, b) => b.id - a.id);
      setCountries([...tmpCountries]);
      const tmpFiltredCountries =
        filtredCountries.length === 0
          ? []
          : filtredCountries.sort((a, b) => b.id - a.id);
      setFiltred([...tmpFiltredCountries]);
    }
  };
  const resetSort = () => {
    resetCountries();
    activeSubRegion === null
      ? sortContinents(activeContinent)
      : sortSubRegions(activeSubRegion, activeContinent);
    setFlagSortId(false);
    setFlagSortAB(false);
    setActiveButtonSort(null);
  };
  const resetFilter = () => {
    setFiltred(allContries);
    setActiveContinent(null);
    setActiveSubRegion(null);
  };
  const sortContinents = (continent) => {
    const tmp = (activeContinent != null
      ? allContries
      : filtredCountries.length === 0
      ? allContries
      : filtredCountries
    ).filter((item) => String(item.continents) === String(continent));

    setActiveContinent(continent);
    setCurrentPage(1);
    setFiltred(tmp);
    setActiveSubRegion(null);
  };
  const sortSubRegions = (subRegion, continent) => {
    if (activeSubRegion !== null) {
      sortContinents(activeContinent);
    }
    const tmp = allContries.filter(
      (item) =>
        String(item.subregion) === String(subRegion) &&
        String(item.continents) === String(continent)
    );
    setActiveSubRegion(subRegion);
    setCurrentPage(1);
    setFiltred(tmp);
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
                  onClick={() => sortContinents(item)}
                  key={item}
                  className={`btn ${
                    item === activeContinent ? "active_btn" : ""
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="subregions_filter">
            <p className="subregions">
              {activeContinent != null && "SUBREGIONS"}
            </p>
            <div className="subregions_btns">
              {activeContinent != null &&
                Array.from(regions[activeContinent]).map(
                  (item) =>
                    item !== undefined && (
                      <div
                        onClick={() => sortSubRegions(item, activeContinent)}
                        key={item}
                        className={`btn ${
                          item === activeSubRegion ? "active_btn" : ""
                        }`}
                      >
                        {item}
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </div>
      ;
      <div className="btnsSort_container">
        <div
          className={`btn ${activeButton === 1 ? "active_btn" : ""}`}
          onClick={() => sortAlph()}
        >
          Sort {flagSortAB ? "A-UA" : "UA-A"}
        </div>
        <div
          className={`btn ${activeButton === 2 ? "active_btn" : ""}`}
          onClick={() => sortId()}
        >
          Sort by index {flagSortId ? "↓" : "↑"}
        </div>
        <div className={`btn`} onClick={() => resetSort()}>
          Reset sort
        </div>
      </div>
      <div className="btnsSort_container">
        <div className="btn" onClick={() => setIsOpenPanel(!isOpenPanel)}>
          {isOpenPanel ? "Close filter" : "Open filter"}
        </div>
        <div
          className="btn"
          onClick={
            activeContinent !== null
              ? () => resetFilter()
              : () => setActiveContinent(null)
          }
        >
          Reset filter
        </div>
        <div className="chosen_filter_box">
          {activeContinent !== null && (
            <div className="chosen_filter">{activeContinent}</div>
          )}
          {activeSubRegion !== null && (
            <div className="chosen_filter red">{activeSubRegion}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sorts;
