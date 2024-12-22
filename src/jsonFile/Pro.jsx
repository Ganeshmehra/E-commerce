import React, { useEffect } from 'react';
// import arr from "./data1"
import arr from "./Jsonfile.json";
import Pro2 from './Pro2';

const Pro = ({ second, setsecond }) => {
  useEffect(() => {
    // Check if data is already in localStorage
    if (!localStorage.getItem("update-data")) {
      // Store the JSON data in localStorage
      localStorage.setItem("update-data", JSON.stringify(arr));
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <>
      <Pro2 second={second} setsecond={setsecond} />
    </>
  );
}

export default Pro;
