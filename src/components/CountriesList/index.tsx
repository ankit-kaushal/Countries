import React, { useEffect, useState } from "react";
import Filters from "../Filters";
import CardContainer from "../CardContainer";
import fetchCountries, { Country } from "../../hooks/fetchCountries";

import styles from "./styles.module.css";

const CountriesList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<{ region: string; name: string }>({
    region: "",
    name: "",
  });

  const loadCountries = async (filters: { region?: string; name?: string }) => {
    setLoading(true);
    try {
      const data = await fetchCountries(filters);
      setCountries(data);
    } catch (error) {
      console.error("Error loading countries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries(filters);
  }, [filters]);

  return (
    <div className={styles.container}>
      <Filters filters={filters} setFilters={setFilters} />

      <div className={styles.countries_list_container}>
        {countries.map((country) => (
          <CardContainer
            key={country?.cca3}
            country={country}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
