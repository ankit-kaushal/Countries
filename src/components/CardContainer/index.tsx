import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [isInView, setIsInView] = useState(false);
  const [animation, setAnimation] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    setAnimation(true);
    setTimeout(() => {
      navigate(`/country/${country.cca3}`);
    }, 500);
  };

  if (loading) {
    return <CardLoading />;
  }

  if (!country) {
    return null;
  }
  return (
    <div
      onClick={handleClick}
      className={`${styles.card_container} ${
        animation ? styles["fade_down"] : ""
      }`}
    >
      <div
        ref={imgRef}
        className={styles.country_flag}
        style={{ backgroundImage: isInView ? `url(${country.flags.png})` : "" }}
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
    </div>
  );
};

export default CardContainer;
