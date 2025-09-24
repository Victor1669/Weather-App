import { useEffect, useState } from "react";

import Header, { HeaderButton, UnitsButton, UnitsMenu } from "./Header";
import SearchBar, { ResultsList, SearchButton, SearchInput } from "./SearchBar";
import Aside, {
  AsideDaysList,
  AsideHeader,
  AsideButton,
  LastFocusable,
  AsideDataList,
  ADataItem,
} from "./Aside";
import Main from "./Main/Main";
import Main1, { M1MainData, M1ComplementaryData, M1Data } from "./Main/Main1";
import Main2, { Main2List, M2LI } from "./Main/Main2";

export default function App() {
  /* HEADER */
  const [showUnitsBox, setShowUnitsBox] = useState(false);

  /* SEARCHBAR */
  const [query, setQuery] = useState("");
  // ARRAY OF LOCATIONS
  const [locationsList, setLocationsList] = useState([]);

  const [showResults, setShowResults] = useState(false);
  const [focusResults, setFocusResults] = useState(false);

  /* ASIDE */
  const actualDay = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const dayIndex =
    selectedDay - actualDay < 0
      ? selectedDay - actualDay === -1
        ? 6
        : 5
      : selectedDay - actualDay;

  const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [day, setDay] = useState(daysList[selectedDay - 1]);

  const [showDays, setShowDays] = useState(false);
  const [focusShowDays, setFocusShowDays] = useState(false);

  const [actualHour, setActualHour] = useState(
    Number(new Date().toLocaleTimeString().slice(0, 2))
  );
  const hoursList = Array.from({ length: 8 }, (_, i) => i);

  /* SEARCH */
  const [selectedPlace, setSelectedPlace] = useState({});

  const [timesSearched, setTimesSearched] = useState(0);

  /* DATA */
  const [units, setUnits] = useState("Metric");

  const [cityName, setCityName] = useState("City");
  const [countryName, setCountryName] = useState("Country");

  const [weatherData, setWeatherData] = useState({});
  const { current = {}, hourly = {}, daily = {} } = weatherData;
  const {
    apparent_temperature: tempFeel,
    temperature_2m: c_temp,
    wind_speed_10m: windSpeed,
    relative_humidity_2m: c_humidity,
    precipitation: c_prec,
    weather_code: c_code,
  } = current;
  const { temperature_2m: h_temp, weather_code: h_code } = hourly;
  const {
    temperature_2m_max: temp_max,
    temperature_2m_min: temp_min,
    weather_code: d_code,
  } = daily;

  const dailyData =
    temp_max?.map((_, i) => [temp_max[i], temp_min[i], d_code[i]]) ??
    Array.from({ length: 7 });

  function handleSearch(e) {
    e.preventDefault();

    setTimesSearched((prev) => prev + 1);

    const { name, country, timezone } = selectedPlace;

    setCityName(name);
    setCountryName(country);

    setActualHour(
      Number(
        new Date()
          .toLocaleTimeString(undefined, {
            timeZone: timezone,
          })
          .slice(0, 2)
      )
    );
  }

  // USEEFFECT FOR GETTING THE COORDINATES, COUNTRY AND NAME OF THE LOCATION
  useEffect(() => {
    if (!query?.length) return;

    const controller = new AbortController();

    (async function FetchLocation() {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}`,
          { signal: controller.signal }
        );

        const data = await res.json();

        setLocationsList(data.results);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.name);
        }
      }
    })();

    return () => controller.abort();
  }, [query]);
  // USEEFFECT FOR GETTING THE WEATHER DATA
  useEffect(() => {
    if (!locationsList?.length || !Object.keys(selectedPlace).length) return;

    const { latitude, longitude } = selectedPlace;

    async function FetchWeather() {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&current=temperature_2m,apparent_temperature,wind_speed_10m,precipitation,weather_code,relative_humidity_2m` +
          `&hourly=,temperature_2m,weather_code` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
          `&timezone=auto` +
          `&${units === "Imperial" ? "wind_speed_unit=mph&" : ""}${
            units === "Imperial" ? "temperature_unit=fahrenheit&" : ""
          }${units === "Imperial" ? "precipitation_unit=inch" : ""}`
      );

      const data = await res.json();

      console.log(data);

      setWeatherData(data);
    }
    FetchWeather();
  }, [timesSearched, units]);

  useEffect(() => {
    if (!query.length) return;
    setShowResults(false);
  }, [selectedPlace]);

  return (
    <div className="App">
      <Header states={[showUnitsBox]}>
        {[
          <HeaderButton
            setStates={[setShowUnitsBox, setShowDays, setShowResults]}
          />,
          <UnitsMenu units={units}>
            <UnitsButton units={units} setUnits={setUnits} />
          </UnitsMenu>,
        ]}
      </Header>
      <SearchBar
        locationsList={locationsList}
        states={[showResults, focusResults]}
        query={query}
      >
        {[
          <SearchInput
            query={query}
            setStates={[
              setQuery,
              setShowResults,
              setFocusResults,
              setShowUnitsBox,
              setShowDays,
            ]}
          />,
          <ResultsList
            locationsList={locationsList}
            setStates={[setQuery, setSelectedPlace]}
          />,
          <SearchButton
            onSearch={handleSearch}
            setStates={[setShowResults, setShowDays]}
          />,
        ]}
      </SearchBar>
      <Main>
        <Main1>
          <M1MainData
            weatherData={[c_temp, c_code]}
            locationData={[cityName, countryName]}
          />
          <M1ComplementaryData>
            <M1Data title="Fells like" data={tempFeel} unit="°" />
            <M1Data title="Humidity" data={c_humidity} unit="%" />
            <M1Data
              title="Wind"
              data={(windSpeed || 0) + " "}
              unit={units === "Imperial" ? "mph" : "km/h"}
            />
            <M1Data
              title="Precipitation"
              data={(c_prec || 0) + " "}
              unit={units === "Imperial" ? "in" : "mm"}
            />
          </M1ComplementaryData>
        </Main1>
        <Main2>
          <Main2List>
            {dailyData.map((data, i) => (
              <M2LI data={data} key={i} index={i} />
            ))}
          </Main2List>
        </Main2>
      </Main>
      <Aside>
        <AsideHeader states={[showDays, focusShowDays]}>
          {[
            <AsideButton day={day} setStates={[setShowDays, setShowResults]} />,
            <AsideDaysList
              data={[daysList]}
              setStates={[setDay, setShowDays, setSelectedDay]}
            />,
            <LastFocusable setStates={[setShowDays, setFocusShowDays]} />,
          ]}
        </AsideHeader>
        <AsideDataList>
          {hoursList.map((hour) => (
            <ADataItem
              data={[
                h_temp?.[hour + 24 * dayIndex],
                h_code?.[hour + 24 * dayIndex],
              ]}
              hour={actualHour + hour}
              key={hour}
            />
          ))}
        </AsideDataList>
      </Aside>
    </div>
  );
}
