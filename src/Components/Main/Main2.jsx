import ClimateImages from "../../climate-condition.json";

export default function Main2({ children }) {
  return (
    <section id="m-2-daily-forecast">
      <h3>Daily forecast</h3>
      {children}
    </section>
  );
}
export function Main2List({ children }) {
  return (
    <ul id="m-2-list" role="group">
      {children}
    </ul>
  );
}
export function M2LI({
  l,
  data: [max = 0, min = 0, d_code] = [],
  localHour,
  index,
}) {
  const imgCode = !d_code
    ? localHour >= 6 && localHour <= 18
      ? 0
      : 8
    : d_code <= 2
    ? localHour >= 6 && localHour <= 18
      ? 1
      : 9
    : d_code === 3
    ? 3
    : d_code <= 48
    ? 2
    : d_code <= 55
    ? 4
    : d_code <= 65
    ? 5
    : d_code <= 75
    ? 6
    : 7;

  // DATE
  const dayNumber = new Date().getDay();
  const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayIndex = dayNumber - 1 + index;

  return (
    <li className="m-2-data generalBorder generalBackground">
      {l || (
        <>
          {daysList[dayIndex < 0 ? dayIndex + 7 : dayIndex]?.slice(0, 3)}
          <figure>
            <img
              className="climate-image"
              src={ClimateImages[imgCode].image}
              alt={ClimateImages[imgCode].alt}
            />
          </figure>
          <span className="m-2-min-max">
            <span>{min?.toFixed(0)}°</span>
            <span>{max?.toFixed(0)}°</span>
          </span>
        </>
      )}
    </li>
  );
}
