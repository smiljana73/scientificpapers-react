import React from "react";
import "./SearchBar.css";

interface IProps {
  handleSearchTermChange: (newSearchTerm: string) => void;
}

const SearchBar: React.FC<IProps> = ({ handleSearchTermChange }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleSearchTermChange(e.currentTarget.value);
    }
  };

  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Search..."
        onKeyDown={event => handleKeyDown(event)}
      />
    </div>
  );
};

export default SearchBar;
