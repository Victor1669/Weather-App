import { FadeLoader } from "react-spinners";

export default function SearchBar({
  children,
  locationsList,
  l,
  states: [query, showResults, focusResults, resultsLoading],
}) {
  return (
    <>
      <div id="SearchBar" className="generalBackground" role="searchbox">
        <svg
          className="s-img"
          aria-checked={l}
          alt="Search Icon"
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="none"
          viewBox="0 0 21 21"
        >
          <path
            className="light"
            fill="#D4D3D9"
            d="M19.844 18.82c.195.196.195.508 0 .664l-.899.899c-.156.195-.468.195-.664 0l-4.726-4.727a.63.63 0 0 1-.117-.351v-.508c-1.446 1.21-3.282 1.953-5.313 1.953A8.119 8.119 0 0 1 0 8.625C0 4.172 3.633.5 8.125.5c4.453 0 8.125 3.672 8.125 8.125 0 2.031-.781 3.906-1.992 5.313h.508c.117 0 .234.078.351.156l4.727 4.726ZM8.125 14.875a6.243 6.243 0 0 0 6.25-6.25c0-3.438-2.813-6.25-6.25-6.25a6.243 6.243 0 0 0-6.25 6.25 6.219 6.219 0 0 0 6.25 6.25Z"
          />
        </svg>

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
      className="s-input hover focus-ouline"
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
