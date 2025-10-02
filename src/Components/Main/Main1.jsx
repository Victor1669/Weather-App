import { BeatLoader } from "react-spinners";
import ClimateImages from "../../climate-condition.json";

export default function Main1({ children }) {
  return <section id="m-1-location-forecast">{children}</section>;
}
export function M1MainData({
  children,
  l,
  localHour,
  weatherData: [c_temp, c_code],
  locationData: [cityName, countryName],
}) {
  // DATE
  const date = new Date();

  const actualDay = new Intl.DateTimeFormat(navigator.language, {
    weekday: "long",
  }).format(date);

  const actualMonth = new Intl.DateTimeFormat(navigator.language, {
    month: "short",
  }).format(date);

  // WEATHER CODE
  const imgCode = !c_code
    ? localHour >= 6 && localHour <= 18
      ? 0
      : 8
    : c_code <= 2
    ? localHour >= 6 && localHour <= 18
      ? 1
      : 9
    : c_code === 3
    ? 3
    : c_code <= 48
    ? 2
    : c_code <= 55
    ? 4
    : c_code <= 65
    ? 5
    : c_code <= 75
    ? 6
    : 7;

  return (
    <div className="m-1-container generalBackground">
      {l ? (
        children
      ) : (
        <div
          className="m-1-content"
          style={{
            backgroundImage: `var(--l-bg-${
              localHour >= 6 && localHour <= 18 ? "light" : "dark"
            })`,
          }}
        >
          <header className="m-1-header">
            <h3 className="m-1-location-name">
              {cityName}, {countryName}
            </h3>
            <p>
              {actualDay}, {actualMonth.slice(0, 3) + " " + date.getDate()}{" "}
              {date.getFullYear()}
            </p>
          </header>
          <div className="m-1-container-data" role="complementary">
            <img
              className="climate-image"
              width={100}
              src={ClimateImages[imgCode]?.image}
              alt={ClimateImages[imgCode]?.alt}
            />
            <span className="m-1-data-number">{c_temp || 0}°</span>
          </div>
        </div>
      )}
    </div>
  );
}
export function M1ComplementaryData({ children }) {
  return (
    <ul id="m-1-list" role="group">
      {children}
    </ul>
  );
}
export function M1Data({ title, data, unit, l }) {
  return (
    <li className="m-1-data generalBorder generalBackground">
      <span>{title}</span> <span>{l ? "—" : (data ?? 0) + unit}</span>
    </li>
  );
}
export function LoadingSpinner() {
  return (
    <div className="loading">
      <BeatLoader color="white" />
    </div>
  );
}
