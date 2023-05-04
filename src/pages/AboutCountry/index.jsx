import React, { useEffect, useState } from "react";
import "../../App.css";
import "../Home/Home.css";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";

function AboutCountry() {
  const { nameCountry } = useParams();
  const [country, setCountry] = useState();

  useEffect(
    () => async () => {
      try {
        const result = await axios(
          `https://restcountries.com/v3.1/name/${nameCountry}`
        );
        setCountry(result.data[0]);
      } catch {
        setCountry("Error");
      }
    },
    [nameCountry]
  );

  return (
    <>
      <Header />
      About
      <Link to="/"> Home page</Link>
      {/* <div>{country.name.common}</div> */}
    </>
  );
}

export default AboutCountry;
