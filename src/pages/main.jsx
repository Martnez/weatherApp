import React, { useState, useEffect } from "react";
import Axios from "axios";
import cloud from "../Images/icons8-sun-100.png";
import sun from "../Images/icons8-sun-48.png";
import Humidity from "../Images/icons8-humidity-64.png";
import Wind from "../Images/icons8-wind-65.png";
import Clouds from "../Images/icons8-clouds-100.png";
import { Image } from "../components/Input";
import { Images } from "../components/Input";
import { Input } from "../components/Input";
const Main = () => {
  const [latitude, setLatitude] = useState(-1.286389);
  const [longitude, setLongitude] = useState(36.817223);
  const [data, setData] = useState({
    hourly: {
      cloudcover: [53, 49, 71, 67, 65, 65, 37, 45, 39, 86, 62, 91, 69, 80],
      temperature_2m: [8, 7.8, 7.7, 8, 8.3, 10.4, 11.7, 13.3, 14.8, 16.2],
      windspeed_10m: [4.3, 3.9, 4.4, 4.3, 4.9, 6.1, 9.4, 11.3, 11.5, 9.9],
      relativehumidity_2m: [95, 95, 95, 92, 88, 78, 70, 67, 64, 257, 56, 5],
    },
  });

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,cloudcover,windspeed_10m`;
    Axios.get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, [latitude, longitude]);

  const day_cloudcover = data.hourly.cloudcover.slice(6, 19);
  const day_relativehumidity = data.hourly.relativehumidity_2m.slice(6, 19);
  const day_windspeed = data.hourly.windspeed_10m.slice(6, 19);
  const day_temperature_2m = data.hourly.temperature_2m.slice(6, 19);
  var today = new Date();
  var curHr = today.getHours();
  let greetings = "Good evening";
  if (curHr < 12) {
    greetings = "Good morning";
  }
  if (curHr < 18) {
    greetings = "Good afternoon";
  }
  return (
    <div className="container">
      <div
        className="main"
        style={{
          height: "100vh",
          backgroundImage: `url("https://picsum.photos/id/1015/1000/1000/?blur=2")`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="header">
          <div className="brand">
            <h1 style={{ cursor: "pointer" }}>Cyweather</h1>
          </div>

          <h4>{greetings}</h4>
          <Image name={cloud} height={"4rem"} width={"4rem"} />
        </div>
        <div className="inputSection">
          <label htmlFor="latitude">Latitude</label>
          <Input value={latitude} name="latitude" onChange={setLatitude} />

          <label htmlFor="longitude"> Longitude</label>
          <Input value={longitude} name="longitude" onChange={setLongitude} />
        </div>
        <div className="table-section">
          <table>
            <tr>
              <th>Name</th>
              <th>6 am</th>
              <th>7 am</th>
              <th>8 am</th>
              <th>9 am</th>
              <th>10 am</th>
              <th>11 am</th>
              <th>12 am</th>
              <th> 1 pm</th>
              <th>2 pm</th>
              <th>3 pm</th>
              <th>4 pm</th>
              <th>5 pam</th>
              <th>6 pm</th>
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h4>temp Celcius</h4>
                  <Images name={sun} />
                </div>
              </td>
              {day_temperature_2m.map((temp, index) => {
                return <td key={index}>{temp} </td>;
              })}
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h4>Wind Km/h</h4> <Images name={Wind} />
                </div>
              </td>
              {day_windspeed.map((wind, index) => {
                return <td key={index}>{wind}</td>;
              })}
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h4>Cloud Cover % coverage</h4> <Images name={Clouds} />
                </div>
              </td>
              {day_cloudcover.map((cloudcover, index) => {
                return <td key={index}>{cloudcover}</td>;
              })}
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h4>Humidity %relativity </h4> <Images name={Humidity} />
                </div>
              </td>
              {day_relativehumidity.map((relativehumidity, index) => {
                return <td key={index}>{relativehumidity}</td>;
              })}
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Main;
