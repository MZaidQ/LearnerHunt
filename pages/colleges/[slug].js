import React, { useState, useEffect } from "react";
import Classes from "/styles/colleges.module.css";
// import Link from 'next/link'
import { useRouter } from "next/router";
import LoginForm from "../../components/Loginuc";
import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const pagesHavePopup = [];

const counselorsData = [
  {
    id: 1,
    name: "Dr. Emily Smith",
    specialization: "Marriage and Family Therapist",
    location: "New York, NY",
    bio: "Dr. Emily Smith is a licensed Marriage and Family Therapist with over 10 years of experience. She specializes in helping couples and families navigate through challenging times and improve their relationships.",
  },
  {
    id: 2,
    name: "John Doe",
    specialization: "Addiction Counselor",
    location: "Los Angeles, CA",
    bio: "John Doe is a certified Addiction Counselor with a passion for helping individuals overcome substance abuse and addiction. With a compassionate approach, he assists his clients in reclaiming their lives from addiction.",
  },
  {
    id: 3,
    name: "Dr. Sarah Johnson",
    specialization: "Clinical Psychologist",
    location: "Chicago, IL",
    bio: "Dr. Sarah Johnson is a Clinical Psychologist specializing in anxiety, depression, and trauma. With a holistic approach, she empowers her clients to overcome obstacles and achieve mental wellness.",
  },
  {
    id: 4,
    name: "Dr. Sarah Johnson",
    specialization: "Clinical Psychologist",
    location: "Chicago, IL",
    bio: "Dr. Sarah Johnson is a Clinical Psychologist specializing in anxiety, depression, and trauma. With a holistic approach, she empowers her clients to overcome obstacles and achieve mental wellness.",
  },
  {
    id: 5,
    name: "Dr. Sarah Johnson",
    specialization: "Clinical Psychologist",
    location: "Chicago, IL",
    bio: "Dr. Sarah Johnson is a Clinical Psychologist specializing in anxiety, depression, and trauma. With a holistic approach, she empowers her clients to overcome obstacles and achieve mental wellness.",
  },
  {
    id: 6,
    name: "Dr. Sarah Johnson",
    specialization: "Clinical Psychologist",
    location: "Chicago, IL",
    bio: "Dr. Sarah Johnson is a Clinical Psychologist specializing in anxiety, depression, and trauma. With a holistic approach, she empowers her clients to overcome obstacles and achieve mental wellness.",
  },
];

export default function CollegeName({ collegedata }) {
  // console.log(collegedata);
  const collegeid = collegedata.generalinfo._id;
  const [userStatus, setUserStatus] = useState(false);
  const [userid, setUserid] = useState("");
  const [useremail, setUseremail] = useState("");
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isApplyformOpen, setIsApplyformOpen] = useState(false);
  const [activetab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    gender: "",
    state: "",
    course: "",
  });
  const [popupformData, setPopupFormData] = useState({
    popupfullname: "",
    popupemail: "",
    popupmobile: "",
    popupcourse: "",
  });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  // console.log(slug);
  useEffect(() => {
    setShowModal(
      !localStorage.getItem("userid") && pagesHavePopup.includes(slug)
    );
  }, [slug]);
  useEffect(() => {
    const newstatus = localStorage.getItem("userid");
    // console.log(newstatus);
    if (newstatus) {
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/check-status", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userid")}`,
        },
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res)
        if (res.status) {
          setUserStatus(newstatus);
          setUseremail(localStorage.getItem("useremail"));
        } else {
          localStorage.removeItem("userid");
          localStorage.removeItem("status");
          localStorage.removeItem("useremail");
        }
      });
    } else {
      localStorage.removeItem("userid");
      localStorage.removeItem("status");
      localStorage.removeItem("useremail");
    }
  }, [userStatus]);

  const handlelogin = (e) => {
    setIsLoginFormOpen(true);
  };
  const handleopenform = (e) => {
    // console.log("formopen");
    setIsApplyformOpen(true);
  };
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const listcoursesOffered = collegedata.overview.offered_courses || [];
  // console.log(listcoursesOffered)

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("Form data submitted:", popupformData);
    try {
      const fd = new FormData();
      fd.append("name", popupformData.popupfullname);
      fd.append("email", popupformData.popupemail);
      fd.append("mobile", popupformData.popupmobile);
      fd.append("course", popupformData.popupcourse);
      fd.append("collegeid", collegeid);

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/adslead", {
        method: "POST",
        body: fd,
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res.error)
        if (res.error) {
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {
            setShowModal(res.show);
          });
        } else {
          Swal.fire({
            title: "Success",
            text: `${res.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          });
          setShowModal(false);
          // localStorage.setItem("popup", 0);
          setPopupFormData([]);
        }
      });
    } catch (error) {
      console.error("Failed to fetch OTP:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && value.length > 10) {
      return; // Do not update the state if more than 10 digits
    }

    // If you want to allow only numeric input for mobile number
    if (name === "mobile" && !/^\d*$/.test(value)) {
      return; // Do not update the state if non-numeric characters are entered
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCall = (counselorName) => {
    alert(`Calling ${counselorName}`);
    // You can implement the calling functionality here
  };
  const handleChangepopup = (e) => {
    const { name, value } = e.target;
    // console.log(name,value)

    if (name === "popupmobile" && value.length > 10) {
      return; // Do not update the state if more than 10 digits
    }

    // If you want to allow only numeric input for mobile number
    if (name === "popupmobile" && !/^\d*$/.test(value)) {
      return; // Do not update the state if non-numeric characters are entered
    }

    setPopupFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDownloadBrochure = (e) => {
    // console.log(e);
    if (userStatus) {
      // window.href(collegedata.generalinfo.college_brouher_pdf)
      const link = document.createElement("a");
      link.href = `https://learnerhunt-assets.s3.us-east-1.amazonaws.com/${collegedata.generalinfo.college_broucher_pdf}`; // Specify the path to your file
      link.download = "brochure.pdf"; // Specify the file name for the download
      // Trigger a click event on the link to initiate the download
      link.click();
    } else {
      setIsLoginFormOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data in formData state and do something with it here
    // console.log(formData);
    try {
      const fd = new FormData();
      fd.append("fullname", formData.fullname);
      fd.append("email", useremail);
      fd.append("mobile", formData.mobile);
      fd.append("gender", formData.gender);
      fd.append("state", formData.state);
      fd.append("course", formData.course);
      fd.append("collegeid", collegeid);

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/apply-college", {
        method: "POST",
        body: fd,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userid")}`,
        },
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res.error)
        if (res.error) {
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else {
          setIsApplyformOpen(false);
          if (slug == "-isbr-international-school-of-business-and-research-") {
            router.push("/thankyou-isbr");
          } else {
            router.push("/thankyou");
          }
          // Swal.fire({
          //   title: "Success",
          //   text: `${res.message}`,
          //   icon: "success",
          //   confirmButtonText: "Ok",
          // });
        }
      });
    } catch (error) {
      console.error("Failed to fetch OTP:", error);
    }
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      // partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 4,
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
  const dummyBannerImg =
    collegedata.generalinfo.banner_img_path &&
    collegedata.generalinfo.banner_img_path != ""
      ? collegedata.generalinfo.banner_img_path
      : "/assets/images/DummyBG.jpg";
  const dummyLogoImg =
    collegedata.generalinfo.logo_img_path &&
    collegedata.generalinfo.logo_img_path != ""
      ? collegedata.generalinfo.logo_img_path
      : "/assets/images/DummyLOGO.jpg";
  return (
    <div className={Classes["colleges-slug"]}>
      <div
        className={Classes["banner-img"]}
        style={{
          backgroundImage: `url(${dummyBannerImg})`,
          position: "relative",
        }}
      >
        <div className={Classes["clg-hero-section"]}>
          <div className={Classes["heading-section"]}>
            <div className={Classes["left-div"]}>
              <img src={dummyLogoImg} alt="dummylogo" />
            </div>
            <div className={Classes["right-div"]}>
              <h1>{collegedata.generalinfo.college_name}</h1>
              <p>
                <img src="/assets/images/location.png" alt="location" />
                <span>Campus Location : {collegedata.generalinfo.city}</span>
                &nbsp;&nbsp;
                <img src="/assets/images/bookmark.png" alt="bookmark" />
                <span>Approved By : {collegedata.generalinfo.approved_by}</span>
                {/* &nbsp;&nbsp;
                {userStatus ? (
                  <>
                    <ReceiptLongIcon />

                    <span
                      style={{
                        color: "#0d6fed",
                        cursor: "pointer",
                        textDecoration: "underline",
                        paddingLeft: "0.3rem",
                        fontWeight: "600",
                      }}
                      onClick={handleopenform}
                    >
                      Apply Form
                    </span>
                  </>
                ) : (
                  <>
                    <ReceiptLongIcon />
                    <span
                      style={{
                        color: "#0d6fed",
                        cursor: "pointer",
                        textDecoration: "underline",
                        paddingLeft: "0.3rem",
                        fontWeight: "600",
                      }}
                      onClick={handlelogin}
                    >
                      Apply Now
                    </span>
                  </>
                )}
                &nbsp;&nbsp;
                <FileDownloadOutlinedIcon />
                <span
                  style={{
                    color: "#0d6fed",
                    cursor: "pointer",
                    textDecoration: "underline",
                    paddingLeft: "0.3rem",
                    fontWeight: "600",
                  }}
                  onClick={handleDownloadBrochure}
                >
                  Download Brochure
                </span> */}
              </p>
            </div>
          </div>
        </div>

        <div className={Classes["commonStickyFooter"]}>
          {/* <div className={Classes["form-buttons"]}> */}
          {userStatus ? (
            <button onClick={handleopenform}>Apply Form</button>
          ) : (
            <button onClick={handlelogin}>Apply Now</button>
          )}
          <button onClick={handleDownloadBrochure}>Download Brochure</button>

          {/* </div> */}
        </div>
      </div>

      <Tabs
        activeKey={activetab}
        id="uncontrolled-tab-example"
        className={Classes["tabs-bar"]}
        onSelect={(k) => setActiveTab(k)}
      >
        {/* <Tab eventKey="general" title="General"> */}

        {/* <div className="container">
        <div className={Classes["content-section"]}>
          <div className={Classes["heading-section"]}>
            <div className={Classes["left-div"]}>
              <img src={dummyLogoImg} alt="" />
            </div>
            <div className={Classes["right-div"]}>
              <h1>{collegedata.name}</h1>
              <p>
                <img src="/assets/images/location.png" alt="" />
                <span>{collegedata.short_address}</span>&nbsp;&nbsp;
                <img src="/assets/images/bookmark.png" alt="" />
                <span>{collegedata.approved_by}</span>
              </p>
            </div>
          </div>
          <div className={Classes["description-section"]}>
            <p>{collegedata.clg_description}</p>
          </div>
          <div className={Classes["small-description"]}>
            <h2>Highlights</h2>
            <div className="row">
              <div className="col-md-6">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th scope="row">Minimum Fees</th>
                      <td style={{ wordBreak: "break-all" }}>
                        {collegedata.min_fees}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Maximum Fees</th>
                      <td style={{ wordBreak: "break-all" }}>
                        {collegedata.max_fees}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Number of Courses</th>
                      <td style={{ wordBreak: "break-all" }}>
                        {collegedata.courses_count}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Courses Offered</th>
                      <td style={{ wordBreak: "break-all" }}>
                        {collegedata.courses_offered}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Rating</th>
                      <td style={{ wordBreak: "break-all" }}>
                        {collegedata.ratings}
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">Highest Package</th>
                      <td style={{ wordBreak: "break-all" }}>
                        {collegedata.placement}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className={Classes["form-buttons"]}>
                  {userStatus ? (
                    <button onClick={handleopenform}>Apply Form</button>
                  ) : (
                    <button onClick={handlelogin}>Apply Now</button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {collegedata.top_rec_companies &&
            collegedata.top_rec_companies != "" && (
              <div className={Classes["small-description"]}>
                <h2>Top Companies</h2>
                <p>{collegedata.top_rec_companies}</p>
              </div>
            )}
          {collegedata.cut_off && collegedata.cut_off != "" && (
            <div className={Classes["small-description"]}>
              <h2>Cut off</h2>
              <p>{collegedata.cut_off}</p>
            </div>
          )}
          {collegedata.eligibility && collegedata.eligibility != "" && (
            <div className={Classes["small-description"]}>
              <h2>Eligibility Selection</h2>
              <p>{collegedata.eligibility}</p>
            </div>
          )}
          {collegedata.scholarship && collegedata.scholarship != "" && (
            <div className={Classes["small-description"]}>
              <h2>Scholarship</h2>
              <p>{collegedata.scholarship}</p>
            </div>
          )}
          {collegedata.application_process &&
            collegedata.application_process != "" && (
              <div className={Classes["small-description"]}>
                <h2>Application process</h2>
                <p>{collegedata.application_process}</p>
              </div>
            )}
          {collegedata.application_link &&
            collegedata.application_link != "" && (
              <div className={Classes["small-description"]}>
                <h2>Application Link</h2>
                <p>
                  <a href={collegedata.application_link}>
                    {collegedata.application_link}
                  </a>
                </p>
              </div>
            )}
        </div>
      </div> */}

        {/* </Tab> */}
        <Tab eventKey="overview" title="Overview">
          {Object.keys(collegedata.overview).length > 0 && (
            <div className="container">
              <div className={Classes["content-section"]}>
                {/* <div className={Classes["heading-section"]}>
                <div className={Classes["left-div"]}>
                  <img src={dummyLogoImg} alt="" />
                </div>
                <div className={Classes["right-div"]}>
                  <h1>{collegedata.generalinfo.college_name}</h1>
                  <p>
                    <img src="/assets/images/location.png" alt="" />
                    <span>{collegedata.generalinfo.city}</span>&nbsp;&nbsp;
                    <img src="/assets/images/bookmark.png" alt="" />
                    <span>{collegedata.generalinfo.approved_by}</span>
                  </p>
                </div>
              </div> */}
                {collegedata.overview.description.length > 0 && (
                  <div className={Classes["description-section"]}>
                    <h3>{collegedata.generalinfo.college_name} Overview</h3>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {collegedata.overview.description}
                    </p>
                  </div>
                )}
                <div className={Classes["description-section"]}>
                  <h3>{collegedata.generalinfo.college_name} Highlights</h3>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Particulars </th>
                        <th>Details </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Establishment Year</td>
                        <td>
                          {new Date(
                            collegedata.overview.establishment_year
                          ).getFullYear() || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Institute Type </td>
                        <td>{collegedata.generalinfo.college_type || "-"}</td>
                      </tr>
                      <tr>
                        <td>Recognised By</td>
                        <td>{collegedata.overview.recognised_by || "-"}</td>
                      </tr>
                      <tr>
                        <td>Approved By</td>
                        <td>{collegedata.generalinfo.approved_by || "-"}</td>
                      </tr>
                      <tr>
                        <td>Foreign Collaborations</td>
                        <td>
                          {collegedata.overview.foreign_collaboration || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Campus Size</td>
                        <td>{collegedata.overview.campus_size || "-"}</td>
                      </tr>
                      <tr>
                        <td>Where to Apply</td>
                        <td>
                          {collegedata.overview.where_to_apply ? (
                            <a
                              href={collegedata.overview.where_to_apply}
                              target="_blank"
                            >
                              {collegedata.overview.where_to_apply}
                            </a>
                          ) : userStatus ? (
                            <>
                              <ReceiptLongIcon />

                              <span
                                style={{
                                  color: "#0d6fed",
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                  paddingLeft: "0.3rem",
                                  fontWeight: "600",
                                }}
                                onClick={handleopenform}
                              >
                                Apply Form
                              </span>
                            </>
                          ) : (
                            <>
                              <ReceiptLongIcon />
                              <span
                                style={{
                                  color: "#0d6fed",
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                  paddingLeft: "0.3rem",
                                  fontWeight: "600",
                                }}
                                onClick={handlelogin}
                              >
                                Apply Now
                              </span>
                            </>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>No. of Courses Offered</td>
                        <td>
                          {collegedata.overview.course_offered_count || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Faculty</td>
                        <td>{collegedata.overview.total_faculty || "-"}</td>
                      </tr>
                      <tr>
                        <td>Total Intake</td>
                        <td>{collegedata.overview.total_intake || "-"}</td>
                      </tr>
                      <tr>
                        <td>Average Package</td>
                        <td>{collegedata.overview.avg_package || "-"}</td>
                      </tr>
                      <tr>
                        <td>Highest Package</td>
                        <td>
                          {collegedata.overview.highest_annual_package || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Top Recruiters</td>
                        <td>{collegedata.overview.top_recruiter || "-"}</td>
                      </tr>
                      <tr>
                        <td>Campus Facilities</td>
                        <td>{collegedata.overview.campus_facilities || "-"}</td>
                      </tr>
                      <tr>
                        <td>Exams Accepted</td>
                        <td>{collegedata.overview.exams_accepted || "-"}</td>
                      </tr>
                      <tr>
                        <td>College Collaborations</td>
                        <td>
                          {collegedata.overview.college_collaborations || "-"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  {collegedata.overview.application_process && (
                    <>
                      <h3>
                        {collegedata.generalinfo.college_name} Application
                        process
                      </h3>
                      <p>{collegedata.overview.application_process}</p>
                    </>
                  )}
                </div>
                {collegedata.overview.offered_courses.length > 0 && (
                  <div className={Classes["description-section"]}>
                    <h3>
                      {collegedata.generalinfo.college_name} Offered Courses
                    </h3>
                    <Table responsive bordered hover>
                      <thead>
                        <tr>
                          <th>Course Name </th>
                          <th>Course Duration</th>
                          <th>Annual Fees</th>
                        </tr>
                      </thead>
                      <tbody>
                        {collegedata.overview.offered_courses.map((s, i) => {
                          return (
                            <tr key={i}>
                              <td
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveTab("courses");
                                  // console.log("hello");
                                }}
                              >
                                {s.course_name}
                              </td>
                              <td>{s.course_duration}</td>
                              <td>{s.annual_fees}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
                {collegedata.overview.college_faculty.length > 0 && (
                  <div className={Classes["description-section"]}>
                    <h3>{collegedata.generalinfo.college_name} Faculty</h3>
                    <Container>
                      <Row>
                        {collegedata.overview.college_faculty.map((s, i) => {
                          return (
                            <Col key={i} xs={12} md={6} lg={3}>
                              <Card
                                style={{
                                  width: "100%",
                                  margin: "1rem 0rem",
                                }}
                              >
                                <Card.Body>
                                  <blockquote className="blockquote mb-0">
                                    <p>{s.designation}</p>
                                    <footer className="blockquote-footer">
                                      <cite title="Source Title">
                                        {s.faculty_name}
                                      </cite>
                                    </footer>
                                  </blockquote>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </Container>
                  </div>
                )}
                {collegedata.overview.admission_dates.length > 0 && (
                  <div className={Classes["description-section"]}>
                    <h3>
                      {collegedata.generalinfo.college_name} Admission Dates
                    </h3>
                    <Table responsive bordered>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Event Name</th>
                          <th>Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {collegedata.overview.admission_dates.map((s, i) => {
                          return (
                            <tr key={i}>
                              <td>{s.date ? s.date.substring(0, 10) : "-"}</td>
                              <td>{s.event_name || "-"}</td>
                              <td>{s.year || "-"}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
                {collegedata.overview.top_course.length > 0 && (
                  <div className={Classes["description-section"]}>
                    <h3>
                      {collegedata.generalinfo.college_name} Top Courses & Fees
                    </h3>
                    <div className={Classes["collegeDetail_classNotToggled"]}>
                      <Table>
                        <tbody>
                          {collegedata.overview.top_course.map((s, i) => {
                            return (
                              <tr key={i}>
                                <td
                                  className={
                                    Classes["collegeDetail_courseName"]
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab("courses");
                                  }}
                                >
                                  {s.course_name}
                                  <span
                                    className={
                                      Classes["collegeDetail_courseCount"]
                                    }
                                  >
                                    {s.course_count}
                                  </span>
                                </td>
                                <td
                                  className={
                                    Classes["collegeDetail_courseFees"]
                                  }
                                >
                                  <span
                                    className={
                                      Classes["collegeDetail_customSpan"]
                                    }
                                  >
                                    Annual Fee
                                  </span>
                                  <span
                                    className={Classes["collegeDetail_price"]}
                                  >
                                    {s.annual_fees}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                          {/* <tr>
                        <td className={Classes["collegeDetail_courseName"]}>
                          BSc
                          <span className={Classes["collegeDetail_courseCount"]}>
                            13 Courses
                          </span>
                        </td>
                        <td className={Classes["collegeDetail_courseFees"]}>
                          <span className={Classes["collegeDetail_customSpan"]}>
                            Annual Fee
                          </span>
                          <span className={Classes["collegeDetail_price"]}>
                            ₹ 45,000 - 1,50,000
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className={Classes["collegeDetail_courseName"]}>
                          BSc
                          <span className={Classes["collegeDetail_courseCount"]}>
                            13 Courses
                          </span>
                        </td>
                        <td className={Classes["collegeDetail_courseFees"]}>
                          <span className={Classes["collegeDetail_customSpan"]}>
                            Annual Fee
                          </span>
                          <span className={Classes["collegeDetail_price"]}>
                            ₹ 45,000 - 1,50,000
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className={Classes["collegeDetail_courseName"]}>
                          BSc
                          <span className={Classes["collegeDetail_courseCount"]}>
                            13 Courses
                          </span>
                        </td>
                        <td className={Classes["collegeDetail_courseFees"]}>
                          <span className={Classes["collegeDetail_customSpan"]}>
                            Annual Fee
                          </span>
                          <span className={Classes["collegeDetail_price"]}>
                            ₹ 45,000 - 1,50,000
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className={Classes["collegeDetail_courseName"]}>
                          BSc
                          <span className={Classes["collegeDetail_courseCount"]}>
                            13 Courses
                          </span>
                        </td>
                        <td className={Classes["collegeDetail_courseFees"]}>
                          <span className={Classes["collegeDetail_customSpan"]}>
                            Annual Fee
                          </span>
                          <span className={Classes["collegeDetail_price"]}>
                            ₹ 45,000 - 1,50,000
                          </span>
                        </td>
                      </tr> */}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                )}
                {/* <div className={Classes["description-section"]}>
                  <h3>Meet Our Counselors</h3>
                  <div>
                    <Carousel
                      responsive={responsive}
                      showDots={true}
                      partialVisbile={false}
                    >
                      {counselorsData.length > 0
                        ? counselorsData.map((counselor) => (
                            <div
                              key={counselor.id}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                width: "300px",
                                margin: "20px",
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                              }}
                            >
                              <div
                                className={Classes["img-div-counsellor"]}
                                style={{
                                  position: "relative",
                                  background: "rgb(0, 123, 255)",
                                  borderRadius: "9px 9px 0px 0px",
                                  height: "100px",
                                  width: "100%",
                                  marginBottom: "50px",
                                }}
                              >
                                <img
                                  src={
                                    "/assets/images/counsellorFolder/counsellor-profile.png"
                                  }
                                  alt={counselor.name}
                                  style={{
                                    width: "90px",
                                    height: "90px",
                                    borderRadius: "50px",
                                    border: "3px solid white",
                                    position: "absolute",
                                    left: "50%",
                                    bottom: "-38%",
                                    transform: "translate(-50%,-8%)",
                                  }}
                                />
                              </div>
                              <h4 style={{ marginTop: "10px" }}>
                                {counselor.name}
                              </h4>
                              <p> {counselor.specialization}</p>
                              <p>
                                <strong>Location:</strong> {counselor.location}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={
                                    "/assets/images/counsellorFolder/facebook.png"
                                  }
                                  alt={counselor.name}
                                  style={{
                                    width: "10%",
                                    height: "10%",
                                    margin: "0 0.2rem",
                                    borderRadius: "5px",
                                  }}
                                />
                                <img
                                  src={
                                    "/assets/images/counsellorFolder/linkedin.png"
                                  }
                                  alt={counselor.name}
                                  style={{
                                    width: "10%",
                                    height: "10%",
                                    margin: "0 0.2rem",
                                    borderRadius: "5px",
                                  }}
                                />
                                <img
                                  src={
                                    "/assets/images/counsellorFolder/twitter.png"
                                  }
                                  alt={counselor.name}
                                  style={{
                                    width: "10%",
                                    height: "10%",
                                    margin: "0 0.2rem",
                                    borderRadius: "5px",
                                  }}
                                />
                                <img
                                  src={
                                    "/assets/images/counsellorFolder/youtube.png"
                                  }
                                  alt={counselor.name}
                                  style={{
                                    width: "10%",
                                    height: "10%",
                                    margin: "0 0.2rem",
                                    borderRadius: "5px",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  margin: "0.5rem 0",
                                }}
                              >
                                <button
                                  onClick={() => handleCall(counselor.name)}
                                  style={{
                                    padding: "10px 20px",
                                    margin: "0 0.2rem",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "25px",
                                    cursor: "pointer",
                                  }}
                                >
                                  Call
                                </button>

                                <button
                                  onClick={() => handleCall(counselor.name)}
                                  style={{
                                    padding: "10px 20px",
                                    margin: "0 0.2rem",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "25px",
                                    cursor: "pointer",
                                  }}
                                >
                                  Message
                                </button>
                              </div>
                            </div>
                          ))
                        : "no record"}
                    </Carousel>
                  </div>
                </div> */}

                {collegedata.overview.college_faqs.length > 0 && (
                  <div className={Classes["description-section"]}>
                    <h3>FAQs about {collegedata.generalinfo.college_name}</h3>
                    {collegedata.overview.college_faqs.map((s, index) => {
                      return (
                        <Accordion
                          key={index}
                          defaultActiveKey={0}
                          style={{ margin: "1rem 0rem" }}
                        >
                          <Accordion.Item eventKey={index}>
                            <Accordion.Header>{s.question}</Accordion.Header>
                            <Accordion.Body style={{ background: "#f6f6f6" }}>
                              {s.answer}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </Tab>
        <Tab eventKey="courses" title="Courses">
          {Object.keys(collegedata.courses).length > 0 && (
            <div className="container">
              <div className={Classes["content-section"]}>
                {collegedata.courses.courses.length > 0 && (
                  <div className={Classes["description-section"]}>
                    <h3>
                      {collegedata.generalinfo.college_name} Courses, Fees and
                      Eligibility Criteria
                    </h3>
                    <Table responsive bordered>
                      <thead>
                        <tr>
                          <th>Course </th>
                          <th>Annual Fees </th>
                          <th> Eligibility Criteria</th>
                        </tr>
                      </thead>
                      <tbody>
                        {collegedata.courses.courses.map((s, i) => {
                          return (
                            <tr key={i}>
                              <td>{s.course_name || "-"}</td>
                              <td>{s.course_annual_fees || "-"}</td>
                              <td>{s.eligibility_criteria || "-"}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
                <div>
                  <div className={Classes["description-section"]}>
                    <h3>
                      Courses are offered by{" "}
                      {collegedata.generalinfo.college_name}
                    </h3>
                    {collegedata.courses.courses.map((s, i) => {
                      const specializations = s.course_specialization
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);
                      // console.log(specializations);
                      return (
                        <div key={i} className={Classes["courseCardBox"]}>
                          <div className={Classes["cardHeading"]}>
                            {/* <a href="#course">{s.course_name}</a> */}
                            <span>{s.course_name}</span>
                          </div>

                          <div className={Classes["courseCardDetails"]}>
                            <div className={Classes["courseDetailLeft"]}>
                              <div>
                                <p>
                                  Total Intake:{" "}
                                  <span
                                    className={
                                      Classes["collegeDetail_detailStrong"]
                                    }
                                  >
                                    {s.course_total_intake}
                                  </span>
                                </p>
                                <p>
                                  Study Mody:{" "}
                                  <span
                                    className={
                                      Classes["collegeDetail_detailStrong"]
                                    }
                                  >
                                    {s.study_mode}
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p>
                                  Exam Accepted:{" "}
                                  <span
                                    className={
                                      Classes["collegeDetail_detailStrong"]
                                    }
                                  >
                                    {" "}
                                    {s.exam_accepted}
                                  </span>
                                </p>
                                <p>
                                  Annual Fees:{" "}
                                  <span
                                    className={
                                      Classes["collegeDetail_detailStrong"]
                                    }
                                  >
                                    {s.course_annual_fees}
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p>
                                  Duration:{" "}
                                  <span
                                    className={
                                      Classes["collegeDetail_detailStrong"]
                                    }
                                  >
                                    {s.course_duration}
                                  </span>
                                </p>
                                <p>
                                  Average Fees:{" "}
                                  <span
                                    className={
                                      Classes["collegeDetail_detailStrong"]
                                    }
                                  >
                                    {s.avg_fees}
                                  </span>
                                </p>
                              </div>
                            </div>
                            {/* <div className={Classes["courseDetailRight"]}>
                        <Button variant="primary">Apply Now</Button>
                        <Button variant="outline-primary">
                          Request A Callback
                        </Button>
                      </div> */}
                          </div>
                          <div className={Classes["cardChips"]}>
                            <ul>
                              {specializations.map((specialization, index) => (
                                <li key={index}>{specialization}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Tab>
        <Tab eventKey="campus" title="Campus">
          {Object.keys(collegedata.campus).length > 0 && (
            <div className="container" id="campus">
              <div className={Classes["content-section"]}>
                {collegedata.campus.campus_description && (
                  <div className={Classes["description-section"]}>
                    <h3>{collegedata.generalinfo.college_name} Description</h3>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {collegedata.campus.campus_description}
                    </p>
                  </div>
                )}
                {collegedata.campus.hostel_fees_structure && (
                  <div className={Classes["description-section"]}>
                    <h3>
                      {collegedata.generalinfo.college_name} Hostel & Fees
                      Structure
                    </h3>

                    <p>{collegedata.campus.hostel_fees_structure}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Tab>
        <Tab eventKey="admission" title="Admission">
          {Object.keys(collegedata.admission).length > 0 && (
            <div className="container">
              <div className={Classes["content-section"]}>
                {collegedata.admission.admission_process && (
                  <div className={Classes["description-section"]}>
                    <h3>{collegedata.generalinfo.college_name} Admission</h3>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {collegedata.admission.admission_process}
                    </p>
                  </div>
                )}
                <div className={Classes["description-section"]}>
                  {collegedata.admission.admission_eligibility_criteria.length >
                    0 && (
                    <>
                      <h3>
                        {collegedata.generalinfo.college_name} Courses and
                        Eligibility Criteria
                      </h3>

                      <Table responsive bordered>
                        <thead>
                          <tr>
                            <th>Course </th>
                            <th>Eligibility</th>
                          </tr>
                        </thead>
                        <tbody>
                          {collegedata.admission.admission_eligibility_criteria.map(
                            (s, i) => {
                              return (
                                <tr key={i}>
                                  <td>{s.course_name || "-"}</td>
                                  <td>{s.eligibility || "-"}</td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </Tab>
        <Tab eventKey="scholarship" title="Scholarship">
          {Object.keys(collegedata.scholorship).length > 0 && (
            <div className="container">
              <div className={Classes["content-section"]}>
                {collegedata.scholorship.scholorship_description && (
                  <div className={Classes["description-section"]}>
                    <h3>{collegedata.generalinfo.college_name} Description</h3>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {collegedata.scholorship.scholorship_description}
                    </p>
                  </div>
                )}
                <div className={Classes["description-section"]}>
                  {collegedata.scholorship.scholorship_scheme.length > 0 && (
                    <>
                      <h3>
                        {collegedata.generalinfo.college_name} Scholarship
                        Scheme
                      </h3>

                      <Table responsive bordered>
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th>Eligibility Criteria</th>
                            <th>Scholarship</th>
                          </tr>
                        </thead>
                        <tbody>
                          {collegedata.scholorship.scholorship_scheme.map(
                            (s, i) => {
                              return (
                                <tr key={i}>
                                  <td>{s.category || "-"}</td>
                                  <td>{s.eligibility_criteria || "-"}</td>
                                  <td>{s.scholorship || "-"}</td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    </>
                  )}
                  {collegedata.scholorship.sports_scholorship.length > 0 && (
                    <>
                      <h3>
                        {collegedata.generalinfo.college_name} Sports
                        Scholarships
                      </h3>

                      <Table responsive bordered>
                        <thead>
                          <tr>
                            <th>Level</th>
                            <th>Scholarship</th>
                          </tr>
                        </thead>
                        <tbody>
                          {collegedata.scholorship.sports_scholorship.map(
                            (s, i) => {
                              return (
                                <tr key={i}>
                                  <td>{s.level || "-"}</td>
                                  <td>{s.scholorship || "-"}</td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    </>
                  )}
                  {collegedata.scholorship.merit_cum_means_scholorship.length >
                    0 && (
                    <>
                      <h3>
                        {collegedata.generalinfo.college_name} Merit Cum Means
                        Scholarships
                      </h3>
                      <Table responsive bordered>
                        <thead>
                          <tr>
                            <th>Annual Income </th>
                            <th>Scholarship</th>
                          </tr>
                        </thead>
                        <tbody>
                          {collegedata.scholorship.merit_cum_means_scholorship.map(
                            (s, i) => {
                              return (
                                <tr key={i}>
                                  <td>{s.annual_income || "-"}</td>
                                  <td>{s.scholorship || "-"}</td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </Tab>
        <Tab eventKey="placement" title="Placement">
          {Object.keys(collegedata.placement).length > 0 && (
            <div className="container">
              <div className={Classes["content-section"]}>
                <div className={Classes["description-section"]}>
                  <h3>{collegedata.generalinfo.college_name} Description</h3>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {collegedata.placement.placement_description}
                  </p>
                </div>
                <div className={Classes["description-section"]}>
                  <h3>
                    {collegedata.generalinfo.college_name} Placement Process
                  </h3>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {collegedata.placement.placement_process}
                  </p>
                  {collegedata.placement.placement_year.length > 0 && (
                    <>
                      <h3>{collegedata.generalinfo.college_name} Highlights</h3>
                      <Table responsive bordered>
                        <thead>
                          <tr>
                            <th>Year</th>
                            <th>Particulars</th>
                            <th>Statistics</th>
                          </tr>
                        </thead>
                        <tbody>
                          {collegedata.placement.placement_year.map((s, i) => {
                            return (
                              <tr key={i}>
                                <td>{s.year}</td>
                                <td>{s.particular}</td>
                                <td>{s.statistics}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </>
                  )}

                  <h3>{collegedata.generalinfo.college_name} Report</h3>

                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Particulars</th>
                        <th>Statistics</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Highest package</td>
                        <td>{collegedata.placement.highest_package}</td>
                      </tr>
                      <tr>
                        <td>Average package</td>
                        <td>{collegedata.placement.avg_package}</td>
                      </tr>
                      <tr>
                        <td>Total Number of job offers</td>
                        <td>{collegedata.placement.total_job_offers}</td>
                      </tr>
                      <tr>
                        <td>Total Number of companies visited</td>
                        <td>{collegedata.placement.total_companies_visited}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </Tab>

        <Tab eventKey="cutoff" title="Cutoff">
          <div className="container">
            <div className={Classes["content-section"]}>
              {Object.keys(collegedata.cutoff).length > 0 &&
                collegedata.cutoff.yearwise_description.map((s, i) => {
                  return (
                    <div key={i} className={Classes["description-section"]}>
                      <h3>
                        {" "}
                        {collegedata.generalinfo.college_name} Cut off {s.year}
                      </h3>
                      <p style={{ whiteSpace: "pre-line" }}>{s.description}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </Tab>
      </Tabs>

      {isLoginFormOpen && (
        <LoginForm
          isOpen={isLoginFormOpen}
          onClose={() => setIsLoginFormOpen(false)}
          role="3"
        />
      )}
      {isApplyformOpen && (
        <Modal
          centered
          size="lg"
          animation={false}
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          show={isApplyformOpen}
          onHide={() => setIsApplyformOpen(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="justify-content-center align-items-center">
                <Col md={12}>
                  <div className="text-center mb-3">
                    <h3>{collegedata.generalinfo.college_name}</h3>
                    <p>(Student Application Form)</p>
                  </div>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="fullname">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={useremail}
                        disabled
                        // onChange={handleChange}
                        placeholder="Enter email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="mobile">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        maxLength={10}
                        minLength={10}
                        placeholder="Enter your mobile number"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        placeholder="Select gender"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Select state"
                      >
                        <option value="">Select state</option>
                        {indianStates.map((state, i) => (
                          <option key={i} value={state}>
                            {state}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="course">
                      <Form.Label>Course</Form.Label>
                      <Form.Control
                        as="select"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                      >
                        <option value="">Select course</option>
                        {listcoursesOffered.map((course, index) => (
                          <option key={index} value={course.course_name}>
                            {course.course_name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      )}

      {/* pop up form */}
      <Modal
        centered
        size="lg"
        animation={false}
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body>
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col md={12}>
                <div className="text-center mb-3">
                  <h3>{collegedata.generalinfo.college_name}</h3>
                  <p>(Student Application Form)</p>
                </div>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3" controlId="fullname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="popupfullname"
                      value={popupformData.popupfullname}
                      onChange={handleChangepopup}
                      placeholder="Enter your full name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="popupemail"
                      value={popupformData.useremail}
                      onChange={handleChangepopup}
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="mobile">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="popupmobile"
                      value={popupformData.popupmobile}
                      onChange={handleChangepopup}
                      maxLength={10}
                      minLength={10}
                      placeholder="Enter your mobile number"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="course">
                    <Form.Label>Course</Form.Label>
                    <Form.Control
                      as="select"
                      name="popupcourse"
                      value={popupformData.popupcourse}
                      onChange={handleChangepopup}
                      required
                    >
                      <option value="">Select course</option>
                      {listcoursesOffered.map((course, index) => (
                        <option key={index} value={course.course_name}>
                          {course.course_name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  if (slug) {
    const encodedSlug = encodeURIComponent(slug);
    const url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/college?slug=" + encodedSlug;
    // console.log(url)
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    if (data.data && data.data.length > 0) {
      return {
        props: { collegedata: data.data[0] },
      };
    } else {
      return {
        // notFound: true,
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }
  } else {
    return {
      // notFound: true,
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
}
