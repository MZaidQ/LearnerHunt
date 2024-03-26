import Head from "next/head";
import React, { useState } from "react";
import { IndianStates } from "/components/Comps/StatesIndia";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function isbr() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [course, setCourse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSumbit = async (e) => {
    // console.log("hello");
    e.preventDefault();
    if (name == "") {
      alert("Enter Correct Name");
      let element = document.getElementById("name"); // Assuming the element ID is 'myElement'
      element.focus();
    } else if (email == "") {
      alert("Enter Correct Email Address");
      let element = document.getElementById("email"); // Assuming the element ID is 'myElement'
      element.focus();
    } else if (mobile == "") {
      alert("Enter Correct Mobile Number");
      let element = document.getElementById("mobile"); // Assuming the element ID is 'myElement'
      element.focus();
    } else if (mobile.length > 10 || mobile.length < 10) {
      alert("Enter Correct Mobile Number");
      let element = document.getElementById("mobile"); // Assuming the element ID is 'myElement'
      element.focus();
    } else if (state == "") {
      alert("Enter State");
      let element = document.getElementById("state"); // Assuming the element ID is 'myElement'
      element.focus();
    } else if (city == "") {
      alert("Enter City");
      let element = document.getElementById("city"); // Assuming the element ID is 'myElement'
      element.focus();
    } else if (course == "") {
      alert("Enter Course");
      // let element = document.getElementById("course"); // Assuming the element ID is 'myElement'
      // element.focus();
    } else {
      const hitApi = (ip) => {
        const fd = new FormData();
        fd.append("name", name);
        fd.append("email", email);
        fd.append("mobile", mobile);
        fd.append("state", state);
        fd.append("city", city);
        fd.append("course", course);
        fd.append("collegeid", "64df57b7dcff726b15aebaac");
        fd.append("ipv4", ip);
        fetch(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/landingpagelead",
          {
            method: "POST",
            body: fd,
          }
        )
          .then(async (response) => {
            //   console.log(response)
            if (response.ok) {
              var res = await response.json();
              router.push("/ads/thankupageisbr");
            } else {
              var res = await response.json();
              alert(res.error);
            }
          })
          .catch((error) => {
            alert(error);
          });
      };

      setIsLoading(true);
      try{
        const ipData = await fetch("https://geolocation-db.com/json/");
        const ipJsonData = await ipData.json();
        hitApi(ipJsonData.IPv4 ? ipJsonData.IPv4 : "")
      }catch(e){
        hitApi("")
      }
      
      
      
    }
  };

  return (
    <>
      <Head>
        <title>ISBR</title>
        <link rel="stylesheet" href="/assets/css/isbrstyle.css" />
        <link rel="stylesheet" href="/assets/css/isbrbootstrap.css" />
        <link rel="stylesheet" href="/assets/css/isbrresponsive.css" />
        <link rel="stylesheet" href="/assets/css/isbrslick.css" />
        <link rel="stylesheet" href="/assets/css/isbrslick-theme.css" />
      </Head>
      {/* <div className="loader loader_9" style="display: none">
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    </div> */}
      <div className="main_part">
        <section className="banner">
          <div className="banner_img">
            <img
              src="/assets/images/isbr/banner.jpg"
              className="img-fluid"
              alt="banner"
            />
          </div>
          <div className="logo">
            <img
              src="/assets/images/isbr/logo.png"
              className="img-fluid"
              alt="logo"
            />
          </div>
          <div className="banner_part">
            <div className="banner-content">
              <div className="banner-box">
                <h4>Programme Offered</h4>
                <h1>
                  PGDM<span> & </span>
                  MBA 2024
                </h1>
                <h5>Immersive . Innovative . Impactful </h5>
              </div>
              <div className="banner_btn">
                <a href="#">Admissions Open</a>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="topenq desktop">
            <a href="#" className="btn">Enquire Now</a>
        </div> */}
        {/* <div className="topenq1 mobile">
            <a href="javascript:void(0)" className="btn">Enquire Now</a>
        </div> */}
        <div className="form-sec" id="home">
          <div className="form">
            <div
              className="npf_wgts"
              data-height="400px"
              data-w="c8afbc55b5ee7325aff665a310044845"
            ></div>
            <div className="adm-txt" style={{ color: "#c64327" }}>
              <strong>Enquiry Now</strong>
            </div>
            <div className="form-group Name">
              <input
                type="text"
                className="input"
                name="name"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="form-group email">
              <input
                type="email"
                className="input"
                name="email"
                id="email"
                placeholder="Email id "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="form-group Mobile">
              <input
                type="number"
                className="input"
                name="mobile"
                id="mobile"
                placeholder="Phone"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="form-group State">
              <select
                className="input"
                name="state"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State*</option>
                {Object.keys(IndianStates["India"]).map((c, i) => {
                  return (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group City">
              <select
                className="input"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Select City</option>
                {state != "" &&
                  IndianStates["India"][state].map((c, i) => {
                    return (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group">
              <select
                className="input"
                name="course"
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                <option value="PGDM (General)">PGDM (General)</option>
                <option value="MBA">MBA</option>
              </select>
            </div>
            <div className="sb-btn-sec">
              {/* <div className="term text-muted">
                        <label className="checkbox-label">
                            <input type="checkbox" name="agree" id="agree" checked="checked"/>
                            <span className="checkmark"></span>I grant permission to isbr to contact me </label>
                    </div> */}
              <input
                type="button"
                className="sbt"
                id="apply_now"
                onClick={handleSumbit}
                value={isLoading ? "Wait..." : "Submit"}
                disabled={isLoading}
              />
              <span id="sbt"></span>
            </div>
          </div>
        </div>
        <section className="move">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="heading_top ">
                  <h2>
                    Move away from the ordinary
                    <br />& <span>choose ISBR</span>
                  </h2>
                </div>
                <div className="move_slider">
                  <div className="item">
                    <div className="first_row">
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/icon-1.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                        <p>
                          Foundation
                          <br />
                          Courses
                        </p>
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/icon-2.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                        <p>
                          Core
                          <br />
                          Courses
                        </p>
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/icon-3.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                        <p>
                          Concentration
                          <br />
                          Courses
                        </p>
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/icon-4.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                        <p>
                          Leadership
                          <br />
                          Lab
                        </p>
                      </div>
                    </div>
                    <div className="first_row">
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/icon-5.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                        <p>
                          Finance <br />
                          Lab
                        </p>
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/icon-6.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                        <p>
                          Character
                          <br />
                          Lab
                        </p>
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/icon-7.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                        <p>
                          International Guest
                          <br />
                          Lecture Series
                        </p>
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/icon-8.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                        <p>
                          Life Skill
                          <br />
                          Boot Camp
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="move_slider-2">
                  <div className="item">
                    <div className="first_row">
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/icon-1.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                        <p>
                          Foundation
                          <br />
                          Courses
                        </p>
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/icon-2.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                        <p>
                          Core
                          <br />
                          Courses
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="academic">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="heading_top">
                  <h2>
                    <span>Academic</span> Initiatives
                  </h2>
                </div>
                <div className="academic_slider">
                  <div className="item">
                    <div className="image_content">
                      <div className="image_part_acade">
                        <img
                          src="/assets/images/isbr/academic_img-6.jpg"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <p>
                        Industry Demanded
                        <br />
                        Career Courses
                      </p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="image_content">
                      <div className="image_part_acade">
                        <img
                          src="/assets/images/isbr/academic_img-7.jpg"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <p>
                        Concentration courses-
                        <br />
                        based on the JDs co-designed
                        <br />
                        and co-taught by corporates
                      </p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="image_content">
                      <div className="image_part_acade">
                        <img
                          src="/assets/images/isbr/academic_img-8.jpg"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <p>
                        Life Skill
                        <br />
                        Boot Camps
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="recruiters">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="heading_top">
                  <h2>
                    Key <span>Recruiters</span>
                  </h2>
                </div>
                <div className="move_slider">
                  <div className="item">
                    <div className="first_row">
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-17.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-18.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-19.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-9.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-1.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-2.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                    </div>
                    <div className="first_row">
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-11.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-22.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-12.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-24.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-3.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                      <div className="icon">
                        <img
                          src="/assets/images/isbr/recruiter_img-4.png"
                          className="img-fluid"
                          alt="icon-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="move_slider-3 slick-initialized slick-slider">
                  <div className="slick-list draggable">
                    <div className="slick-track">
                      <div
                        className="item slick-slide slick-cloned"
                        id=""
                        aria-hidden="true"
                      >
                        <div className="first_row">
                          <div className="icon">
                            <img
                              src="/assets/images/isbr/recruiter_img-17.png"
                              className="img-fluid"
                              alt="icon-1"
                            />
                          </div>
                          <div className="icon">
                            <img
                              src="/assets/images/isbr/recruiter_img-18.png"
                              className="img-fluid"
                              alt="icon-1"
                            />
                          </div>
                          <div className="icon">
                            <img
                              src="/assets/images/isbr/recruiter_img-19.png"
                              className="img-fluid"
                              alt="icon-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <p className="text-center">
            2023 Copyright © learnerhunt.com. All rights reserved.
          </p>
          <div
                id="elemID031021"
                style={{lineHeight:"16px",textAlign:"center",position:"relative",zIndex:"100000"}}
              >
              
                {/* <noscript> */}
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
                  {/* <script
          async
          type="text/javascript"
          src="//s2.tracemyip.org/vLg/lgUrl.php?pidnVar2=101878&amp;prtVar2=2&amp;stlVar2=1105&amp;rgtype=4684NR-IPIB&amp;scvVar2=12&amp;gustVarS=2&amp;gustVarU=72734&amp;gustVarM=2"
        ></script> */}
                {/* </noscript> */}
                  
              </div>
        </footer>
      </div>
    </>
  );
}
