import { useState, useRef, useEffect } from "react";

import classes from "./SearchComp.module.css";
import SearchResult from "./SearchResult";

function SearchComp() {
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef();

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  function submitHandler(event) {
    event.preventDefault();
    setSearchInput(searchInputRef.current.value);
  }

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
