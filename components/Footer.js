import React from "react";
import Link from "next/link";
// import Head from "next/head";
import Image from "next/image";
import QrCodeSection from '@/components/QrCodeSection'

const Footer = () => {
  return (
    <>
      {/* <Head>
        <script
          async
          type="text/javascript"
          src="//s2.tracemyip.org/vLg/lgUrl.php?pidnVar2=101878&amp;prtVar2=2&amp;stlVar2=1105&amp;rgtype=4684NR-IPIB&amp;scvVar2=12&amp;gustVarS=2&amp;gustVarU=72734&amp;gustVarM=2"
        ></script>
   
      </Head> */}
      <QrCodeSection />

      <div className="custom_footer">
        <div className="container">
          <div className="custom-row">
            <div className="custom-col">
              <h3>Featured Colleges</h3>
              <ul>
                <li>
                  <Link href="/colleges/soil-institute-of-management">
                    SOIL Institute of Management
                  </Link>
                </li>
                <li>
                  <Link href="/colleges/-itm-information-technology-management-">
                    [ITM] INFORMATION TECHNOLOGY MANAGEMENT
                  </Link>
                </li>
                <li>
                  <Link href="/colleges/bml-munjal-university">
                    BML Munjal University
                  </Link>
                </li>
              </ul>
            </div>
            <div className="custom-col">
              <h3>Top Universities</h3>
              <ul>
                <li>
                  <Link href="/colleges/-upes-university-of-petroleum-and-energy-studies">
                    (UPES) University of Petroleum and Energy Studies
                  </Link>
                </li>
                <li>
                  <Link href="/colleges/atlas-skilltech-university">
                    ATLAS SkillTech University
                  </Link>
                </li>
                <li>
                  <Link href="/colleges/alliance-university">
                    Alliance University
                  </Link>
                </li>
              </ul>
            </div>
            <div className="custom-col">
              <h3>Top Exams</h3>
              <ul>
                <li>
                  <Link href="/exams/Joint-Entrance-Examination-Main">
                    JEE Mains
                  </Link>
                </li>
                <li>
                  <Link href="/exams/Joint-Entrance-Examination-Advanced">
                    JEE Advanced
                  </Link>
                </li>
                <li>
                  <Link href="/exams/National-Eligibility-cum-Entrance-Test">
                    NEET
                  </Link>
                </li>
              </ul>
            </div>
            <div className="custom-col">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link href="/privacy">Privacy policy</Link>
                </li>
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="/sitemap.xml">Site Map</Link>
                </li>
              </ul>
            </div>
            <div className="custom-col">
              <h3>Contact Us</h3>
              <ul className="last-ul">
                <li>
                  <Link href="mailto:contact@learnerhunt.com">
                    contact@learnerhunt.com
                  </Link>
                </li>
                <li>
                  <Link href="tel:+918800756846">+918800756846</Link>
                </li>
                <li>
                  <address>
                    SCF 1, 2nd Floor, Shopping Complex, Ashoka Enclave Part II,
                    Sector 37, Faridabad, Haryana 121003
                  </address>
                </li>
              </ul>
            </div>
          </div>
          <div className="row flex-column-reverse flex-sm-row">
            <div className="col-lg-5 col-md-5">
              <p className="cmp-name">
                © 2023 Decred Digital Services Pvt. Ltd.
              </p>
            </div>
            <div className="col-lg-2 col-md-2">
              <div
                id="elemID031021"
                style={{lineHeight:"16px",textAlign:"center",position:"relative",zIndex:"100000"}}
              >
              
                <div>
                  <a
                    title="Website visitors visitor Ip address stats"
                    href="https://www.tracemyip.org/pv1-2-72734-2"
                  >
                    
                    <img
                      src="//s2.tracemyip.org/vLg/1105/4684NR-IPIB/101878/2/12/ans/"
                      alt="website visitors visitor Ip address stats"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{border:"0px"}}
                    />
                  </a>
                  </div>
               
                  
              </div>
            </div>
            <div className="col-lg-5 col-md-5">
              <div className="social-media">
                <Link
                  target="_blank"
                  href="https://www.facebook.com/learnerhunt/"
                >
                      <Image
      src="/assets/images/footer/facebook.webp"
      alt="facebook"
      width={50}
      height={50}
    />
                </Link>
                <Link target="_blank" href="https://twitter.com/learnerhunt">
                  
                  <Image
                    src="/assets/images/footer/twitter.webp"
                    alt="twitter"
                    width={50}
                    height={50}
                  />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.instagram.com/learnerhunt_india/"
                >
                  <Image
                    src="/assets/images/footer/instagram.webp"
                    alt="instagram"
                    width={50}
                    height={50}
                  />
                </Link>
                <Link
                  target="_blank"
                  href="https://in.linkedin.com/company/learnerhunt-com"
                >
                  <Image
                    src="/assets/images/footer/linkedin.webp"
                    alt="linkedIn"
                    width={50}
                    height={50}
                  />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.youtube.com/@Learnerhunt"
                >
                  <Image
                    src="/assets/images/footer/youtube.webp"
                    alt="youtube"
                    width={50}
                    height={50}
                  />
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="flex-column-reverse flex-sm-row d-md-none">
            <div className="col-lg-5 col-md-5">
              <p className="cmp-name">
                © 2023 Decred Digital Services Pvt. Ltd.
              </p>
            </div>
            <div className="col-lg-2 col-md-2">
              <div
                id="elemID031021"
                style={{lineHeight:"16px",textAlign:"center",position:"relative",zIndex:"100000"}}
              >
              
                <div>
                  <a
                    title="Website visitors visitor Ip address stats"
                    href="https://www.tracemyip.org/pv1-2-72734-2"
                  >
                    <Image
                      src="//s2.tracemyip.org/vLg/1105/4684NR-IPIB/101878/2/12/ans/"
                      alt="website visitors visitor Ip address stats"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{border:"0px"}}
                    />
                  </a>
                  </div>
              
                  
              </div>
            </div>
            <div className="col-lg-5 col-md-5">
              <div className="social-media">
                <Link
                  target="_blank"
                  href="https://www.facebook.com/learnerhunt/"
                >
                  <Image
                    src="/assets/images/footer/facebook.webp"
                    alt="facebook"
                    width={50}
                    height={50}
                  />
                </Link>
                <Link target="_blank" href="https://twitter.com/learnerhunt">
                  <Image
                    src="/assets/images/footer/twitter.webp"
                    alt="twitter"
                    width={50}
                    height={50}
                  />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.instagram.com/learnerhunt_india/"
                >
                  <Image
                    src="/assets/images/footer/instagram.webp"
                    alt="instagram"
                    width={50}
                    height={50}
                  />
                </Link>
                <Link
                  target="_blank"
                  href="https://in.linkedin.com/company/learnerhunt-com"
                >
                  <Image
                    src="/assets/images/footer/linkedin.webp"
                    alt="linkedIn"
                    width={50}
                    height={50}
                  />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.youtube.com/@Learnerhunt"
                >
                  <Image
                    src="/assets/images/footer/youtube.webp"
                    alt="youtube"
                    width={50}
                    height={50}
                  />
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
