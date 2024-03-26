import React from "react";
import Image from "next/image";
import Head from "next/head";


const StructuredDataOrg = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Decred Digital Services Pvt. Ltd.",
    url: "https://www.learnerhunt.com",
    logo: "https://www.learnerhunt.com/assets/images/Learnerhunt-Logo.webp",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+918800756846",
        contactType: "customer service",
        email: "contact@learnerhunt.com"
      }
    ],
    description: "Learnerhunt is a digital platform for educational career counseling, offering comprehensive information about top colleges and universities in India and abroad that provide undergraduate programs, postgraduate programs, MBBS, and other professional courses. We have over 300 business schools and universities registered with us. We have become a trusted source of detailed information to assist you in making the right college and career decisions."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Educational Career Counseling",
    description: "Comprehensive educational career counseling services to help you make informed decisions about college and career paths.",
    url: "https://www.learnerhunt.com",
    provider: {
      "@type": "Organization",
      name: "Decred Digital Services Pvt. Ltd.",
      url: "https://www.learnerhunt.com",
      logo: "https://www.learnerhunt.com/assets/images/Learnerhunt-Logo.webp",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+918800756846",
        contactType: "customer service",
        email: "contact@learnerhunt.com"
      }
    }
  }
]
const AboutUsPage = () => {
  
  return (
    <>
    <Head>
    <title>
    About Us | Premier Educational Career Counseling Platform
        </title>
        <meta
          name="description"
          content="We leading digital platform providing comprehensive information on colleges, universities, courses & career counseling. Trusted by students & professional."
        />
        {/* <!-- Open Graph (OG) Tags --> */}
<meta property="og:title" content="About Us | Premier Educational Career Counseling Platform"/>
<meta property="og:description" content="We leading digital platform providing comprehensive information on colleges, universities, courses & career counseling. Trusted by students & professional."/>
<meta property="og:image" content="https://www.learnerhunt.com/assets/images/Learnerhunt-Logo.webp"/>
<meta property="og:url" content="https://www.learnerhunt.com"/>
<meta property="og:type" content="website"/>
  
  {/* <!-- Twitter Card --> */}
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="About Us | Premier Educational Career Counseling Platform"/>
<meta name="twitter:description" content="We leading digital platform providing comprehensive information on colleges, universities, courses & career counseling. Trusted by students & professional."/>
<meta name="twitter:image" content="https://www.learnerhunt.com/assets/images/Learnerhunt-Logo.webp"/>
<meta name="twitter:site" content="@learnerhunt"/>
<meta name="twitter:creator" content="@learnerhunt"/>
<script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(StructuredDataOrg),
          }}
        />
    </Head>
    <div className="container">
      <div className="row my-4">
        <div className="col-lg-8 col-sm-12">
          <h1>About Us</h1>
          <p>
            Learner Hunt is a digital platform for educational career
            counselling, providing detailed information related to educational
            institutions & universities offering Undergraduate Programs, Post
            Graduate Programs, MBBS, and other Professional Courses.
          </p>
          <p> It started
            its journey in September 2017 and presently housed at two locations
            in Faridabad (Sector 37 & Mathura road, Sector 11). Over 300+
            Business Schools and universities are registered with us.</p>
          <p>
            It is a Division of Decred Digital Services Pvt Ltd. Presently
            mastered to be a storehouse of detailed information to enable the
            selection of the right college & career decision. It holds a wide
            coverage of over 1000 colleges & universities, 150+ courses & more
            than 25 entrance exams.
          </p>
          <p>
            It has an endless list of offers to electrify the aspiring students
            and help them make a reliable decision for the future to follow.
          </p>
          <h2>Our Exceptional services:</h2>
          <ul>
            <li>Accurate guidance for the right courses</li>
            <li>Assisting in admissions & placements</li>
            <li>Varied courses - PGDM, MBA, B.Tech, BBA, BCA & many more</li>
            <li>
              College Locations covered - Delhi NCR, Pune, Mumbai, Bangalore,
              Hyderabad, & many more
            </li>
            <li>Form scholarship</li>
          </ul>
        </div>
        <div className="col-lg-4 ">
          <img
            src="/assets/images/about-us/about-us.webp"
            // className="img-fluid"
            alt="Logo"
            width={400}
            height={400}
          />
          {/* <Image
      width={350}
      height={350}
      src="/assets/images/about-us.webp"
      alt="Picture of the art"
      style={{objectFit:"fit"}}
    /> */}
        </div>
      </div>
      <div className="mt-20 " style={{ backgroundColor: "#87CEEB4D" }}>
        <div className="row">
          <div className=" col-12 text-center my-4 ">
            <h2 style={{ fontWeight: "bolder" }}>
              <strong>Who are we and what we do</strong>
            </h2>
            <p
              className="text-center mx-auto mt-2"
              style={{ maxWidth: "500px" }}
            >
              We are rapidly increasing educational portal who will provide you
              valueable information,counselling and guidance to help your career
              path wisely
            </p>
          </div>
        </div>
        <div className="row p-2">
          <div className=" col-md-4">
            <div className="card text-center p-4">
              <div style={{ width: "100%" }}>
                <img
                  src="/assets/images/about-us/courseimg.webp"
                  alt="Card image cap"
                  width={50}
                  height={50}
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">150+ Courses</h3>
                <p className="card-text">
                  Discover the year’s top best course and select the best
                </p>
              </div>
            </div>
          </div>
          <div className=" col-md-4">
            <div className="card text-center p-4">
                <div style={{ width: "100%" }}>
              <img
                src="/assets/images/about-us/collegeimg.webp"
                alt="Card image cap"
                width={50}
                height={50}
              />
              </div>
              <div className="card-body">
                <h3 className="card-title">1000+ Colleges</h3>
                <p className="card-text">
                Discover the best college with vivid choices
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-4">
            <div style={{ width: "100%" }}>
              <img
                src="/assets/images/about-us/counsellors.webp"
                alt="Card image cap"
                width={50}
                height={50}
              />
              </div>
              <div className="card-body">
                <h3 className="card-title">25 Counsellors</h3>
                <p className="card-text">
                Get counselling from the best counsellors 
                </p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    </>
  );
};

export default AboutUsPage;
