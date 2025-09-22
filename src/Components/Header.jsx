import { useState } from "react";

export default function Header({
  children,
  states: [showUnitsBox, focusUnitsBox],
}) {
  return (
    <header id="Header">
      <h1 className="h-logo">Weather Now</h1>
      {children[0]}
      {(showUnitsBox || focusUnitsBox) && children[1]}

      <h2 className="h-subtitle">How's the sky looking today?</h2>
    </header>
  );
}
export function DropBoxButton({
  setStates: [setShowUnitsBox, setShowDays, setShowResults],
}) {
  return (
    <button
      className="h-dropdown-button generalBackground"
      onClick={() => {
        setShowUnitsBox((s) => !s);
        setShowDays(false);
        setShowResults(false);
      }}
      aria-haspopup="true"
      aria-controls="unit-box"
    >
      <img width={14} src="/images/icon-units.svg" alt="" />
      <span className="h-dropdown-legend">Units</span>
      <img width={14} src="/images/icon-dropdown.svg" alt="" />
    </button>
  );
}

export function UnitsMenu({ children }) {
  return (
    <menu className="h-dropdown dropdownContainer generalBorder" id="unit-box">
      {children}
      <UnitsMenuItem
        legend="Temperature"
        item1="Celsius (°C)"
        item2="Farenheit (°F)"
      />

      <span className="h-dropdown-division"></span>

      <UnitsMenuItem legend="Wind Speed" item1="km/h" item2="mph" />

      <span className="h-dropdown-division"></span>

      <UnitsMenuItem
        legend="Precipitation"
        item1="Millimeters (mm)"
        item2="Inches (in)"
      />
    </menu>
  );
}
function UnitsMenuItem({ legend, item1, item2 }) {
  return (
    <div className="h-dropdown-field">
      <span className="h-dropdown-field-legend">{legend}</span>
      <div role="menuitem" className="dropdownItem">
        {item1}
      </div>
      <div role="menuitem" className="dropdownItem">
        {item2}
      </div>
    </div>
  );
}
export function UnitsButton({
  setStates: [setShowUnitsBox, setFocusUnitsBox],
}) {
  const [switchUnit, setSwitchUnit] = useState(false);
  return (
    <button
      className="dropdownItem"
      onClick={() => setSwitchUnit((u) => !u)}
      onFocus={() => setFocusUnitsBox(true)}
      onBlur={() => {
        setFocusUnitsBox(false);
        setShowUnitsBox(false);
      }}
    >
      Switch to {switchUnit ? "Imperial" : "Metric"}
    </button>
  );
}
