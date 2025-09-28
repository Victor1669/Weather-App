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
import Main1, {
  M1MainData,
  M1ComplementaryData,
  M1Data,
  LoadingSpinner,
} from "./Main/Main1";
import Main2, { Main2List, M2LI } from "./Main/Main2";
import ErrorMessage from "./ErrorMessage";

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
  // DAYS
  const actualDay = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const dayIndex =
    selectedDay - actualDay < 0
      ? selectedDay - actualDay === -1
        ? 6
        : selectedDay - actualDay === -2
        ? 5
        : selectedDay - actualDay === -3
        ? 4
        : selectedDay - actualDay === -4
        ? 3
        : selectedDay - actualDay === -5
        ? 2
        : 1
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
  const [day, setDay] = useState(
    daysList[selectedDay - 1 < 0 ? selectedDay + 6 : selectedDay - 1]
  );

  const [showDays, setShowDays] = useState(false);
  const [focusShowDays, setFocusShowDays] = useState(false);

  // HOURS
  const [actualHour, setActualHour] = useState(
    Number(new Date().toLocaleTimeString().slice(0, 2))
  );
  const hoursList = Array.from({ length: 8 }, (_, i) => i);

  /* SEARCH */
  const [selectedPlace, setSelectedPlace] = useState({});

  const [timesSearched, setTimesSearched] = useState(0);

  // DATA
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

  /* LOADING */
  const [isLoading, setIsLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);

  /* NO RESULTS / ERROR */
  const [showContent, setShowContent] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // USEEFFECT FOR GETTING THE COORDINATES, COUNTRY AND NAME OF THE LOCATION
  useEffect(() => {
    // IF THE QUERY IS SMALLER THAN TWO LETTERS, IT WON'T LOAD ANYTHING
    if (query.length < 2) {
      setLocationsList([]);
      setResultsLoading(false);
      setShowResults(false);
      return;
    }

    const controller = new AbortController();

    // ASYNC FUNCTION TO GET THE COORDS
    (async function FetchLocation() {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}`,
          { signal: controller.signal }
        ).catch((err) => {
          if (err.name !== "AbortError") {
            setHasError(true);
          }
        });

        if (!navigator.onLine) {
          setErrorMessage("No Internet");
        }

        if (!res.ok) {
          setErrorMessage(res.statusText);
        }

        const data = await res?.json();

        if (res) setLocationsList(data.results);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
      setResultsLoading(false);
    })();

    return () => {
      return controller.abort();
    };
  }, [query]);

  // USEEFFECT FOR GETTING THE WEATHER DATA
  useEffect(() => {
    // STARTS THE LOADING EFFECT
    setIsLoading(true);

    if (!locationsList?.length) return setIsLoading(false);

    setShowContent(true);

    const { latitude, longitude, name, country, timezone } = selectedPlace;

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

    (async function FetchWeather() {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&current=temperature_2m,apparent_temperature,wind_speed_10m,precipitation,weather_code,relative_humidity_2m` +
          `&hourly=temperature_2m,weather_code` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
          `&timezone=auto` +
          `&${units === "Imperial" ? "wind_speed_unit=mph&" : ""}${
            units === "Imperial" ? "temperature_unit=fahrenheit&" : ""
          }${units === "Imperial" ? "precipitation_unit=inch" : ""}`
      ).catch((err) => {
        setHasError(true);
        setErrorMessage(err.message);
      });

      if (!res) return;

      const data = await res.json();

      setWeatherData(data);

      setIsLoading(false);
      setLocationsList([]);
      setSelectedPlace({});
    })();
  }, [timesSearched, units]);

  // USEEFFET TO CLOSE THE RESULTS WHEN SELECTING THE LOCATION
  useEffect(() => {
    if (!query.length) return;
    setShowResults(false);
  }, [selectedPlace]);

  /* USEEFFECT FOR RENDERING IMAGES */
  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = "/images/icon-error.svg";
    img2.src = "/images/icon-retry.svg";
  }, []);

  /* SEARCHING FUNCTION */
  function handleSearch() {
    if (query.length < 2) return;

    setIsLoading(true);

    if (!Object.keys(selectedPlace ?? {}).length) {
      setSelectedPlace(locationsList[0]);
    }

    setTimesSearched((prev) => prev + 1);
  }

  function handleRetry() {
    setHasError(false);
    handleSearch();
    setTimesSearched((prev) => prev + 1);
  }

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
      {hasError && (
        <ErrorMessage errorMessage={errorMessage} onRetry={handleRetry} />
      )}

      {!hasError && (
        <>
          <Subtitle />
          <SearchBar
            locationsList={locationsList}
            states={[showResults, focusResults, resultsLoading]}
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
                  setResultsLoading,
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
          {showContent && (
            <>
              <Main>
                <Main1>
                  <M1MainData
                    l={isLoading}
                    weatherData={[c_temp, c_code]}
                    locationData={[cityName, countryName]}
                  >
                    <LoadingSpinner />
                  </M1MainData>
                  <M1ComplementaryData>
                    <M1Data
                      l={isLoading}
                      title="Fells like"
                      data={tempFeel}
                      unit="°"
                    />
                    <M1Data
                      l={isLoading}
                      title="Humidity"
                      data={c_humidity}
                      unit="%"
                    />
                    <M1Data
                      l={isLoading}
                      title="Wind"
                      data={windSpeed}
                      unit={units === "Imperial" ? "mph" : "km/h"}
                    />
                    <M1Data
                      l={isLoading}
                      title="Precipitation"
                      data={c_prec}
                      unit={units === "Imperial" ? "in" : "mm"}
                    />
                  </M1ComplementaryData>
                </Main1>
                <Main2>
                  <Main2List>
                    {dailyData.map((data, i) => (
                      <M2LI l={isLoading} data={data} key={i} index={i} />
                    ))}
                  </Main2List>
                </Main2>
              </Main>
              <Aside>
                <AsideHeader states={[showDays, focusShowDays]}>
                  {[
                    <AsideButton
                      l={isLoading}
                      day={day}
                      setStates={[setShowDays, setShowResults]}
                    />,
                    <AsideDaysList
                      day={day}
                      data={[daysList]}
                      setStates={[setDay, setShowDays, setSelectedDay]}
                    />,
                    <LastFocusable
                      setStates={[setShowDays, setFocusShowDays]}
                    />,
                  ]}
                </AsideHeader>
                <AsideDataList>
                  {hoursList.map((hour) => {
                    const index = hour + 24 * dayIndex + actualHour;
                    return (
                      <ADataItem
                        l={isLoading}
                        data={[h_temp?.[index], h_code?.[index]]}
                        hour={actualHour + hour}
                        key={hour}
                      />
                    );
                  })}
                </AsideDataList>
              </Aside>
            </>
          )}
        </>
      )}
    </div>
  );
}

function Subtitle() {
  return <h2 id="Subtitle">How's the sky looking today?</h2>;
}
