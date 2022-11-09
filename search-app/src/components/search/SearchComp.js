import { useState, useRef, useEffect } from "react";

import classes from "./SearchComp.module.css";
import SearchResult from "./SearchResult";

// Search Component used on Search page with Search Input and Search Results
function SearchComp() {
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef();

  // Setting focus on search input when this component is loaded
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  // Handle submit of search, set searchInput state to the value of the search input field which will further fetch 
  // the search results from backend and update the SearchResult component
  function submitHandler(event) {
    event.preventDefault();
    setSearchInput(searchInputRef.current.value);
  }

  // Component will contain search input, submit and reset button for submitting and resetting the search input and
  // SearchResult component containing all the search results based on searchExp prop passed on to it.
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className={classes.searchForm}>
          <div className={classes.control}>
            <input
              type="text"
              id="search-input"
              autoComplete="off"
              ref={searchInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button type="submit">Search</button>
            <button type="button" onClick={() => setSearchInput("")}>
              Reset
            </button>
          </div>
        </div>
      </form>
      <SearchResult searchExp={searchInput} />
    </>
  );
}

export default SearchComp;
