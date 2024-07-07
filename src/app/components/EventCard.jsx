import React from 'react';
import styles from './EventCard.module.css';

const EventCard = ({ backgroundColor, Icon, title, price, description }) => {
  return (
    <div className={styles.card} style={{ backgroundColor }}>
      <div className={styles.iconContainer} style={{ color: backgroundColor }}>
        {Icon && <Icon size={30} />}
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
      <p>{description}</p>
      <button className={styles.button}>Get Ticket</button>
    </div>
  );
};

export default EventCard;