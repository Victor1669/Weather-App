import { useState } from "react";
import ClimateImages from "../climate-condition.json";

export default function App() {
  const [day, setDay] = useState("Monday");

  const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="App">
      <header>
        <h1 className="logo">Weather Now</h1>
        <div
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="false"
          className="unitsDropbox generalBackground"
          tabIndex="0"
        >
          <img width={14} src="/images/icon-units.svg" alt="" />
          <span>Units</span>
          <img width={14} src="/images/icon-dropdown.svg" alt="" />
        </div>
        <h2 className="subtitle">How's the sky looking today?</h2>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div role="searchbox" className="searchBar generalBackground">
            <label className="searchLabel" htmlFor="searchInput">
              <img src="/images/icon-search.svg" />
            </label>
            <input
              placeholder="Search for a place..."
              type="text"
              id="searchInput"
            />
          </div>
          <button className="searchButton">Search</button>
        </form>
        <section className="sectionLocation">
          <div className="locationDataContainer">
            <header>
              <h3>Location</h3>
              <p>Date</p>
            </header>
            <div className="locationClimateData" role="complementary">
              <img
                width={100}
                src={ClimateImages[7]?.image}
                alt={ClimateImages[7]?.alt}
              />
              <span>NUM</span>
            </div>
          </div>
          <ul className="locationDataListComplementary" role="group">
            <li className="locationData generalBackground">
              <span>[TITLE]</span> <span>[DATA]</span>
            </li>
            <li className="locationData generalBackground">
              <span>[TITLE]</span> <span>[DATA]</span>
            </li>
            <li className="locationData generalBackground">
              <span>[TITLE]</span> <span>[DATA]</span>
            </li>
            <li className="locationData generalBackground">
              <span>[TITLE]</span> <span>[DATA]</span>
            </li>
          </ul>
        </section>
        <section className="dailyForecast">
          <h3>Daily forecast</h3>
          <ul className="dailyListForecast" role="group">
            <li className="dailyData generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="minMax">[MIN] [MAX]</span>
            </li>
            <li className="dailyData generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="minMax">[MIN] [MAX]</span>
            </li>
            <li className="dailyData generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="minMax">[MIN] [MAX]</span>
            </li>
            <li className="dailyData generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="minMax">[MIN] [MAX]</span>
            </li>
            <li className="dailyData generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="minMax">[MIN] [MAX]</span>
            </li>
            <li className="dailyData generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="minMax">[MIN] [MAX]</span>
            </li>
            <li className="dailyData generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="minMax">[MIN] [MAX]</span>
            </li>
          </ul>
        </section>
        <aside className="hourlyForecast generalBackground">
          <header className="hourlyHeader">
            <h3>Hourly forecast</h3>
            <div
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded="false"
              className="daysDropbox"
              tabIndex="0"
            >
              <span>{day}</span>
              <img width={14} src="/images/icon-dropdown.svg" alt="" />
            </div>
          </header>
          <ul className="hourlyListForecast" role="group">
            <li className="hourlyData">
              [IMAGE] [HOUR] <span>[DEGREE]</span>
            </li>
            <li className="hourlyData">
              [IMAGE] [HOUR] <span>[DEGREE]</span>
            </li>
            <li className="hourlyData">
              [IMAGE] [HOUR] <span>[DEGREE]</span>
            </li>
            <li className="hourlyData">
              [IMAGE] [HOUR] <span>[DEGREE]</span>
            </li>
            <li className="hourlyData">
              [IMAGE] [HOUR] <span>[DEGREE]</span>
            </li>
            <li className="hourlyData">
              [IMAGE] [HOUR] <span>[DEGREE]</span>
            </li>
            <li className="hourlyData">
              [IMAGE] [HOUR] <span>[DEGREE]</span>
            </li>
            <li className="hourlyData">
              [IMAGE] [HOUR] <span>[DEGREE]</span>
            </li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
