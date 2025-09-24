export default function SearchBar({
  children,
  locationsList,
  query,
  states: [showResults, focusResults],
}) {
  return (
    <>
      <div id="SearchBar" className="generalBackground" role="searchbox">
        <img src="/images/icon-search.svg" alt="Search Icon" />
        {children[0]}

        {locationsList?.length &&
        query?.length &&
        (showResults || focusResults) ? (
          children[1]
        ) : (
          <></>
        )}
      </div>

      {children[2]}
    </>
  );
}
export function ResultsList({
  locationsList,
  setStates: [setQuery, setSelectedPlace],
}) {
  return (
    <ul className="s-results-list generalBorder dropdownContainer">
      {locationsList.map((loc, i) => (
        <button
          onClick={() => {
            setQuery(loc?.name);
            setSelectedPlace(loc);
          }}
          className="s-results-item generalBorder dropdownItem"
          key={i}
        >
          {loc?.name} - {loc?.country}
        </button>
      ))}
    </ul>
  );
}
export function SearchButton({
  onSearch,
  setStates: [setShowResults, setShowDays],
}) {
  return (
    <button
      onFocus={() => {
        setShowResults(false);
        setShowDays(false);
      }}
      id="SearchButton"
      onClick={onSearch}
    >
      Search
    </button>
  );
}
export function SearchInput({
  query,
  setStates: [
    setQuery,
    setShowResults,
    setFocusResults,
    setShowUnitsBox,
    setShowDays,
  ],
}) {
  return (
    <input
      className="s-input"
      placeholder="Search for a place..."
      type="text"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setShowResults(true);
        setFocusResults(true);
      }}
      onFocus={() => {
        setShowUnitsBox(false);
        setShowDays(false);
      }}
      onBlur={() => setFocusResults(false)}
    />
  );
}
