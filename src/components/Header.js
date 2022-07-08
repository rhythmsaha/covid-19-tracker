import { useEffect, useState } from "react";

const Header = ({ country, onCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  return (
    <header className="flex justify-between items-center mb-5">
      <h1 className="text-xl font-bold">COVID-19 TRACKER</h1>

      <form>
        <select
          id="countries"
          className="border outline-none p-3 w-40 block:"
          value={country}
          onChange={onCountryChange}
        >
          <option value="worldwide">Worldwide</option>
          {countries.map(({ name, value }) => (
            <option value={value} key={name}>
              {name}
            </option>
          ))}

          {/* <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option> */}
        </select>
      </form>
    </header>
  );
};
export default Header;
