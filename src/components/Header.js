import { useEffect, useState } from "react";
import { sortData } from "../helper/utils";

const Header = ({
  country,
  onCountryChange,
  setTableData,
  setMapCountries,
}) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            countryInfo: country.countryInfo,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };

    getCountriesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="flex justify-between items-center mb-5">
      <h1 className="text-xl font-bold">COVID-19 TRACKER</h1>

      <form>
        <select
          id="countries"
          className="border outline-none p-3 w-40 block:"
          value={country}
          onChange={(e) => onCountryChange(e, countries)}
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
