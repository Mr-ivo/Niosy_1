import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import styles from "./contactGallery.module.css"

const ContactGallery = () => {
  return (
    <div className={styles.contactGalleryContainer}>
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <FaPhone className={styles.icon} size={20}  />
          <div>
            <p>PHONE</p>
            <p>+123-456-7890</p>
            <p>+123-456-7891</p>
          </div>
        </div>
        <div className={styles.contactItem}>
          <FaEnvelope className={styles.icon} size={20}  />
          <div>
            <p>EMAIL</p>
            <p>info@example.com</p>
            <p>info@example.com</p>
          </div>
        </div>
        <div className={styles.contactItem}>
          <FaMapMarkerAlt className={styles.icon} size={20}  />
          <div>
            <p>LOCATION</p>
            <p>123 New York St</p>
            <p>Block 4, Street 789, USA</p>
          </div>
        </div>
      </div>
      <div className={styles.gallery}>
        <Image src="/music.jpg" width={200} height={150} />
        <Image src="/pexels.jpeg" width={200} height={150} />
        <Image src="/pexels.jpeg" width={200} height={150} />
        <Image src="/pexels.jpeg" width={200} height={150} />
        <Image src="/pexels.jpeg" width={200} height={150} />
      </div>
    </div>
  );
};

export default ContactGallery;

