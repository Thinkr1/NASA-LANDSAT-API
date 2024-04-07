import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import axios from "axios";
import config from "./config.js";
import "./styles.css";
import 'leaflet/dist/leaflet.css'

function Eimg() {
  const [dim, setDim] = useState("");
  const [date, setDate] = useState("");
  const [imgData, setImgData] = useState(null);
  const [mapCenter, setMapCenter] = useState([45.4, -75.7]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/earth/assets?lon=${mapCenter[1]}&lat=${mapCenter[0]}&date=${date}&dim=${dim}&api_key=${config.NASA_API_KEY}`
      );
      console.log(`https://api.nasa.gov/planetary/earth/assets?lon=${mapCenter[1]}&lat=${mapCenter[0]}&date=${date}&dim=${dim}`) // Removed API key from console.log for privacy reasons
      setImgData(response.data);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  useEffect(() => {
    const updateMapCenter = (event) => {
      const center = event.target.getCenter();
      setMapCenter([center.lat, center.lng]);
    };

    window.mapEvent = updateMapCenter;
  }, []);

  const SetMapCenter = () => {
    useMapEvent('move', window.mapEvent);
    return null;
  };

  return (
    <div className="container">
      <div className="map-container">
        <MapContainer center={mapCenter} zoom={12} scrollWheelZoom={true}>
          <SetMapCenter />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Date (yyyy-mm-dd)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        />
        <input
          type="number"
          placeholder="Dimensions (degrees)"
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
