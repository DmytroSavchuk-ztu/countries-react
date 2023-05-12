import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./AboutCountry.css"
import Header from "../../components/Header";
import axios from "axios";
import CountryMap from "../../components/CountryMap";
import CountryInfo from "../../components/CountryInfo";
import Poroshenko from "../../components/Poroshenko";

function AboutCountry() {

  const { indexCountry } = useParams();
  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [showInfoAboutCountry, setShowInfoAboutCountry] = useState(true)
  const [showCountryMap, setShowCountryMap] = useState(false)
  let showDiv;

  useEffect(
    () => async () => {
      try {
        const result = await axios("https://restcountries.com/v3.1/all");

        setAllCountries(result.data);
      } catch {
        setAllCountries("Error");
      }
    },
    []
  );
  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await axios(
          `https://restcountries.com/v3.1/alpha/${indexCountry}`
        );
        setCountry(response.data[0]);
      } catch {
        setCountry("Error");
      }
    }
    fetchCountry();
  }, [indexCountry]);

  if (!country) {
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
  if (country === "Error") {
    return (
      <div className="message_box">
        <div className="error">
          <img
            src="https://digitalsynopsis.com/wp-content/uploads/2016/12/http-status-codes-dogs.jpg"
            alt=""
          />
        </div>
      </div>
    );
  }
  if (indexCountry === "RUS" || indexCountry === "RU"){
    return <Poroshenko/>
  }

  if (showInfoAboutCountry){
    showDiv = <CountryInfo chosenCountry={country}></CountryInfo>
  }
  if (showCountryMap){
    showDiv = <CountryMap chosenCountry={country}></CountryMap>

  }

  return (
    <>
      <Header allContries={allCountries}/>
      <div className="buttons">
        <Link className="goBack" to="/"><button className="button_">go back to list</button></Link>
        <button onClick={() => {setShowCountryMap(false); setShowInfoAboutCountry(true)}} className={showInfoAboutCountry? "button_ active":'button_'}>information about country</button>
        <button onClick={() => {setShowCountryMap(true); setShowInfoAboutCountry(false)}} className={showCountryMap? "button_ active":'button_'}>show country on map</button>
      </div>
      {showDiv}
    </>
  );
}

export default AboutCountry;
