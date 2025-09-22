import { useState } from "react";

import Header, { DropBoxButton, UnitsButton, UnitsMenu } from "./Header";
import SearchBar, { ResultsList, SearchButton, SearchInput } from "./SearchBar";
import Aside, {
  AsideDaysList,
  AsideHeader,
  AsideButton,
  LastFocusable,
} from "./Aside";
import Main from "./Main";

export default function App() {
  /* HEADER */
  const [showUnitsBox, setShowUnitsBox] = useState(false);
  const [focusUnitsBox, setFocusUnitsBox] = useState(false);

  /* SEARCHBAR */
  const [query, setQuery] = useState("");
  const [locationsList, setLocationsList] = useState(
    Array(4).fill({ name: "City name", id: crypto.randomUUID() })
  );
  const [showResults, setShowResults] = useState(false);
  const [focusResults, setFocusResults] = useState(false);

  /* ASIDE */
  const [day, setDay] = useState("Monday");

  const [showDays, setShowDays] = useState(false);
  const [focusShowDays, setFocusShowDays] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
  }

  return (
    <div className="App">
      <Header states={[showUnitsBox, focusUnitsBox]}>
        {[
          <DropBoxButton
            setStates={[setShowUnitsBox, setShowDays, setShowResults]}
          />,
          <UnitsMenu>
            <UnitsButton setStates={[setShowUnitsBox, setFocusUnitsBox]} />
          </UnitsMenu>,
        ]}
      </Header>
      <SearchBar
        locationsList={locationsList}
        states={[showResults, focusResults]}
        query={query}
      >
        {[
          <SearchInput
            query={query}
            setStates={[
              setQuery,
              setShowResults,
              setFocusResults,
              setShowUnitsBox,
              setShowDays,
            ]}
          />,
          <ResultsList locationsList={locationsList} />,
          <SearchButton
            onSearch={handleSearch}
            setShowResults={setShowResults}
          />,
        ]}
      </SearchBar>
      <Main />
      <Aside>
        <AsideHeader states={[showDays, focusShowDays]}>
          {[
            <AsideButton day={day} setStates={[setShowDays, setShowResults]} />,
            <AsideDaysList setStates={[setDay, setShowDays]} />,
            <LastFocusable setStates={[setShowDays, setFocusShowDays]} />,
          ]}
        </AsideHeader>
      </Aside>
    </div>
  );
}
