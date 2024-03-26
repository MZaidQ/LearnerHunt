import React from "react";
import styles from "../styles/qrcode.module.css";
import Link from "next/link";
import Image from "next/image";

const QRCodeComponent = () => {
  function handleClick() {
    gtag("event", "Click", {
      event_category: "APPS",
      event_label: "Google Play",
    });
  }
  return (
    <section className={styles["learnhunt-app-section"]}>
      <div className="container">
        <div className="row">
          <div className="col-sm-7 col-xs-12">
            <div className={styles["app-cont"]}>
              <h2>
                Admission Information
                <br />
                through <span>LEARNERHUNT</span> App
              </h2>
              <p>
                Learnerhunt Info and admission app is here to provide all the
                admission info and solve related queries.
              </p>
              <div className="btn-outer">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.learnerhunt.app"
                  target="_blank"
                  onClick={handleClick}
                >
                  <Image
                    src="/assets/images/footer/google-play-icon.webp"
                    alt="Google Play"
                    width={150}
                    height={50}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-sm-5 col-xs-12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="/assets/images/footer/qrcode.webp"
              alt="QR Code"
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRCodeComponent;
