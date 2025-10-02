import ClimateImages from "../climate-condition.json";

export default function Aside({ children }) {
  return (
    <aside id="Aside" className="generalBorder generalBackground">
      {children}
    </aside>
  );
}

export function AsideHeader({ children, states: [showDays, focusShowDays] }) {
  return (
    <header className="a-header">
      <h3>Hourly forecast</h3>
      {children[0]}
      {(showDays || focusShowDays) && children[1]}
      {children[2]}
    </header>
  );
}

export function AsideButton({
  day,
  showDays,
  setStates: [setShowDays, setShowResults],
  l,
}) {
  const DropdownSVG = (
    <svg
      className="imageRotate"
      aria-checked={showDays}
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="8"
      fill="none"
      viewBox="0 0 13 8"
    >
      <path
        className="light"
        fill="#fff"
        d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"
      />
    </svg>
  );

  return (
    <button
      onClick={() => setShowDays((s) => !s)}
      onFocus={() => setShowResults(false)}
      className="a-dropdown-button hover"
      aria-checked={showDays}
    >
      <span>{l ? "—" : day}</span>

      {DropdownSVG}
    </button>
  );
}

export function AsideDaysList({
  day,
  data: [daysList],
  setStates: [setDay, setShowDays, setSelectedDay],
}) {
  const checkMarkSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="11"
      fill="none"
      viewBox="0 0 14 11"
    >
      <path
        className="light"
        fill="#fff"
        d="M11.895 1.047c.136-.137.355-.137.464 0l.793.766c.11.136.11.355 0 .464L4.95 10.48a.315.315 0 0 1-.465 0L.82 6.844c-.11-.137-.11-.356 0-.465l.793-.793c.11-.11.328-.11.465 0l2.625 2.652 7.192-7.191Z"
      />
    </svg>
  );

  return (
    <ul className="a-dropdown dropdownContainer generalBorder">
      {daysList.map((dayValue, i) => (
        <button
          tabIndex={0}
          className="hover"
          aria-checked={day === dayValue}
          key={i}
          onClick={() => {
            setDay(dayValue);
            setShowDays(false);
            setSelectedDay(i + 1 > 6 ? 0 : i + 1);
          }}
        >
          {dayValue}

          {checkMarkSVG}
        </button>
      ))}
    </ul>
  );
}

export function AsideDataList({ children }) {
  return <ul role="group">{children}</ul>;
}

export function ADataItem({ l, hour, data: [h_temp, h_code] }) {
  // WEATHER CODE
  const imgCode = !h_code
    ? hour >= 6 && hour <= 18
      ? 0
      : 8
    : h_code <= 2
    ? hour >= 6 && hour <= 18
      ? 1
      : 9
    : h_code === 3
    ? 3
    : h_code <= 48
    ? 2
    : h_code <= 55
    ? 4
    : h_code <= 65
    ? 5
    : h_code <= 75
    ? 6
    : 7;

  if (h_temp == undefined && h_code == undefined) return;

  return (
    <li className="a-data generalBorder">
      {l || (
        <>
          <span>
            <img
              className="climate-image"
              src={ClimateImages[imgCode].image}
              alt={ClimateImages[imgCode].alt}
            />{" "}
            {hour < 12
              ? hour + " AM"
              : hour < 24 && hour > 12
              ? hour - 12 + " PM"
              : hour > 24
              ? hour - 24 + " AM"
              : "12 PM"}
          </span>
          <span>{h_temp || 0}°</span>
        </>
      )}
    </li>
  );
}
