import React from "react";
import { Link } from "react-router-dom";
import CardLoading from "../../common/CardLoading";
import { Country } from "../../hooks/fetchCountries";

import styles from "./styles.module.css";

interface CardContainerProps {
  country: Country;
  loading: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({
  country,
  loading = false,
}) => {
  if (loading) {
    return <CardLoading />;
  }

  if (!country) {
    return null;
  }
  return (
    <Link to={`/country/${country.cca3}`} className={styles.card_container}>
      <div
        className={styles.country_flag}
        style={{ backgroundImage: `url(${country.flags.png})` }}
      ></div>
      <div className={styles.card_info_container}>
        <h2>{country.name.common}</h2>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Capital:</strong>{" "}
          {country.capital ? country.capital[0] : "N/A"}
        </p>
      </div>
    </Link>
  );
};

export default CardContainer;
