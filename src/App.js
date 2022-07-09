import { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Map from "./components/Map";
import Table from "./components/Table";

function App() {
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  // console.log(countryInfo);

  const countryChangeHandler = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };

  useEffect(() => {
    const url =
      country === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${country}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, [country]);

  return (
    <div className="grid lg:grid-cols-12 p-6 gap-10 max-w-7xl mx-auto">
      <div className="lg:col-span-8">
        <Header
          country={country}
          onCountryChange={countryChangeHandler}
          setTableData={setTableData}
        />

        <div className="grid md:grid-cols-3 gap-6">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map />
      </div>

      <div className="lg:col-span-4 shadow-md w-full rounded-xl overflow-hidden bg-white">
        <div className="p-4">
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />

          <h3>World wide new cases</h3>
          <LineGraph />
        </div>
      </div>
    </div>
  );
}

export default App;
