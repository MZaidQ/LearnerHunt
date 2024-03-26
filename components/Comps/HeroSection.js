import React, { useRef, useState } from "react";
import Styles from "/styles/landing.module.css";
import { IndianStates } from "/components/Comps/StatesIndia";
import { useRouter } from "next/router";
const programs = [
  {
    name: "Marketing",
    value: "Marketing",
  },
  {
    name: "Finance",
    value: "Finance",
  },
  {
    name: "Human Resource Management",
    value: "Human Resource Management",
  },
  {
    name: "Media Marketing & Communication",
    value: "Media Marketing & Communication",
  },
  {
    name: "International Business",
    value: "International Business",
  },
  {
    name: "E-Commerce & Information Technology",
    value: "E-Commerce & Information Technology",
  },
  {
    name: "Digital Marketing",
    value: "Digital Marketing",
  },
  {
    name: "Operations & Supply Chain Management",
    value: "Operations & Supply Chain Management",
  },
  {
    name: "Business Analytics",
    value: "Business Analytics",
  },
  {
    name: "Entrepreneurship",
    value: "Entrepreneurship",
  },
  {
    name: "AI (Artificial Intelligence)",
    value: "AI (Artificial Intelligence)",
  },
  {
    name: "MBA Executive",
    value: "MBA Executive",
  },
];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HeroSection = ({ inputRef }) => {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [mobile, setMobile] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [state, setState] = useState("");
  const [isStateValid, setIsStateValid] = useState(true);
  const [course, setCourse] = useState("");
  const [isCourseValid, setIsCourseValid] = useState(true);
  const [isLoading,setIsLoading]= useState(false)

  const router = useRouter();
  const { pathname } = router;
  console.log(pathname)

  const handleMobileChange = (event) => {
    const input = event.target.value;

    // Remove any non-numeric characters
    const numericInput = input.replace(/\D/g, "");

    // Limit to 10 characters
    const limitedInput = numericInput.slice(0, 10);

    setMobile(limitedInput);
    setIsMobileValid(true);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("hello world");
    if (name == "") {
      setIsNameValid(false);
    } else if (email == "" || !emailRegex.test(email)) {
      setIsEmailValid(false);
    } else if (mobile == "" || mobile.length < 10) {
      setIsMobileValid(false);
    } else if (state == "") {
      setIsStateValid(false);
    } else if (course == "") {
      setIsCourseValid(false);
    } else {
      console.log("api hit");
      const hitApi = (ip) => {
          const fd = new FormData();
          fd.append("name", name);
          fd.append("email", email);
          fd.append("mobile", mobile);
          fd.append("state", state);
          fd.append("course", course);
          fd.append("slug", pathname);
          fd.append("ipv4", ip);
          fetch(
            process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/learnerhunt-landingpagelead",
            {
              method: "POST",
              body: fd,
            }
          )
            .then(async (response) => {
              //   console.log(response)
              if (response.ok) {
                var res = await response.json();
                router.push("/ads/commonthankupage");
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
        // try{
        //   const ipData = await fetch("https://geolocation-db.com/json/");
        //   const ipJsonData = await ipData.json();
        //   hitApi(ipJsonData.IPv4 ? ipJsonData.IPv4 : "")
        // }catch(e){
          hitApi("")
        // }
    }
  };
  return (
    <>
      <div className={Styles["hero-outer-section"]}>
        <div className={Styles["HomePageHero_overlay"]}></div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 d-flex align-items flex-column justify-content-evenly">
              <div className={Styles["content-section-top"]}>
                <h1 className="text-center text-md-start">
                  Welcome to Learner Hunt - Your Gateway to Premier Career
                  Consultation
                </h1>
                <hr />
                <h3 className="text-center text-md-start">
                  Stand Out in the MBA Crowd
                </h3>
                <hr className="d-block d-md-none" />
              </div>
              <div className={Styles["content-section-bottom"]}>
                {/* <p className="text-center text-md-start">
                  Join 16,000+ Successful Alumni
                </p>
                <hr className="d-block d-md-none" />
                <p className="text-center text-md-start">
                  30+ Years of Management Excellence!
                </p> */}
                <div className={Styles["img-section"]}>
                  <img
                    src="/assets/Landing/clg-logos.webp"
                    alt="College logos"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className={Styles["right-section-div"]}>
                <p className="text-center text-white font-30">
                  Get Free Consultation!
                </p>
                <hr className="text-white" />
                <div className={Styles["form-section"]}>
                  <form
                    onSubmit={handleFormSubmit}
                    className="needs-validation"
                  >
                    <div className="mb-3">
                      <input
                        type="text"
                        ref={inputRef}
                        className={`form-control ${
                          !isNameValid ? "is-invalid" : ""
                        }`}
                        placeholder="Enter name *"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setIsNameValid(true);
                        }}
                      />
                      {!isNameValid && (
                        <div className="invalid-feedback">Invalid name</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className={`form-control ${
                          !isEmailValid ? "is-invalid" : ""
                        }`}
                        placeholder="Enter email *"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setIsEmailValid(true);
                        }}
                      />
                      {!isEmailValid && (
                        <div className="invalid-feedback">Invalid email</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          !isMobileValid ? "is-invalid" : ""
                        }`}
                        placeholder="Enter number *"
                        value={mobile}
                        onChange={(e) => handleMobileChange(e)}
                      />
                      {!isMobileValid && (
                        <div className="invalid-feedback">
                          Invalid mobile number
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <select
                        className={`form-select ${
                          !isStateValid ? "is-invalid" : ""
                        }`}
                        // className="form-select is-invalid"
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value), setIsStateValid(true);
                        }}
                      >
                        <option value="" disabled>
                          Select state *
                        </option>
                        {Object.keys(IndianStates["India"]).map((c, i) => {
                          return (
                            <option key={i} value={c}>
                              {c}
                            </option>
                          );
                        })}
                      </select>
                      {!isStateValid && (
                        <div className="invalid-feedback">Please select state</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <select
                        className={`form-select ${
                          !isCourseValid ? "is-invalid" : ""
                        }`}
                        // className="form-select is-invalid"
                        value={course}
                        onChange={(e) => {
                          setCourse(e.target.value), setIsCourseValid(true);
                        }}
                      >
                        <option value="" disabled>
                          Interested Program *
                        </option>
                        {programs.map((c, i) => {
                          return (
                            <option key={i} value={c.value}>
                              {c.name}
                            </option>
                          );
                        })}
                      </select>
                      {!isCourseValid && (
                        <div className="invalid-feedback">
                          Please select program
                        </div>
                      )}
                    </div>
                    <button type="submit" disabled={isLoading?true:false} className="btn btn-primary w-100">
                  {isLoading ? "Wait..." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
