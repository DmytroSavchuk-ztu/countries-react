import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./ContryInfo.css";

function CountryInfo({ chosenCountry }) {
    const [showTrans, setShowTrans] = useState(false);

    const getCurrencies = chosenCountry?.currencies ? Object.keys(chosenCountry.currencies) : [];
    const getLanguages = chosenCountry?.languages ? Object.keys(chosenCountry.languages) : [];
    const getNativeNames = chosenCountry?.name?.nativeName
        ? Object.keys(chosenCountry.name.nativeName)
        : [];
    const getCarSigns = chosenCountry?.car?.signs ? Object.keys(chosenCountry.car.signs) : [];
    const giniKey = chosenCountry?.gini ? Object.keys(chosenCountry.gini)[0] : null;

    const renderList = (list) => {
        return list.length > 0
            ? list.map((item, index) => (
                <span key={index}>
            {item}
                    {index < list.length - 1 && ", "}
          </span>
            ))
            : "-";
    };

    const renderLinkButtons = (list, pathPrefix) => {
        return list.length > 0
            ? list.map((item) => (
                <Link key={item} to={`/about/${chosenCountry.cca2}/${pathPrefix}/${item}`}>
                    <button>{chosenCountry.languages[item]}</button>
                </Link>
            ))
            : "-";
    };

    return (
        <>
            <div className="container_info_about_country">
                <div className="country_information_box">
                    <div className="flags_block">
                        <img className="flags" src={chosenCountry?.flags?.png} alt="Flag" />
                    </div>
                    <div className="country_information">
                        <div className="name_country">{chosenCountry?.name?.common}</div>
                        <div className="tab_buttons">
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
                            {!showTrans ? (
                                <div className="info">
                                    <div>
                                        <p>
                                            Native names: <span>{renderList(getNativeNames.map((item) => chosenCountry.name.nativeName[item].common))}</span>
                                        </p>
                                        <p>
                                            Population: <span>{chosenCountry?.population ?? "-"}</span>
                                        </p>
                                        <p>
                                            Region: <span>{chosenCountry?.region ?? "-"}</span>
                                        </p>
                                        <p>
                                            Sub Region: <span>{chosenCountry?.subregion ?? "-"}</span>
                                        </p>
                                        <p>
                                            Capital: <span>{chosenCountry?.capital ?? "-"}</span>
                                        </p>
                                    </div>
                                    <div className="languages">
                                        <p>
                                            Currencies:{" "}
                                            <span>{renderList(getCurrencies.map((item) => `${chosenCountry.currencies[item].name} (${chosenCountry.currencies[item].symbol})`))}</span>
                                        </p>
                                        <p>
                                            Languages:{" "}
                                            <span>{renderLinkButtons(getLanguages, "langCountries")}</span>
                                        </p>
                                        <p>
                                            Status: <span>{chosenCountry?.status ?? "-"}</span>
                                        </p>
                                        <p>
                                            Independent: <span>{chosenCountry?.independent ? "yes" : "no"}</span>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="info">
                                    <div>
                                        <p>
                                            UN member: <span>{chosenCountry?.unMember ? "yes" : "no"}</span>
                                        </p>
                                        <p>
                                            Land locked: <span>{chosenCountry?.landlocked ? "yes" : "no"}</span>
                                        </p>
                                        <p>
                                            Car signs: <span>{renderList(getCarSigns.map((item) => chosenCountry.car.signs[item]))}</span>
                                        </p>
                                        <p>
                                            Car side: <span>{chosenCountry?.car?.side ?? "-"}</span>
                                        </p>
                                        <p>
                                            Fifa: <span>{chosenCountry?.fifa ?? "-"}</span>
                                        </p>
                                        <p>
                                            Idd root: <span>{chosenCountry?.idd?.root ?? "-"}</span>
                                        </p>
                                        <p>
                                            Idd suffixes:{" "}
                                            <span>{renderList(chosenCountry?.idd?.suffixes ?? [])}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            Start of week: <span>{chosenCountry?.startOfWeek ?? "-"}</span>
                                        </p>
                                        <p>
                                            Area: <span>{chosenCountry?.area ?? "-"}</span>
                                        </p>
                                        <p>
                                            Timezones:{" "}
                                            <span>{renderList(chosenCountry?.timezones ?? [])}</span>
                                        </p>
                                        <p>
                                            Gini index: <span>{chosenCountry?.gini?.[giniKey] ?? "-"}</span>
                                        </p>
                                        <p className="coat_photo">
                                            Coat of arms:{" "}
                                            {chosenCountry?.coatOfArms?.png ? (
                                                <img src={chosenCountry.coatOfArms.png} alt="Coat of arms" />
                                            ) : (
                                                "-"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div className="borders">
                                <p>
                                    Neighboring countries:{" "}
                                    {chosenCountry?.borders?.length
                                        ? chosenCountry.borders.map((item) => (
                                            <Link key={item} to={`/about/${item}`}>
                                                <button>{item}</button>
                                            </Link>
                                        ))
                                        : "-"}
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
