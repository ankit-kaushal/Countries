import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fetchCountries, { Country } from "../../hooks/fetchCountries";
import CardDetailLoading from "../../common/CardDetailLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";

const CountryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCountries({
          cca3: id,
        });
        if (data.length > 0) {
          setCountry(data[0]);
        } else {
          console.error("No country found for the given cca3:", id);
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchBorderCountries = async () => {
      if (country && country?.borders && country?.borders?.length > 0) {
        try {
          const response = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(
              ","
            )}`
          );
          if (!response.ok) {
            throw new Error("Error fetching border countries");
          }
          const borderData = await response.json();
          setBorderCountries(borderData);
        } catch (error) {
          console.error("Error fetching border countries:", error);
        }
      }
    };

    fetchBorderCountries();
  }, [country]);

  if (loading) {
    return <CardDetailLoading />;
  }

  if (!country) {
    return <div>Error: Country details not found</div>;
  }

  const nativeName =
    country.name.nativeName[Object.keys(country.name.nativeName)[0]].common;
  const currencies = Object.values(country.currencies)
    .map((currency) => currency.name)
    .join(", ");
  const languages = Object.values(country.languages).join(", ");

  return (
    <div className={styles.country_details_container}>
      <button onClick={() => navigate(-1)} className={styles.back_navigation}>
        <FontAwesomeIcon icon={faArrowLeftLong} />
        Back
      </button>
      <div className={styles.details_container}>
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className={styles.country_flag}
        />
        <div>
          <h1>{country.name.common}</h1>
          <div className={styles.countries_information}>
            <div>
              <p>
                <strong>Native Name:</strong> {nativeName}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subregion}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital.join(", ")}
              </p>
            </div>
            <div>
              <p>
                <strong>Top Level Domain:</strong> {country.tld.join(", ")}
              </p>
              <p>
                <strong>Currencies:</strong> {currencies}
              </p>
              <p>
                <strong>Languages:</strong> {languages}
              </p>
            </div>
          </div>
          <div className={styles.border_countries_container}>
            <strong>Border Countries: </strong>
            <div className={styles.border_countries_list}>
              {borderCountries.map((borderCountry) => (
                <Link
                  to={`/country/${borderCountry.cca3}`}
                  key={borderCountry.cca3}
                  className={styles.border_countries}
                >
                  {borderCountry.name.common}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
