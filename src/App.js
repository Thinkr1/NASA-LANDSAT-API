import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "./config.js";
import "./styles.css";

function Eimg() {
  
  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&&dim=0.10&api_key=${config.NASA_API_KEY}`)
  })

  return (
    <div className="container">
    </div>
  );
}

export default Eimg;
