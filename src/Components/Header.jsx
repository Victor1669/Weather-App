export default function Header({ children, states: [showUnits] }) {
  return (
    <header id="Header">
      <h1 className="h-logo">Weather Now</h1>
      {children[0]}
      {showUnits && children[1]}
    </header>
  );
}
export function HeaderButton({
  showUnits,
  setStates: [setShowUnits, setShowDays, setShowResults],
}) {
  return (
    <button
      className="h-dropdown-button generalBackground hover"
      onClick={() => {
        setShowUnits((s) => !s);
        setShowDays(false);
        setShowResults(false);
      }}
      onFocus={() => setShowResults(false)}
      aria-haspopup="true"
      aria-controls="unit-box"
    >
      <img
        className="imageRotate"
        aria-checked={showUnits}
        width={14}
        src="/images/icon-units.svg"
        alt=""
      />
      <span className="h-dropdown-legend">Units</span>
      <img
        className="imageRotate"
        aria-checked={showUnits}
        width={14}
        src="/images/icon-dropdown.svg"
        alt=""
      />
    </button>
  );
}

export function UnitsMenu({ children, units }) {
  return (
    <menu className="h-dropdown dropdownContainer generalBorder" id="unit-box">
      {children}
      <UnitsMenuItem
        legend="Temperature"
        item1="Celsius (°C)"
        item2="Farenheit (°F)"
        units={units}
      />

      <span className="h-dropdown-division"></span>

      <UnitsMenuItem
        legend="Wind Speed"
        item1="km/h"
        item2="mph"
        units={units}
      />

      <span className="h-dropdown-division"></span>

      <UnitsMenuItem
        legend="Precipitation"
        item1="Millimeters (mm)"
        item2="Inches (in)"
        units={units}
      />
    </menu>
  );
}
export function UnitsButton({ units, setUnits }) {
  return (
    <button
      className="h-dropdown-unit-button hover"
      onClick={() =>
        setUnits((prev) => (prev === "Imperial" ? "Metric" : "Imperial"))
      }
    >
      Switch to {units === "Imperial" ? "Metric" : "Imperial"}
    </button>
  );
}
function UnitsMenuItem({ legend, item1, item2, units }) {
  return (
    <div className="h-dropdown-field">
      <span className="h-dropdown-field-legend">{legend}</span>
      <div
        role="menuitem"
        aria-checked={units === "Metric"}
        className="h-dropdown-field-unit dropdownItem hover"
      >
        {item1}
        {units === "Metric" && <img src="/images/icon-checkmark.svg" alt="" />}
      </div>
      <div
        role="menuitem"
        aria-checked={units === "Imperial"}
        className="h-dropdown-field-unit dropdownItem hover"
      >
        {item2}
        {units === "Imperial" && (
          <img src="/images/icon-checkmark.svg" alt="" />
        )}
      </div>
    </div>
  );
}
