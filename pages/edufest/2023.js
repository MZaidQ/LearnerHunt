import React, { useEffect, useState } from "react";
import styles from "../../styles/fest.module.css";
import CallIcon from "@mui/icons-material/Call";
import { edufestCard } from "@/components/Comps/type";
import { edufestPhoto } from "@/components/Comps/type";
import { Bschool } from "@/components/Comps/type";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "react-bootstrap/Button";
import Link from "next/link";

export default function fest() {
  // console.log(edufestCard);
  const targetDate = new Date("2023-12-09T00:00:00").getTime();
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      // partialVisibilityGutter: 50, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      // partialVisibilityGutter: 80, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 1,
    },
  };
  return (
    <div className={styles.edufest}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          {/* Your logo */}
          <img src="/assets/images/Learnerhunt-Logo.webp" alt="Logo" />
        </div>
        {/* <div style={{display:"flex",alignItems:"center"}}> */}
        <div className={`${styles.registerButton} ${styles.blink}`}>
          {/* Register Now button */}
          <Link href="https://forms.gle/qutdeTDdbjHLKaNV6" target="blank">
            {" "}
            <button>Register Now</button>
          </Link>
        </div>
        <div className={styles.contactInfo}>
          {/* Your mobile number */}

          <p>
            <CallIcon style={styles.phoneicon} />
            <Link
              style={{ color: "black", textDecoration: "none" }}
              href="tel:+918010886959"
            >
              +918010886959
            </Link>
            ,
          </p>
          <p className={styles.secondphoneno}>
            <Link
              style={{ color: "black", textDecoration: "none" }}
              href="tel:+919811790857"
            >
              9811790857
            </Link>
          </p>
        </div>

        {/* </div> */}
      </nav>
      <div style={{ background: "#f2f5fa " }}>
        <div className={styles.banner}>
          <img
            className={styles.webbanner}
            src="/assets/images/edufest/banner.jpg"
            alt="webLogo"
          />
          <img
            className={styles.mobbanner}
            src="/assets/images/edufest/MobBanner.jpg"
            alt="mobLogo"
          />
        </div>

        <div className="container">
          {/* timer and register */}
          <div className={styles.content}>
            <h1>
              🎓 Discover Your Future at EduFest 2.0 (2023-24) - Unleash
              Opportunities in Learning!
            </h1>
            <p>
              🏆 Join us for an immersive experience at the EduFest 2.0
              (2023-24), where education meets innovation, and your future takes
              center stage.
            </p>
          </div>
          <div className={styles.Addressdate}>
            <div className="row">
              <div className="col-md-3">
                <h2>📚Educational Event</h2>
                <p>EduFest 2023</p>
              </div>
              <div className="col-md-2">
                <h2>🕒 Time</h2>
                <p>10AM onwards</p>
              </div>
              <div className="col-md-3">
                <h2>🗓️ Date</h2>
                <p>December 9, 2023</p>
              </div>
              <div className="col-md-4">
                <h2>📍 Location</h2>
                <p>
                  𝗥𝘂𝘀𝘀𝗶𝗮𝗻 𝗖𝗲𝗻𝘁𝗿𝗲 𝗼𝗳 𝗦𝗰𝗶𝗲𝗻𝗰𝗲 𝗮𝗻𝗱 𝗖𝘂𝗹𝘁𝘂𝗿𝗲 24, Firozeshah Rd, Vakil
                  Lane, Mandi House, New Delhi
                </p>
              </div>
            </div>

            <div
              style={{
                width: "calc(100% + 2px)",
                marginLeft: "-1px",
                padding: 0,
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                zIndex: "1050",
              }}
            >
              <div
                style={{
                  height: "20px",
                  width: "15px",
                  // border: "1px solid #C0C2C9",
                  borderRadius: "50px 0  0 50px",
                  background: "#f2f5fa",
                }}
              ></div>
              <div
                style={{
                  borderBottom: "3px dashed rgb(192, 194, 201)",
                  width: "calc(100% - 50px)",
                  height: "3px",
                }}
              ></div>
              <div
                style={{
                  height: "20px",
                  width: "15px",
                  // border: "1px solid #C0C2C9",
                  borderRadius: "0 50px 50px 0",
                  background: "#f2f5fa",
                }}
              ></div>
            </div>
            <div className="row" style={{ padding: "0.5rem 3rem 1rem 4rem" }}>
              <div className="col-md-8">
                <div className={styles.Timerclass}>
                  <span>
                    🕒{time.days}d:{time.hours}h:{time.minutes}m:{time.seconds}s
                  </span>
                </div>
                <div className={styles.Hurry}>
                  Hurry!{" "}
                  <span style={{ fontStyle: "italic" }}>
                    Limited Spots Available
                  </span>
                </div>
              </div>
              <div className="col-md-4" >
                <Link href="https://forms.gle/qutdeTDdbjHLKaNV6" target="blank" style={{marginLeft:"25px"}}>
                  <Button
                    style={{
                      marginTop:"15px",
                      color: "#fff",
                      fontSize: "20px",
                      fontWeight: "500",
                      background: "red",
                      height: "46px",
                      width: "170px",
                      border: ".9px solid transparent",
                    }}
                  >
                    REGISTER NOW
                  </Button>{" "}
                </Link>
                <div className={styles.secure}
                
                >
                  Secure your spot by registering{" "}
                  <span style={{ fontStyle: "italic" }}>FREE</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.benefits}>
            <h2>Benefits of attending</h2>
            <div className={styles.benefitscontainer}>
              <p style={{ marginBottom: "20px", fontWeight: "bold" }}>
                Welcome to the ultimate education fair that brings together top
                institutions, industry experts, and enthusiastic learners under
                one virtual roof. Explore a world of educational possibilities,
                uncover new career paths, and connect with like-minded
                individuals passionate about learning and growth opportunities.
              </p>
              <div>
                <h3 style={{ fontWeight: "bold" }}>Explore Diverse Courses</h3>
                <p>
                  🔍Browse through a wide range of courses and programs offered
                  by renowned institutions from around the pan india.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: "bold" }}>Pan India Networking</h3>
                <p>
                  🌐Connect with representatives from leading universities &
                  colleges Pan India. Forge valuable connections that can shape
                  your academic and professional journey.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: "bold" }}>Interactive Mock GD - PI</h3>
                <p>
                  📚Dive into hands-on one on one personalized by professionals.
                  Gain insights, develop skills, and discover the latest trends
                  in your field of interest.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: "bold" }}>Expert Panel Discussions</h3>
                <p>
                  🎙️Join thought-provoking discussions led by experts in various
                  fields. Get answers to your questions and stay informed about
                  the latest developments in education and careers.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: "bold" }}>
                  Scholarship Opportunities
                </h3>
                <p>
                  🏆 Learn about scholarship programs that can make your dream
                  education more affordable. Discover funding options and
                  financial aid resources.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.cards}>
            <div className="row">
              {edufestCard.map((e, index) => (
                <div className="col-md-3" style={{ margin: "14px 0px" }}>
                  <Card key={index} sx={{ maxWidth: 345, height: "100%" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="80" // Adjust the height as needed for your smaller image
                        width="80" // Adjust the width as needed for your smaller image
                        sx={{ alignSelf: "center", objectFit: "contain" }}
                        image={e.icon} // Change this to your image path
                        alt="Card Image"
                      />
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {e.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {e.para}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.logocontainer}>
          <div className="container">
            <div className={styles.TopBschool}>
              <div className="row">
                <h2>India's Top Business Schools & Universities</h2>
                {Bschool.map((e, index) => (
                  <div className="col-6 col-md-4 col-lg-2 d-flex justify-content-center align-items-center">
                    <div className={styles.BschoolCard}>
                      <img src={e.img} alt={index}></img>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.photocontainer}>
          <div className="container">
            <div className={styles.edufestPhoto}>
              <h2>Events through the years...</h2>
              <Carousel
                showDots={true}
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={2000}
                arrows={false}
                dotListclassName={styles["custom-dot-list-style"]}
                className={styles["react-multi-carousel-list"]}
              >
                {edufestPhoto.map((e, index) => (
                  <div className={styles.photos}>
                    <img src={e.img} alt={index}></img>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
