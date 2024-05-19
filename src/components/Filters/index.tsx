import React from "react";
import SearchInput from "../../common/SearchInput";
import FilterSelect from "../../common/FilterSelect";

import REGION_OPTION from "../../configurations/REGION_OPTION";

import styles from "./styles.module.css";

interface FiltersProps {
  filters: {
    name: string;
    region: string;
  };
  setFilters: (filters: { name: string; region: string }) => void;
}

interface CustomChangeEvent extends React.ChangeEvent<HTMLSelectElement> {
  value: string;
}

const Filters: React.FC<FiltersProps> = ({
  filters = { name: "", region: "" },
  setFilters,
}) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: event.target.value, region: "" });
  };

  const handleRegionChange = (event: CustomChangeEvent) => {
    setFilters({ ...filters, region: event.value, name: "" });
  };

  return (
    <div className={styles.filters_container}>
      <SearchInput value={filters.name} onChange={handleNameChange} />
      <FilterSelect
        placeHolder="Filter by Region"
        options={REGION_OPTION}
        onChange={handleRegionChange}
      />
    </div>
  );
};

export default Filters;
