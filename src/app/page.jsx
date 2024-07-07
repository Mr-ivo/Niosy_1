'use client'
import React from 'react';
import styles from "./page.module.css";
import Image from 'next/image';
import { FaTicketAlt, FaMusic, FaStar, FaFacebook, FaEnvelope, FaGoogle, FaLinkedin, FaTwitter } from 'react-icons/fa';
import EventCard from './components/EventCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecentArticles from './components/ReactArticles';
import ContactGallery from './components/contactGallery';

const Page = () => {
  const currentYear = new Date().getFullYear();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.info}>
          <h4 className={styles.exam}>I Write <span className={styles.sectionSubtitle}> Soundtracks and <br /> Songs</span> For Events, Shows <br /> and Albums. I love music</h4>
          <p className={styles.songs}>Lorem, ipsum dolor sit amet consectetur adipisicing .<br /> Repellendus, dolorem modi sit consectetur eveniet <br /> vitae veritatis incidunt, quos sed similique in pariatur. <br /> Commodi quas vitae magni asperiores voluptatibus.</p>
          <button className={styles.btn}>More Information</button>
        </div>
        <div className={styles.img}>
          <Image 
            src={"/guitar-removebg-preview.png"}
            width={300}
            height={300}
          />
        </div>
      </div>

      <div className={styles.every}>
        <h4>Festival Releases New Song <br /> And Music?</h4>
        <p className={styles.royal}>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className={styles.grace}>
        <Image 
          src={"/pexels-photo.webp"}
          width={200}
          height={200}
        />
        <Image 
          src={"/pexels.jpeg"}
          width={230}
          height={230}
        />
        <Image 
          src={"/piano.webp"}
          width={200}
          height={200}
        />
      </div>
      <button className={styles.btn1}>More Information</button>

      <div className={styles.cardsContainer}>
        <EventCard 
          backgroundColor="#E91E63" 
          Icon={FaTicketAlt} 
          title="Silver Plan" 
          price="$50" 
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores non, fugit doloribus ipsum."
        />
        <EventCard 
          backgroundColor="#9C27B0" 
          Icon={FaMusic} 
          title="Gold Plan" 
          price="$80" 
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores non, fugit doloribus ipsum."
        />
        <EventCard 
          backgroundColor="#4CAF50" 
          Icon={FaStar} 
          title="VIP Plan" 
          price="$120" 
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores non, fugit doloribus ipsum."
        />
      </div>

      <div className={styles.bestMomentsSection}>
        <h2 className={styles.sectionTitle}>Best Moments <span className={styles.sectionSubtitle}>From The Festival</span></h2>
        <p className={styles.sectionDescription}>Take a Picture to Capture Moments.</p>
        <Slider {...sliderSettings} className={styles.imageGrid}>
          <div className={styles.imageContainer}>
            <Image src={"/pexel.webp"} width={300} height={300} />
          </div>
          <div className={styles.imageContainer}>
            <Image src={"/pexels-photo-20757192.webp"} width={300} height={300} />
          </div>
          <div className={styles.imageContainer}>
            <Image src={"/pexels-photo.webp"} width={300} height={300} />
          </div>
          <div className={styles.imageContainer}>
            <Image src={"/piano.webp"} width={300} height={300} />
          </div>
        </Slider>
      </div>

      <div className={styles.havingFunSection}>
        <div className={styles.funTextContainer}>
          <h2 className={styles.funText}>HAVING FUN</h2>
        </div>
      </div>

      <div className={styles.followFacebookSection}>
        <FaFacebook size={50} />
        <p className={styles.followText}>Follow on Facebook</p>
        <button className={styles.btnFollow}>Follow</button>
      </div>
      <RecentArticles />
      <ContactGallery />

      <div className={styles.subscribeSection}>
        <Image src="/Untitled_Project-removebg-preview.png" alt="Noisy" width={100} height={100} />
        <p>Subscribe to our mailing list to get the updates to your email inbox.</p>
        <div className={styles.subscriptionForm}>
          <input type="email" placeholder="Enter your email here" />
          <button type="submit"><FaEnvelope /></button>
        </div>
        <div className={styles.socialIcons}>
          <FaFacebook />
          <FaGoogle />
          <FaTwitter />
          <FaLinkedin />
        </div>
        <p>Noise - Copyright {currentYear} Design by NoisyInc</p>
      </div>
    </>
  );
}

export default Page;
