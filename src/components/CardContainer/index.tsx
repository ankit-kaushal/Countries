import React from "react";
import styles from "./styles.module.css";
import CardLoading from "../../common/CardLoading";

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
    <div className={styles.card_container}>
      <div
        className={styles.country_flag}
        style={{ backgroundImage: `url(${country.flags.png})` }}
      >
        {/* <img src={country.flags.png} alt={`Flag of ${country.name.common}`} /> */}
      </div>
      <div className={styles.card_info_container}>
        <h2>{country.name.common}</h2>
        <p>
          <span>Population:</span> {country.population.toLocaleString()}
        </p>
        <p>
          <span>Region:</span> {country.region}
        </p>
        <p>
          <span>Capital:</span> {country.capital ? country.capital[0] : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default CardContainer;
