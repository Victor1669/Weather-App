export default function SearchBar({
  children,
  locationsList,
  query,
  states: [showResults, focusResults, resultsLoading],
}) {
  return (
    <>
      <div id="SearchBar" className="generalBackground" role="searchbox">
        <img
          className="s-img"
          src="/images/icon-search.svg"
          alt="Search Icon"
        />
        {children[0]}

        {resultsLoading && <LoadingMessage />}

        {locationsList?.length &&
        query?.length &&
        !resultsLoading &&
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
    setResultsLoading,
  ],
}) {
  return (
    <input
      className="s-input hover"
      placeholder="Search for a place..."
      type="text"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setShowResults(true);
        setFocusResults(true);
        if (query.length > 2) setResultsLoading(true);
      }}
      onFocus={() => {
        setShowUnitsBox(false);
        setShowDays(false);
      }}
      onBlur={() => setFocusResults(false)}
    />
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
          className="s-results-item generalBorder dropdownItem hover"
          key={i}
        >
          {loc?.name} - {loc?.country}
        </button>
      ))}
    </ul>
  );
}
import { FadeLoader } from "react-spinners";
function LoadingMessage() {
  return (
    <span className="s-loading dropdownItem">
      <FadeLoader
        className="s-loading-spinner"
        width={3}
        height={3}
        margin={-10}
        color="white"
      />
      Search in progress
    </span>
  );
}
