import { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Map from "./components/Map";
import Table from "./components/Table";
import "leaflet/dist/leaflet.css";

function App() {
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [mapzoom, setMapzoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);

  const countryChangeHandler = async (e, data) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    if (countryCode !== "worldwide") {
      const cc = data.filter((c) => c.countryInfo.iso2 === countryCode);
      const latlong = cc[0].countryInfo;
      const cntr = [latlong.lat, latlong.long];
      setMapCenter(cntr);
      setMapzoom(4);
    } else {
      setMapCenter([0, 0]);
      setMapzoom(2);
    }
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
          setMapCountries={setMapCountries}
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

        <Map zoom={mapzoom} center={mapCenter} countries={mapCountries} />
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
