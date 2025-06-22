
import React, { type ChangeEvent } from "react";
// import { useDebounce } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  // onSearch: (searchText: string) => void;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, placeholder  }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // useEffect(() => {
  //   onSearch(debouncedValue.trim());
  // }, [debouncedValue, onSearch]);

  return (
    <input
      className={css.input}
      type="text"
      placeholder= { placeholder || "Search notes" }
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default SearchBox;