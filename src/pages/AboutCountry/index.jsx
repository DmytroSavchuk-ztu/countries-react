import React from "react";
import "../../App.css";
import "../Home/Home.css";
import {Link} from "react-router-dom"
import Header from "../../components/Header";



function AboutCountry() {
  return (
    <>
      <Header/>
      About
      <Link to="/"> Home page</Link>
    </>
  );
}

export default AboutCountry;
