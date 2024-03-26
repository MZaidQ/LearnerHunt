// components/WhatsAppButton.js
import { useState,useEffect } from 'react';
import styles from '../styles/Whatsup.module.css'; // Import the module CSS file
import Image from 'next/image';
import Link from 'next/link';

const WhatsAppButton = () => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const openWhatsApp = () => {
    // Replace 'YOUR_WHATSAPP_URL' with the actual WhatsApp URL you want to open.
    window.open('https://wa.me/+918800756846', '_blank');
    setIsWhatsAppOpen(true);
  };
  

  return (
    <div
      className={`${styles['whatsapp-button']} ${isWhatsAppOpen ? styles.open : ''}`}
      onClick={openWhatsApp}
    >
        <Link href='https://wa.me/+918800756846'><Image id="whatsapp-image" src='/assets/images/whatsapp.png' width={50} height={50} alt='whatsup'></Image></Link>
      {/* <button>Open WhatsApp</button> */}
    </div>
  );
};

export default WhatsAppButton;
