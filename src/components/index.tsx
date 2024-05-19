import React, { useEffect, useState } from "react";
import Navigation from "./Navigation/index.";
import Filters from "./Filters";
import CardContainer from "./CardContainer";
import fetchCountries from "../hooks/fetchCountries";

import styles from "./styles.module.css";

interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
  };
}

const Countries: React.FC = () => {
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
      <Navigation />
      <Filters filters={filters} setFilters={setFilters} />

      <div className={styles.countries_list_container}>
        {countries.map((country) => (
          <CardContainer country={country} loading={loading} />
        ))}
      </div>
    </div>
  );
};

export default Countries;
