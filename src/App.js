import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";
import config from "./config.js";
import "./styles.css";
// import "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css";
import 'leaflet/dist/leaflet.css'

function Eimg() {
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [dim, setDim] = useState("");
  const [date, setDate] = useState("");
  const [imgData, setImgData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&&dim=${dim}&api_key=${config.NASA_API_KEY}`
      );
      setImgData(response.data);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  return (
    <div className="container">
      <div className="map-container">
        <MapContainer center={[45.4, -75.7]} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
        />
        <input
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date (yyyy-mm-dd)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        />
        <input
          type="number"
          placeholder="Dimensions"
          value={dim}
          onChange={(e) => setDim(e.target.value)}
        />
        <button className="submit-btn" type="Submit">
          Submit
        </button>
      </form>
      {imgData && <img src={imgData.url} alt="" className="img" />}
    </div>
  );
}

export default Eimg;
