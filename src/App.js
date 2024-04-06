import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "./config.js";
import "./styles.css";

function Eimg() {
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [date, setDate] = useState("");
  const [imgData, setImgData] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&&dim=0.10&api_key=${config.NASA_API_KEY}`)
        setImgData(response.data)
      } catch (err) {
        console.error("Error fetching data: ", err)
      }
    }
    fetchData()
  }, [lon, lat,date])

  return (
    <div className="container">
      <form>
        <input type="number" placeholder="Longitude" value={lon} onChange={(e) => setLon(e.target.value)}/>
        <input type="number" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)}/>
        <input type="text" placeholder="Date (yyyy-mm-dd)" value={date} onChange={(e) => setDate(e.target.value)} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
      </form>
      {imgData && <img src={imgData.url} alt=""/>}
    </div>
  );
}

export default Eimg;
