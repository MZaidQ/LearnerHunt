import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Form, Button, Modal, Row, Col, Spinner } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import Carousel, { CarouselItem } from "./CarouselItem";
import { IndianStates } from "/components/Comps/StatesIndia";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ExpinYear } from "@/components/Comps/type";

import Classes from "/styles/searchmodal.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Loginuc({ isOpen, onClose, role }) {
  const initialTimer = 120; // 120 seconds (2 minutes)
  const [timer, setTimer] = useState(initialTimer);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [showotp, setShowotp] = useState(false);
  const [loginpassword, setLoginPassword] = useState("");
  const [loginwithpassword, setLoginwithPassword] = useState(false);
  const [signupshowotp, setSignShowotp] = useState(false);
  const [userotp, setUserotp] = useState("");
  const [signupuserotp, setSignupuserotp] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  // modal of search for college
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isApiHitComplete, setIsApiHitComplete] = useState(true);
  const [results, setResults] = useState([]);

  // student signup
  const [signupemail, setSignupEmail] = useState("");
  const [name, setName] = useState(""); // Add state for name
  const [mobile, setMobile] = useState(""); // Add state for mobile
  const [stream, setStream] = useState(""); // Add state for stream
  const [level, setLevel] = useState(""); // Add state for level
  const [password, setPassword] = useState(""); // Add state for password

  // college signup
  const [clgname, setClgName] = useState(""); // Add state for name
  const [adminname, setAdminName] = useState(""); // Add state for name
  // const [clgSignupemail, setClgSignupEmail] = useState("");
  const [clgmobile, setClgMobile] = useState(""); // Add state for mobile
  // const [clgLandline, setClgLandline] = useState(""); // Add state for mobile
  const [designation, setDesignation] = useState(""); // Add state for mobile
  const [referrer, setReferrer] = useState(""); // Add state for mobile
  const [linkedIn, setLinkedIn] = useState(""); // Add state for mobile


  const [lastOtpSentTime, setLastOtpSentTime] = useState(null);

  // counsollor signup
  const [counsellorname, setCounsellorname] = useState("");
  const [counsellormobile, setCounsellormobile] = useState("");
  const [counsellorstate, setCounsellorstate] = useState(""); 
  const [counsellorcity, setCounsellorcity] = useState(""); 
  const [counsellorexp, setCounsellorexp] = useState(""); 




  let countdown; // Define countdown outside of useEffect

  // Function to start the timer
  const startTimer = () => {
    setResendDisabled(true);
    countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          setShowotp(true);
          setResendDisabled(false);
          return initialTimer; // Reset the timer to its initial value
        }
        return prevTimer - 1;
      });
    }, 1000); // Update the timer every 1 second
  };

  const router = useRouter();

  useEffect(() => {
    let timeoutId;
    const fetchSearchResults = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          "/miscellaneous/global-search?term=" +
          searchTerm
      );
      const data = await response.json();
      var rs = data.data.filter((s) => s.type == "college");
      // console.log(data);
      if(role == 1){
        if (rs.length == 0) {
          rs = [{ title: "+ Add New", slug: "", type: "-1" }];
        }
      }
      
      setResults(rs);
      setIsApiHitComplete(true);
    };

    if (searchTerm.trim().length > 2) {
      setIsApiHitComplete(false);
      timeoutId = setTimeout(fetchSearchResults, 500);
    } else {
      setResults([]);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  useEffect(() => {
    // let countdown;
    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(countdown);
      setShowotp(true);
    };
  }, [initialTimer]); // Add initialTimer as a dependency

  const handleSignupLinkClick = () => {
    setShowSignup(true);
    setShowotp(false); // Close OTP form if open
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const Studentregister = () => {
    if (loginwithpassword) {
      try {
        const fd = new FormData();
        fd.append("email", email);
        fd.append("password", loginpassword);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/login", {
          method: "POST",
          body: fd,
        }).then(async (response) => {
          // console.log(response)
          if (response.ok) {
            var res = await response.json();
            // console.log(res)
            // console.log(res.data)
            // console.log(res.data.email)
            var userstatus = res.data.status;
            var userid = res.data.token;
            var useremail = res.data.email;

            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsloading(false);
              onClose();
              localStorage.setItem("status", userstatus);
              localStorage.setItem("userid", userid);
              localStorage.setItem("useremail", useremail);
              window.location.reload();
            });
          } else {
            var res = await response.json();
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsloading(false);
              // onClose()
            });
          }
        });
      } catch (error) {
        console.error("Failed to fetch OTP:", error);
      }
    } else {
      try {
        setIsloading(true);
        const fd = new FormData();
        fd.append("email", email);
        // fd.append("otp", otp);
        // fd.append("role", role);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/get-otp", {
          method: "POST",
          body: fd,
        }).then(async (response) => {
          var res = await response.json();
          // console.log(res.message)
          if (response.ok) {
            // console.log("hello", response.data);
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsloading(false);
              setShowotp(true);
              startTimer();
            });
            // router.push('/thankyou')
          } else {
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsloading(false);
            });
          }
        });
      } catch (error) {
        console.error("Failed to fetch OTP:", error);
      }
    }
  };

  const handleStudentSubmit = (event) => {
    event.preventDefault();
    if (showSignup) {
      if (signupshowotp) {
        try {
          const fd = new FormData();
          fd.append("email", signupemail);
          fd.append("otp", signupuserotp);
          fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/login", {
            method: "POST",
            body: fd,
          }).then(async (response) => {
            if (response.ok) {
              var res = await response.json();
              var userstatus = res.data.status;
              var userid = res.data.token;
              var useremail = res.data.email;
              var role = res.data.role;
              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then(() => {
                setIsloading(false);
                onClose();
                localStorage.setItem("status", userstatus);

                localStorage.setItem("useremail", useremail);

                if (role == 3) {
                  localStorage.setItem("userid", userid);
                  window.location.reload();
                } else if (role == 1) {
                  router.push("/collegeportal/my-kyc");
                  localStorage.setItem("ct", userid);
                }else{
                  router.push("/counsellorportal/my-profile");
                  localStorage.setItem("cst", userid);
                }
              });
            } else {
              var res = await response.json();
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              }).then(() => {
                setIsloading(false);
                // onClose()
              });
            }
          });
        } catch (error) {
          console.error("Failed to fetch OTP:", error);
        }
      } else {
        try {
          const fd = new FormData();
          if (role == 3) {
            fd.append("email", signupemail);
            fd.append("name", name); // Add name to form data
            fd.append("mobile", mobile); // Add mobile to form data
            fd.append("stream", stream); // Add stream to form data
            fd.append("level", level); // Add level to form data
            fd.append("password", password); // Add password to form data
            fd.append("role", role);
            fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/signup", {
              method: "POST",
              body: fd,
            }).then(async (response) => {
              var res = await response.json();
              // console.log(res.message)
              if (response.ok) {
                // console.log("hello", response.data);
                Swal.fire({
                  title: "Success",
                  text: `${res.message}`,
                  icon: "success",
                  confirmButtonText: "Ok",
                }).then(() => {
                  // console.log("done")
                  setSignShowotp(true);
                  // setIsloading(false);
                  // setShowotp(true);
                });
              } else {
                Swal.fire({
                  title: "error",
                  text: `${res.error}`,
                  icon: "error",
                  confirmButtonText: "Ok",
                });
              }
            });
          } else if (role == 1) {
            fd.append("college_name", clgname); // Add name to form data
            fd.append("name", adminname);
            fd.append("email", signupemail); // Add mobile to form data
            // fd.append("stream", clgLandline); // Add stream to form data
            fd.append("mobile", clgmobile); // Add level to form data
            fd.append("designation", designation);
            fd.append("linked_in_link", linkedIn); // Add password to form data
            fd.append("referrer", referrer);
            fetch(
              process.env.NEXT_PUBLIC_API_ENDPOINT + "/clg-admin/register",
              {
                method: "POST",
                body: fd,
              }
            ).then(async (response) => {
              var res = await response.json();
              // console.log(res.message)
              if (response.ok) {
                // console.log("hello", response.data);
                Swal.fire({
                  title: "Success",
                  text: `${res.message}`,
                  icon: "success",
                  confirmButtonText: "Ok",
                }).then(() => {
                  // console.log("done")
                  setSignShowotp(true);
                  // setIsloading(false);
                  // setShowotp(true);
                });
              } else {
                Swal.fire({
                  title: "error",
                  text: `${res.error}`,
                  icon: "error",
                  confirmButtonText: "Ok",
                });
              }
            });
          } else {
            fd.append("college_name", clgname); // Add name to form data
            fd.append("name", counsellorname);
            fd.append("email", signupemail); // Add mobile to form data
            // fd.append("stream", clgLandline); // Add stream to form data
            fd.append("mobile", counsellormobile); // Add level to form data
            fd.append("state", counsellorstate);
            fd.append("city", counsellorcity); // Add password to form data
            fd.append("experience", counsellorexp);
            fetch(
              process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/register",
              {
                method: "POST",
                body: fd,
              }
            ).then(async (response) => {
              var res = await response.json();
              // console.log(res.message)
              if (response.ok) {
                // console.log("hello", response.data);
                Swal.fire({
                  title: "Success",
                  text: `${res.message}`,
                  icon: "success",
                  confirmButtonText: "Ok",
                }).then(() => {
                  // console.log("done")
                  setSignShowotp(true);
                  // setIsloading(false);
                  // setShowotp(true);
                });
              } else {
                Swal.fire({
                  title: "error",
                  text: `${res.error}`,
                  icon: "error",
                  confirmButtonText: "Ok",
                });
              }
            });
          }
        } catch (error) {
          // Handle network or fetch error
          console.error("Failed to fetch OTP:", error);
        }
      }
    } else {
      if (showotp) {
        setIsloading(true);
        try {
          const fd = new FormData();
          fd.append("email", email);
          fd.append("otp", userotp);
          fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/login", {
            method: "POST",
            body: fd,
          }).then(async (response) => {
            // console.log(response)
            if (response.ok) {
              var res = await response.json();
              // console.log(res)
              // console.log(res.data)
              // console.log(res.data.email)
              var userstatus = res.data.status;
              var userid = res.data.token;
              var useremail = res.data.email;
              var role = res.data.role;

              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then(() => {
                setIsloading(false);
                onClose();
                localStorage.setItem("status", userstatus);

                localStorage.setItem("useremail", useremail);

                if (role == 3) {
                  localStorage.setItem("userid", userid);

                  window.location.reload();
                } else if (role == 1) {
                  localStorage.setItem("ct", userid);
                  router.push("/collegeportal/my-kyc");
                }else{
                  router.push("/counsellorportal/my-profile");
                  localStorage.setItem("cst", userid);
                }
              });
            } else {
              var res = await response.json();
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              }).then(() => {
                setIsloading(false);
                // onClose()
              });
            }
          });
        } catch (error) {
          console.error("Failed to fetch OTP:", error);
        }
      } else {
        Studentregister();
      }
    }
  };

  const handleSignupOtpChange = (event) => {
    setSignupuserotp(event.target.value);
  };

  const handleOtpChange = (event) => {
    // console.log(event.target.value);
    setUserotp(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSignupEmailChange = (event) => {
    setSignupEmail(event.target.value);
  };
  const handleMobileChange = (event) => {
    const input = event.target.value;

    // Remove any non-numeric characters
    const numericInput = input.replace(/\D/g, "");

    // Limit to 10 characters
    const limitedInput = numericInput.slice(0, 10);

    setMobile(limitedInput);
  };

  const handleClgMobileChange = (event) => {
    const input = event.target.value;

    // Remove any non-numeric characters
    const numericInput = input.replace(/\D/g, "");

    // Limit to 10 characters
    const limitedInput = numericInput.slice(0, 10);

    setClgMobile(limitedInput);
  };
  // const handleClgLandlineChange = (event) => {
  //   const input = event.target.value;

  //   // Remove any non-numeric characters
  //   const numericInput = input.replace(/\D/g, "");

  //   // Limit to 10 characters
  //   const limitedInput = numericInput.slice(0, 10);

  //   setClgLandline(limitedInput);
  // };

  const handleStreamChange = (event) => {
    setStream(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const Streamdata = [
    {
      id: 1,
      name: "Commerce and Banking",
    },
    {
      id: 2,
      name: "Design",
    },
    {
      id: 3,
      name: "Engineering",
    },
    {
      id: 4,
      name: "Management",
    },
    {
      id: 5,
      name: "Hotel Management",
    },
    {
      id: 6,
      name: "Information Technology",
    },
    {
      id: 7,
      name: "Media and Mass Communication",
    },
    {
      id: 8,
      name: "Medical",
    },
    {
      id: 9,
      name: "Retail",
    },
    {
      id: 12,
      name: "Arts and Humanities",
    },
    {
      id: 16,
      name: "Others",
    },
  ];

  const handleResendOtp = () => {
    setIsloading(true);
    const fd = new FormData();
    fd.append("email", email);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/get-otp", {
      method: "POST",
      body: fd,
    }).then(async (response) => {
      var res = await response.json();
      // console.log(res.message)
      if (response.ok) {
        // console.log("hello", response.data);
        Swal.fire({
          title: "Success",
          text: `${res.message}`,
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsloading(false);
          startTimer();
        });
        // router.push('/thankyou')
      } else {
        Swal.fire({
          title: "error",
          text: `${res.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsloading(false);
        });
      }
    });
  };

  const onClgselect = (clg) => {
    if (clg.type == "-1") {
      setClgName(searchTerm);
    } else setClgName(clg.title);
    setIsSearchModalOpen(false);
  };
  return (
    <div>
      <Modal
        id="sloginmodal"
        centered
        size="lg"
        animation={false}
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        show={isOpen}
        onHide={onClose}
      >
        {/* <Modal.Header closeButton>
        <Modal.Title>Login and Apply</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Row>
            <Col
              md={0}
              lg={5}
              className="d-none d-lg-block"
              style={{
                background:
                  "linear-gradient(180deg, rgba(1,81,193,1) 22%, rgba(93,201,228,1) 100%)",
              }}
            >
              <Carousel>
                <CarouselItem>
                  <h3 style={{ color: "white" }}>Education Library </h3>
                  <p style={{ color: "white", whiteSpace: "break-spaces" }}>
                    Get detailed information about Colleges, Careers, Courses,
                    and Exams at LearnerHunt. Register now and make informed
                    decisions about your career.
                  </p>
                </CarouselItem>
                <CarouselItem>
                  <h3 style={{ color: "white" }}>Guaranteed Admission </h3>
                  <p style={{ color: "white", whiteSpace: "break-spaces" }}>
                    Get detailed information about Colleges, Careers, Courses,
                    and Exams at LearnerHunt. Register now and make informed
                    decisions about your career.
                  </p>
                </CarouselItem>
                <CarouselItem>
                  <h3 style={{ color: "white" }}>Counselling </h3>
                  <p style={{ color: "white", whiteSpace: "break-spaces" }}>
                    Get detailed information about Colleges, Careers, Courses,
                    and Exams at LearnerHunt. Register now and make informed
                    decisions about your career.
                  </p>
                </CarouselItem>
              </Carousel>
            </Col>
            <Col md={12} lg={7} style={{ padding: "1rem" }}>
              <div className="text-center mb-3">
                <img
                  src="/assets/images/learnerhunt-logo.webp"
                  width={200}
                  height={60}
                  alt="logo"
                />
                {/* <img src="/assets/images/Learnerhunt-Logo.png" width={200} height={60} /> */}

                <h3>
                  {" "}
                  {showSignup
                    ? "Welcome, Create your account"
                    : "Welcome Back!"}
                </h3>
                <p style={{ color: "gray" }}>
                  {(!showSignup && role == 3)&& "Sign in as student"}
                  {(!showSignup && role == 2)&& "Sign in as counsellor"}
                  {(!showSignup && role == 1)&& "Sign in as college"}

                </p>
              </div>

              <Form
                style={{ maxHeight: "550px", overflowY: "auto" }}
                onSubmit={handleStudentSubmit}
              >
                {!showSignup ? (
                  <>
                    <Form.Group controlId="email">
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        style={{ marginBottom: "15px" }}
                      />
                    </Form.Group>
                    {loginwithpassword && (
                      <Form.Group controlId="password">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter your password"
                          value={loginpassword}
                          onChange={handleLoginPasswordChange}
                          required
                          autoComplete="new-password"
                          style={{ marginBottom: "15px" }}
                        />
                      </Form.Group>
                    )}

                    {showotp && (
                      <Form.Group controlId="otp">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Enter OTP
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the OTP"
                          value={userotp}
                          maxLength={6}
                          minLength={6}
                          onChange={handleOtpChange}
                          required
                          style={{ marginBottom: "15px" }}
                        />
                      </Form.Group>
                    )}
                  </>
                ) : (
                  <>
                    {role == "3" ? (
                      <>
                        <Form.Group controlId="name">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleNameChange}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>

                        <Form.Group controlId="email">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={signupemail}
                            onChange={handleSignupEmailChange}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Mobile
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={handleMobileChange}
                            required
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group>

                        <Form.Group controlId="stream">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Preferred Stream
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={stream}
                            style={{ marginBottom: "15px" }}
                            onChange={handleStreamChange}
                            required
                          >
                            <option disabled value="">
                              Select Stream
                            </option>
                            {Streamdata.map((s) => {
                              return <option value={s.name}>{s.name}</option>;
                            })}

                            {/* ... Other options ... */}
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="level">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Preferred Level
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={level}
                            onChange={handleLevelChange}
                            style={{ marginBottom: "15px" }}
                            required
                          >
                            <option disabled value="">
                              Select Level
                            </option>
                            <option value="UG">UG</option>
                            <option value="PG">PG</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Ph.D">Ph.D</option>
                            <option value="Certificate">Certificate</option>
                            {/* ... Other options ... */}
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="password">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            autoComplete="new-password"
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>

                        {signupshowotp && (
                          <Form.Group controlId="otp">
                            <Form.Label style={{ fontWeight: "bold" }}>
                              Enter OTP
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter the OTP"
                              value={signupuserotp}
                              maxLength={6}
                              minLength={6}
                              onChange={handleSignupOtpChange}
                              required
                              style={{ marginBottom: "15px" }}
                            />
                          </Form.Group>
                        )}
                      </>
                    ) : role == "2" ? (
                      <>
                       <Form.Group controlId="clgname">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            College Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your College Name"
                            value={clgname}
                            onChange={(e) => setClgName(e.target.value)}
                            onClick={() => setIsSearchModalOpen(true)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                      <Form.Group controlId="counsellorname">
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Counsellor Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          value={counsellorname}
                          onChange={(e) => setCounsellorname(e.target.value)}
                          required
                          style={{ marginBottom: "15px" }}
                        />
                      </Form.Group>
                      <Form.Group controlId="counselloremail">
                      <Form.Label style={{ fontWeight: "bold" }}>
                      Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={signupemail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        style={{ marginBottom: "15px" }}
                      />
                    </Form.Group>
                    <Form.Group controlId="mobile">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Mobile
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter your mobile number"
                            value={counsellormobile}
                            onChange={(e) => setCounsellormobile(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group>
                         <Form.Group controlId="state">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            State
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={counsellorstate}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setCounsellorstate(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select State
                            </option>
                            {Object.keys(IndianStates["India"]).map((c, i) => {
                              return (
                                <option key={i} value={c}>
                                  {c}
                                </option>
                              );
                            })}

                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="city">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            City
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={counsellorcity}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setCounsellorcity(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select city
                            </option>
                            {counsellorstate != "" &&
                              IndianStates["India"][counsellorstate].map((c, i) => {
                                return (
                                  <option key={i} value={c}>
                                    {c}
                                  </option>
                                );
                              })}

                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exp">
                          <Form.Label style={{ fontWeight: "bold" }}>
                          Experince in Year
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={counsellorexp}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setCounsellorexp(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Experince in Year
                            </option>
                            {ExpinYear.map((c, i) => {
                                return (
                                  <option key={i} value={c}>
                                    {c}
                                  </option>
                                );
                              })}

                          </Form.Control>
                        </Form.Group>
                        {signupshowotp && (
                          <Form.Group controlId="otp">
                            <Form.Label style={{ fontWeight: "bold" }}>
                              Enter OTP
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter the OTP"
                              value={signupuserotp}
                              maxLength={6}
                              minLength={6}
                              onChange={handleSignupOtpChange}
                              required
                              style={{ marginBottom: "15px" }}
                            />
                          </Form.Group>
                        )}
                    </>
                    ) : (
                      <>
                        <Form.Group controlId="clgname">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            College Name <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) =>  (
          <TextField
            {...params}
            placeholder="Enter a College Name"
            size='small' margin="dense" 
            value={clgname}
            onChange={(e) => setClgName(e.target.value)}
            required
            style={{ marginBottom: "15px" }}
          />
        )}
      /> */}
                          <Form.Control
                            type="text"
                            placeholder="Enter your College Name"
                            value={clgname}
                            onChange={(e) => setClgName(e.target.value)}
                            onClick={() => setIsSearchModalOpen(true)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="adminname">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Admin Name <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your Admin Name"
                            value={adminname}
                            onChange={(e) => setAdminName(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="clgemail">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Email <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={signupemail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Mobile <span style={{color:'red'}}>*</span>
                          </Form.Label> 
                          <Form.Control
                            type="number"
                            placeholder="Enter your mobile number"
                            value={clgmobile}
                            onChange={handleClgMobileChange}
                            required
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group>
                        {/* <Form.Group controlId="Landline Number">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Landline Number
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter your Landline number"
                            value={clgLandline}
                            onChange={handleClgLandlineChange}
                            required
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group> */}
                        <Form.Group controlId="designation">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Designation <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          <Form.Control
                            as="select" // Use select element for dropdown
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                          >
                            <option value="">Select Designation</option>
                            <option value="Chairman">Chairman</option>
                            <option value="Director">Director</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Other">Other</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="referrer">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Referrer
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Referrer"
                            value={referrer}
                            onChange={(e) => setReferrer(e.target.value)}
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        <Form.Group controlId="LinkedIn">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            LinkedIn Link
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your LinkedIn Link"
                            value={linkedIn}
                            onChange={(e) => setLinkedIn(e.target.value)}
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        {/* <Form.Group controlId="state">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            State
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={clgstate}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setClgstate(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select State
                            </option>
                            {Object.keys(IndianStates["India"]).map((c, i) => {
                              return (
                                <option key={i} value={c}>
                                  {c}
                                </option>
                              );
                            })}

                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="city">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            City
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={clgcity}
                            style={{ marginBottom: "15px" }}
                            onChange={(e) => setClgcity(e.target.value)}
                            required
                          >
                            <option disabled value="">
                              Select city
                            </option>
                            {clgstate != "" &&
                              IndianStates["India"][clgstate].map((c, i) => {
                                return (
                                  <option key={i} value={c}>
                                    {c}
                                  </option>
                                );
                              })}

                          </Form.Control>
                        </Form.Group> */}
                        {signupshowotp && (
                          <Form.Group controlId="otp">
                            <Form.Label style={{ fontWeight: "bold" }}>
                              Enter OTP
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter the OTP"
                              value={signupuserotp}
                              maxLength={6}
                              minLength={6}
                              onChange={handleSignupOtpChange}
                              required
                              style={{ marginBottom: "15px" }}
                            />
                          </Form.Group>
                        )}
                      </>
                    )}
                  </>
                )}

                {!showSignup ? (
                  <>
                    {timer === 120 ? (
                      showotp ? (
                        <span
                          className="d-inline-flex my-2 text-primary "
                          style={{ cursor: "pointer" }}
                          onClick={handleResendOtp}
                        >
                          Resend Otp
                        </span>
                      ) : null
                    ) : (
                      <p>Resend OTP in {timer} seconds</p>
                    )}

                    <Button
                      className="w-100"
                      style={{ background: "#0151c1" }}
                      type="submit"
                      id="loginwithotp"
                      disabled={isloading}
                    >
                      {isloading ? (
                        <>
                          Please Wait...
                          <CircularProgress
                            style={{ marginLeft: "1rem" }}
                            color="inherit"
                          />
                        </>
                      ) : showotp ? (
                        "Verify OTP"
                      ) : loginwithpassword ? (
                        "Login"
                      ) : (
                        "Get OTP"
                      )}
                    </Button>
                    {!loginwithpassword ? (
                      <div
                        onClick={() => setLoginwithPassword(true)}
                        className="w-100 my-2"
                        style={{
                          background: "#0151c1",
                          cursor: "pointer",
                          display: "flex",
                          borderRadius: "0.3rem",
                          color: "white",
                          height: "2.2rem",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                        }}
                      >
                        Login Via Password
                      </div>
                    ) : (
                      <div
                        onClick={() => setLoginwithPassword(false)}
                        className="w-100 my-2"
                        style={{
                          background: "#0151c1",
                          cursor: "pointer",
                          display: "flex",
                          borderRadius: "0.3rem",
                          color: "white",
                          height: "2.2rem",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                        }}
                      >
                        Login Via OTP
                      </div>
                    )}
                  </>
                ) : (
                  <Button
                    className="w-100"
                    style={{ background: "#0151c1" }}
                    type="submit"
                    disabled={isloading}
                  >
                    {signupshowotp ? "Enter OTP" : "Signup"}
                  </Button>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                  }}
                >
                  {showSignup ? (
                    <p>
                      Already have an account?{" "}
                      <span
                        style={{ color: "blue" }}
                        onClick={() => setShowSignup(false)}
                      >
                        Login
                      </span>
                    </p>
                  ) : (
                    <p>
                      New to LearnerHunt?{" "}
                      <span
                        style={{ color: "blue" }}
                        onClick={handleSignupLinkClick}
                      >
                        Signup
                      </span>
                    </p>
                  )}
                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Modal
        className={Classes["custom-search-modal"]}
        size="md"
        style={{ background: "rgba(0,0,0,0.6)" }}
        centered
        show={isSearchModalOpen}
        onHide={() => setIsSearchModalOpen(false)}
      >
        <Modal.Header closeButton>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search colleges"
            className="form-control"
          />
        </Modal.Header>
        <Modal.Body style={{ padding: "0" }}>
          <div className={Classes["results"]}>
            {searchTerm.trim().length > 2 ? (
              isApiHitComplete ? (
                results.length > 0 ? (
                  results.map((el) => {
                    return (
                      <div
                        className={Classes["college"]}
                        onClick={() => onClgselect(el)}
                      >
                        <span>{el.title}</span>
                      </div>
                    );
                  })
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "100%", height: "inherit" }}
                  >
                    <span>No record</span>
                  </div>
                )
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "100%", height: "inherit", padding: "1rem" }}
                >
                  <Spinner variant="outlined" />
                </div>
              )
            ) : (
              <div className={Classes["trending-searches"]}>
                <br />
                <br />
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
