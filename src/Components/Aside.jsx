export default function Aside({ children }) {
  return (
    <aside id="Aside" className="generalBorder generalBackground">
      {children}
      <AsideDataList />
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

export function AsideButton({ day, setStates: [setShowDays, setShowResults] }) {
  return (
    <button
      onClick={() => setShowDays((s) => !s)}
      onFocus={() => setShowResults(false)}
      className="a-dropdown-button"
    >
      <span>{day}</span>
      <img width={14} src="/images/icon-dropdown.svg" alt="" />
    </button>
  );
}

export function AsideDaysList({ setStates: [setDay, setShowDays] }) {
  const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <ul
      className="dropdownContainer generalBorder a-dropdown"
      defaultValue="Monday"
    >
      {daysList.map((dayValue, i) => (
        <button
          className="dropdownItem"
          key={i}
          onClick={() => {
            setDay(dayValue);
            setShowDays(false);
          }}
        >
          {dayValue}
        </button>
      ))}
    </ul>
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

function AsideDataList() {
  return (
    <ul role="group">
      <A_Data_Item />
      <A_Data_Item />
      <A_Data_Item />
      <A_Data_Item />
      <A_Data_Item />
      <A_Data_Item />
      <A_Data_Item />
      <A_Data_Item />
    </ul>
  );
}

function A_Data_Item() {
  return (
    <li className="a-data generalBorder">
      [IMAGE] [HOUR] <span>[DEGREE]</span>
    </li>
  );
}
