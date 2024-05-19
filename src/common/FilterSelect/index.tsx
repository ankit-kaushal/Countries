import React, {
  CSSProperties,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";

interface Option {
  label: string;
  value: string;
}

interface FilterSelectProps {
  placeHolder: string;
  options: Option[];
  onChange: any;
  style?: CSSProperties;
}

function FilterSelect({
  placeHolder,
  options,
  onChange,
  style,
}: FilterSelectProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Option[] | Option | null>(
    null
  );
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowMenu(!showMenu);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      setShowMenu(!showMenu);
    }
  };

  const getDisplay = () => {
    if (!selectedValue) {
      return placeHolder;
    }

    return (selectedValue as Option).label;
  };

  const onItemClick = (option: Option) => {
    let newValue: Option[] | Option | null;
    newValue = option;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option: Option) => {
    if (!selectedValue) {
      return false;
    }

    return (selectedValue as Option).value === option.value;
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <div className={styles.filter_select_container} style={style}>
      <div
        ref={inputRef}
        onClick={handleInputClick}
        onKeyDown={handleKeyPress}
        className={styles.dropdown_input}
        role="button"
        tabIndex={0}
      >
        <div className={styles.selected_value}>{getDisplay()}</div>
        <div className={styles.dropdown_icon}>
          <FontAwesomeIcon
            icon={faAngleDown}
            className={showMenu ? styles.translate : ""}
          />
        </div>
      </div>

      {showMenu && (
        <div className={styles.dropdown_menu}>
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onItemClick(option);
              }}
              key={option.value}
              className={`${styles.dropdown_item} ${
                isSelected(option) ? styles.selected : ""
              }`}
              role="option"
              aria-selected={isSelected(option) ? "true" : "false"}
              tabIndex={0}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterSelect;
