import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import AboutCountry from "../pages/AboutCountry";
import CountriesWithOneLanguage from "../pages/CountriesWithOneLanguage";

function AppRouter() {
  sessionStorage.setItem("pageNum", 1);
  sessionStorage.setItem("pageNumLang", 1);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about/:indexCountry" element={<AboutCountry />} />
      <Route path="/about/:indexCountry/langCountries/:langName" element={<CountriesWithOneLanguage/>} />
    </Routes>
  );
}

export default AppRouter;
