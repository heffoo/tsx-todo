import React, {useEffect} from "react";
import "./star.css";
import "./starsjs.js"
import {spawnStars} from './starsjs'
export const Stars = () => {

  useEffect(() => {
    spawnStars();
  }, [])
  return <div className="starsForm"><div id="kek"></div><div className="circle"></div> </div>;
};
