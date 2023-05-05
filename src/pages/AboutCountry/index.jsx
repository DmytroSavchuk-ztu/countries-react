import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./AboutCountry.css"
import Header from "../../components/Header";
import axios from "axios";
import CountryMap from "../../components/CountryMap";
import CountryInfo from "../../components/CountryInfo";

function AboutCountry() {
  const { nameCountry } = useParams();
  const [country, setCountry] = useState(null);
  const [showInfoAboutCountry, setShowInfoAboutCountry] = useState(true)
  const [showCountryMap, setShowCountryMap] = useState(false)
  let showDiv
  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await axios(
          `https://restcountries.com/v3.1/name/${nameCountry}`
        );
        setCountry(response.data[0]);
      } catch {
        setCountry("Error");
      }
    }
    fetchCountry();
  }, [nameCountry]);

  if (!country) {
    return <div>Loading...</div>;
  }
  if (country === "Error") {
    return <div>There was an error loading the country.</div>;
  }

  if (showInfoAboutCountry){
    showDiv = <CountryInfo chosenCountry={country}></CountryInfo>
  }
  if (showCountryMap){
    showDiv = <CountryMap chosenCountry={country}></CountryMap>

  }

  return (
    <>
      <Header />
      <div className="buttons">
        <Link className="goBack" to="/"><button className="button_">go back</button></Link>
        <button onClick={() => {setShowCountryMap(false); setShowInfoAboutCountry(true)}} className={showInfoAboutCountry? "button_ active":'button_'}>information about country</button>
        <button onClick={() => {setShowCountryMap(true); setShowInfoAboutCountry(false)}} className={showCountryMap? "button_ active":'button_'}>show country on map</button>
      </div>
      {showDiv}
    </>
  );
}

export default AboutCountry;
