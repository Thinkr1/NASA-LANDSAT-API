import React, { useState } from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import axios from "axios";
import config from "./config.js";
import "./styles.css";

function Eimg() {
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [dim, setDim] = useState("")
  const [date, setDate] = useState("");
  const [imgData, setImgData] = useState(null)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&&dim=${dim}&api_key=${config.NASA_API_KEY}`)
      setImgData(response.data)
    } catch (err) {
      console.error("Error fetching data: ", err)
    }
  }

  return (
    <div className="container">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Add Marker if needed */}
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Longitude" value={lon} onChange={(e) => setLon(e.target.value)}/>
        <input type="number" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)}/>
        <input type="text" placeholder="Date (yyyy-mm-dd)" value={date} onChange={(e) => setDate(e.target.value)} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
        {/* <input type="range" min="0.025" max="0.2" value={dim} onChange={(e) => setDim(e.target.value)} /> */}
        <input type="number" placeholder="Dimensions" value={dim} onChange={(e) => setDim(e.target.value)} />
        <button className="submit-btn" type="Submit">Submit</button>
      </form>
      {imgData && <img src={imgData.url} alt="" className="img"/>}
    </div>
  );
}

export default Eimg;
