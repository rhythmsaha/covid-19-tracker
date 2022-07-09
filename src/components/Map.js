import { useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { showDataOnMap } from "../helper/utils";

const Map = ({ countries, caseType, center, zoom }) => {
  return (
    <div className="h-[500px]  p-4 rounded-2xl mt-8 shadow-md relative">
      <MapContainer
        scrollWheelZoom={false}
        center={[...center]}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showDataOnMap(countries, "cases")}
        <ChangeMapView coords={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
};
export default Map;

function ChangeMapView({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom);

  return null;
}
