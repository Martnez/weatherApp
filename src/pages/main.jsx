import React, { useState, useEffect } from "react";
import Axios from "axios";
import sun from "../Images/icons8-sun-48.png";
import Humidity from "../Images/icons8-humidity-64.png";
import Wind from "../Images/icons8-wind-65.png";
import Clouds from "../Images/icons8-clouds-100.png";
import { Images } from "../components/Input";
import { Input } from "../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { faThermometerThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import ReactApexChart from "react-apexcharts";

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
  const labels = [
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12noon",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
  ];

  const HumidityWind = {
    series: [
      {
        name: "Wind Speed",
        type: "area",
        data: day_windspeed,
      },
      {
        name: "Humidity",
        type: "line",
        data: day_relativehumidity,
      },
    ],
    options: {
      chart: {
        height: "auto",
        type: "line",
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 4],
      },
      xaxis: {
        categories: labels,
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#008FFB",
          },
          labels: {
            style: {
              colors: "#008FFB",
            },
          },
          title: {
            text: "Wind Speed",
            style: {
              color: "#008FFB",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: "Day Humidity",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#00E396",
          },
          labels: {
            style: {
              colors: "#00E396",
            },
          },
          title: {
            text: "Day Humidity",
            style: {
              color: "#00E396",
            },
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };
  const tempCloud = {
    series: [
      {
        name: "Temparature",
        type: "column",
        data: day_temperature_2m,
      },
      {
        name: "Cloud Cover",
        type: "line",
        data: day_cloudcover,
      },
    ],
    options: {
      chart: {
        height: "auto",
        type: "line",
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [0, 4],
      },
      xaxis: {
        categories: labels,
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#008FFB",
          },
          labels: {
            style: {
              colors: "#008FFB",
            },
          },
          title: {
            text: "Temparature",
            style: {
              color: "#008FFB",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: "Cloud Cover",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#00E396",
          },
          labels: {
            style: {
              colors: "#00E396",
            },
          },
          title: {
            text: "Cloud Cover",
            style: {
              color: "#00E396",
            },
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };

  return (
    <div className="container">
      <div className="main">
        <div className="main-nav">
          <div className="logo">
            <h1 className="logo-text">
              Cy-<span>Weather</span>
            </h1>
          </div>
          <ul className="nav-lists">
            <li className="nav-list">
              <a href="" className="nav-link active">
                Home
              </a>
            </li>
            <li className="nav-list">
              <a href="" className="nav-link">
                About
              </a>
            </li>
          </ul>
        </div>
        <div className="content-sections">
          <div className="content-col inputs">
            <h1 className="inputs-header">
              The Only Weather Forecast You Need
              <span></span>
            </h1>
            <div className="location-section">
              <div className="location-group">
                <label htmlFor="" className="location-label">
                  Longitude
                </label>
                <Input
                  value={longitude}
                  name="longitude"
                  onChange={setLongitude}
                />
              </div>
              <div className="location-group">
                <label htmlFor="" className="location-label">
                  Latitude
                </label>
                <Input
                  value={latitude}
                  name="latitude"
                  onChange={setLatitude}
                />
              </div>
            </div>
          </div>
          <div className="content-col">
            <div className="header-panel">
              <div className="header-brand">
                <h1 className="greeting">
                  {greetings}
                  <span>
                    <FontAwesomeIcon icon={faCloudSunRain} />
                  </span>
                </h1>
                <p className="header-text">
                  Get the latest weather updates timely and efficiently with
                  CyWeather Systems.
                </p>
                <p className="powered">
                  Powered by <span>Cytonn</span>
                </p>
              </div>
            </div>
            <div className="charts">
              <div className="chart-info">
                <h2 className="chart-title">Temparature &amp; Cloud Cover</h2>
                <ReactApexChart
                  series={tempCloud.series}
                  options={tempCloud.options}
                  type="line"
                  height={350}
                  className="temp-chart"
                />
              </div>
              <div className="chart-info">
                <h2 className="chart-title">Humidity &amp; Wind Speed</h2>
                <ReactApexChart
                  series={HumidityWind.series}
                  options={HumidityWind.options}
                  type="line"
                  height={350}
                  className="temp-chart"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
