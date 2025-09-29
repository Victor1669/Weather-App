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
  return (
    <button
      onClick={() => setShowDays((s) => !s)}
      onFocus={() => setShowResults(false)}
      className="a-dropdown-button hover"
    >
      <span>{l ? "—" : day}</span>
      <img
        className="imageRotate"
        aria-checked={showDays}
        width={14}
        src="/images/icon-dropdown.svg"
        alt=""
      />
    </button>
  );
}

export function AsideDaysList({
  day,
  data: [daysList],
  setStates: [setDay, setShowDays, setSelectedDay],
}) {
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
          <img src="/images/icon-checkmark.svg" alt="" />
        </button>
      ))}
    </ul>
  );
}

export function AsideDataList({ children }) {
  return <ul role="group">{children}</ul>;
}

export function ADataItem({ hour, data: [h_temp, h_code], l }) {
  const imgCode = !h_code
    ? 0
    : h_code <= 2
    ? 1
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
export function LastFocusable({ setStates: [setShowDays, setFocusShowDays] }) {
  return (
    <span
      className="ending-focusable"
      onFocus={() => {
        setShowDays(false);
        setFocusShowDays(false);
      }}
      tabIndex={0}
    >
      The focusable content on the website has ended.
    </span>
  );
}
