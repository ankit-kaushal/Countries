import React, {
  CSSProperties,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from "react";

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

function Icon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="#222"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isOpen ? styles.translate : ""}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
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

    if (Array.isArray(selectedValue) && selectedValue.length === 0) {
      return placeHolder;
    }

    if (Array.isArray(selectedValue)) {
      return (
        <div className={styles.dropdown_tags}>
          {selectedValue.map((option, index) => (
            <div
              key={`${option.value}-${index}`}
              className={styles.dropdown_tag_item}
            >
              {option.label}
              <span className={styles.dropdown_tag_close}>
                <button type="button" onClick={(e) => onTagRemove(e, option)}>
                  <CloseIcon />
                </button>
              </span>
            </div>
          ))}
        </div>
      );
    }

    return (selectedValue as Option).label;
  };

  const onTagRemove = (
    e: React.MouseEvent<HTMLSpanElement>,
    option: Option
  ) => {
    e.stopPropagation();
    const newValue = (selectedValue as Option[]).filter(
      (o) => o.value !== option.value
    );
    setSelectedValue(newValue);
    onChange(newValue);
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
          <Icon isOpen={showMenu} />
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
