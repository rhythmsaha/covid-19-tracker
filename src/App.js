import { useState } from "react";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

function App() {
  const [country, setCountry] = useState("worldwide");

  const countryChangeHandler = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide" ? "" : "";
  };

  return (
    <div className="grid lg:grid-cols-12 p-6 gap-10 max-w-7xl mx-auto">
      <div className="lg:col-span-8">
        <Header country={country} onCountryChange={countryChangeHandler} />

        <div className="grid md:grid-cols-3 gap-6">
          <InfoBox title="Coronavirus Cases" cases="123" total="2000" />
          <InfoBox title="Recovered" cases="1234" total="3000" />
          <InfoBox title="Deaths" cases="12345" total="4000" />
        </div>

        <Map />
      </div>

      <div className="lg:col-span-4 shadow-md w-full rounded-xl overflow-hidden bg-white">
        <div className=" h-96"></div>
        {/* Table */}
        {/* Graph */}
      </div>
    </div>
  );
}

export default App;
