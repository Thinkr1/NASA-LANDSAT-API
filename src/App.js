import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import axios from "axios";
import config from "./config.js";
import "./styles.css";
import 'leaflet/dist/leaflet.css'

function Eimg() {
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [dim, setDim] = useState("");
  const [date, setDate] = useState("");
  const [imgData, setImgData] = useState(null);
  const [mapCenter, setMapCenter] = useState([45.4, -75.7]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/earth/assets?lon=${lon || mapCenter[1]}&lat=${lat || mapCenter[0]}&date=${date}&dim=${dim}&api_key=${config.NASA_API_KEY}`
      );
      console.log(`https://api.nasa.gov/planetary/earth/assets?lon=${lon || mapCenter[1]}&lat=${lat || mapCenter[0]}&date=${date}&dim=${dim}`)
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
        <input type="number" placeholder="Longitude (optional)" value={lon} onChange={(e) => setLon(e.target.value)}/>
        <input type="number" placeholder="Latitude (optional)" value={lat} onChange={(e) => setLat(e.target.value)}/>
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
      <footer><small>Created by Pierre-Louis Manchuelle--Lambré</small></footer>
    </div>
  );
}

export default Eimg;
