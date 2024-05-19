import React, { useState, useCallback } from "react";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import debounce from "../../utils/debounce";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const [searchValue, setSearchValue] = useState(value);

  const debouncedOnChange = useCallback(debounce(onChange, 300), [onChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    debouncedOnChange(event);
  };

  return (
    <div className={styles.search_input}>
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
