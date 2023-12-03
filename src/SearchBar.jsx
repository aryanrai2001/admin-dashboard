/* eslint-disable react/prop-types */
import { useState } from "react";
import searchIcon from "./assets/search_icon.svg";

function SearchBar({ setSearch }) {
  const [searchVal, setSearchVal] = useState("");
  return (
    <>
      <div className="input-group mb-5">
        <input
          type="search"
          className="form-control rounded-left"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(event) => {
            setSearchVal(event.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") setSearch(searchVal);
          }}
        />
        <button
          type="button"
          className="btn btn-primary"
          data-mdb-ripple-init
          onClick={() => {
            setSearch(searchVal);
          }}
        >
          <img src={searchIcon} className="svg-icon-white" width="20px" />
        </button>
      </div>
    </>
  );
}

export default SearchBar;
