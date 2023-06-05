import React, {} from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./ContryInfo.css"

function CountryInfo({chosenCountry}) {

    const [showTrans, setShowTrans] = useState(false);

    const currenciesKeys = chosenCountry.currencies === undefined ? null : Object.keys(chosenCountry.currencies);
    const langKeys = Object.keys(chosenCountry.languages === undefined ? [] : chosenCountry.languages);
    const nativeNames = Object.keys(chosenCountry.name.nativeName === undefined ? [] : chosenCountry.name.nativeName);
    const carSigns = Object.keys(chosenCountry.car.signs === undefined ? [] : chosenCountry.car.signs)
    const giniKey = Object.keys(chosenCountry.gini === undefined ? [] : chosenCountry.gini)[0]
  return (
    <>
      <div className="container_info_about_country">
        <div className="country_information_box">
          <div className="flags_block">
            <img className="flags" src={chosenCountry.flags.png}></img>
          </div>
          <div className="country_information">
            <div className="name_country">{chosenCountry.name.common}</div>
            <div className={`tab_buttons`}>
              <div
                onClick={() => setShowTrans(!showTrans)}
                className={`tab_btn ${!showTrans ? "active_tab_btn" : ""}`}
              >
                General info
              </div>
              <div
                onClick={() => setShowTrans(!showTrans)}
                className={`tab_btn ${showTrans ? "active_tab_btn" : ""}`}
              >
                Interesting info
              </div>
            </div>
            <div className="info_block">
              {!showTrans && (
                <div className="info">
                  <div>
                    <p>
                      Native names:{" "}
                      <span>
                        {nativeNames.map(
                          (item, index) =>
                            `${chosenCountry.name.nativeName[item].common}${
                              nativeNames[index + 1] === undefined ? "" : ","
                            } `
                        )}
                      </span>
                    </p>
                    <p>
                      Population:{" "}
                      <span>
                        {chosenCountry.population === undefined
                          ? "-"
                          : chosenCountry.population}
                      </span>
                    </p>
                    <p>
                      Region:{" "}
                      <span>
                        {chosenCountry.region === undefined
                          ? "-"
                          : chosenCountry.region}
                      </span>
                    </p>
                    <p>
                      Sub Region:{" "}
                      <span>
                        {chosenCountry.subregion === undefined
                          ? "-"
                          : chosenCountry.subregion}
                      </span>
                    </p>
                    <p>
                      Capital:{" "}
                      <span>
                        {chosenCountry.capital === undefined
                          ? "-"
                          : chosenCountry.capital}
                      </span>
                    </p>
                  </div>
                  <div className="languages">
                    <p>
                      Curiencies:{" "}
                      <span>
                        {currenciesKeys === null
                          ? "-"
                          : currenciesKeys.map(
                              (item, index) =>
                                `${chosenCountry.currencies[item].name}(${
                                  chosenCountry.currencies[item].symbol
                                })${
                                  currenciesKeys[index + 1] === undefined
                                    ? ""
                                    : ","
                                } `
                            )}
                      </span>
                    </p>
                    <p>
                      Languages:{" "}
                      <span>
                        {langKeys.map((item, index) => (
                          <Link
                            key={item}
                            onClick={() => sessionStorage.setItem("pageNumLang", 1)}
                            to={`/about/${chosenCountry.cca2}/langCountries/${item}`}
                          >
                            <button>{chosenCountry.languages[item]}</button>
                          </Link>
                        ))}
                      </span>
                    </p>
                    <p>
                      Status: <span>{chosenCountry.status}</span>
                    </p>
                    <p>
                      Independent:{" "}
                      <span>{chosenCountry.independent ? "yes" : "no"}</span>
                    </p>
                  </div>
                </div>
              )}
              {showTrans && (
                <div className="info">
                  <div>
                    <p>
                      UN member:{" "}
                      <span>{chosenCountry.unMember ? "yes" : "no"}</span>
                    </p>
                    <p>
                      Land locked:{" "}
                      <span>{chosenCountry.landlocked ? "yes" : "no"}</span>
                    </p>
                    <p>
                      Car signs:{" "}
                      <span>
                        {carSigns.map(
                          (item, index) =>
                            `${chosenCountry.car.signs[item]}${
                              carSigns[index + 1] === undefined ? "" : ","
                            } `
                        )}
                      </span>
                    </p>
                    <p>
                      Car side: <span>{chosenCountry.car.side}</span>
                    </p>
                    <p>
                      Fifa: <span>{chosenCountry.fifa}</span>
                    </p>
                    <p>
                      Idd root: <span>{chosenCountry.idd.root}</span>
                    </p>
                    <p>
                      Idd suffixes: <span>{chosenCountry.idd.suffixes.map(
                          (item, index) =>
                            `${item}${
                              chosenCountry.idd.suffixes[index + 1] === undefined ? "" : ","
                            } `
                        )}</span>
                    </p>
                  </div>
                  <div className="">
                    <p>
                      Start of week: <span>{chosenCountry.startOfWeek}</span>
                    </p>
                    <p>
                      Area: <span>{chosenCountry.area}</span>
                    </p>
                    <p>
                      Timezones: <span>{chosenCountry.timezones.map(
                          (item, index) =>
                            `${item}${
                              chosenCountry.timezones[index + 1] === undefined ? "" : ","
                            } `
                        )}</span>
                    </p>
                    <p>
                      Gini index: <span>{chosenCountry.gini[giniKey]}</span>
                    </p>
                    <p className="coat_photo">
                      Coat of arms:{" "}
                      {chosenCountry.coatOfArms.png === undefined ? (
                        "-"
                      ) : (
                        <img src={`${chosenCountry.coatOfArms.png}`} alt="" />
                      )}{" "}
                    </p>
                  </div>
                </div>
              )}

              <div className="borders">
                <p>
                  Neighboring countries:{" "}
                  {chosenCountry.borders === undefined
                    ? "-"
                    : chosenCountry.borders.map((item) => (
                        <Link key={item} to={`/about/${item}`}>
                          <button>{item}</button>
                        </Link>
                      ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
export default CountryInfo;