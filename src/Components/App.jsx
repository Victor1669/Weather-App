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
      <header id="Header">
        <h1 className="h-logo">Weather Now</h1>
        <div
          className="h-dropbox generalBackground"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="false"
          tabIndex="0"
        >
          <img width={14} src="/images/icon-units.svg" alt="" />
          <span>Units</span>
          <img width={14} src="/images/icon-dropdown.svg" alt="" />
        </div>
        <h2 className="h-subtitle">How's the sky looking today?</h2>
      </header>
      <div id="SearchBar" className="generalBackground" role="searchbox">
        <label className="s-label" htmlFor="SearchInput">
          <img src="/images/icon-search.svg" />
        </label>
        <input
          className="s-input"
          placeholder="Search for a place..."
          type="text"
          id="SearchInput"
        />
      </div>
      <button id="SearchButton" onClick={handleSubmit}>
        Search
      </button>
      <main id="Main">
        <section id="m-1-location-forecast">
          <div className="m-1-container">
            <header>
              <h3 className="m-1-location-name">Location</h3>
              <p>Date</p>
            </header>
            <div className="m-1-container-data" role="complementary">
              <img
                width={100}
                src={ClimateImages[7]?.image}
                alt={ClimateImages[7]?.alt}
              />
              <span className="m-1-data-number">NUM</span>
            </div>
          </div>
          <ul id="m-1-list" role="group">
            <li className="m-1-data generalBackground">
              <span>[TITLE]</span> <span>[DATA]</span>
            </li>
            <li className="m-1-data generalBackground">
              <span>[TITLE]</span> <span>[DATA]</span>
            </li>
            <li className="m-1-data generalBackground">
              <span>[TITLE]</span> <span>[DATA]</span>
            </li>
            <li className="m-1-data generalBackground">
              <span>[TITLE]</span> <span>[DATA]</span>
            </li>
          </ul>
        </section>
        <section id="m-2-daily-forecast">
          <h3>Daily forecast</h3>
          <ul id="m-2-list" role="group">
            <li className="m-2-data generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="m-2-min-max">[MIN] [MAX]</span>
            </li>
            <li className="m-2-data generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="m-2-min-max">[MIN] [MAX]</span>
            </li>
            <li className="m-2-data generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="m-2-min-max">[MIN] [MAX]</span>
            </li>
            <li className="m-2-data generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="m-2-min-max">[MIN] [MAX]</span>
            </li>
            <li className="m-2-data generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="m-2-min-max">[MIN] [MAX]</span>
            </li>
            <li className="m-2-data generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="m-2-min-max">[MIN] [MAX]</span>
            </li>
            <li className="m-2-data generalBackground">
              [DAY] <figure>[IMAGE]</figure>
              <span className="m-2-min-max">[MIN] [MAX]</span>
            </li>
          </ul>
        </section>
      </main>
      <aside id="Aside" className="generalBackground">
        <header className="a-header">
          <h3>Hourly forecast</h3>
          <div
            className="a-dropbox"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded="false"
            tabIndex="0"
          >
            <span>{day}</span>
            <img width={14} src="/images/icon-dropdown.svg" alt="" />
          </div>
        </header>
        <ul role="group">
          <li className="a-data">
            [IMAGE] [HOUR] <span>[DEGREE]</span>
          </li>
          <li className="a-data">
            [IMAGE] [HOUR] <span>[DEGREE]</span>
          </li>
          <li className="a-data">
            [IMAGE] [HOUR] <span>[DEGREE]</span>
          </li>
          <li className="a-data">
            [IMAGE] [HOUR] <span>[DEGREE]</span>
          </li>
          <li className="a-data">
            [IMAGE] [HOUR] <span>[DEGREE]</span>
          </li>
          <li className="a-data">
            [IMAGE] [HOUR] <span>[DEGREE]</span>
          </li>
          <li className="a-data">
            [IMAGE] [HOUR] <span>[DEGREE]</span>
          </li>
          <li className="a-data">
            [IMAGE] [HOUR] <span>[DEGREE]</span>
          </li>
        </ul>
      </aside>
    </div>
  );
}
