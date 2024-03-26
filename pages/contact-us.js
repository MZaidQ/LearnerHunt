import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Classes from "/styles/contant.module.css";
import { useRouter } from "next/router";
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
export default function contact() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [preferredCourse, setPreferredCourse] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [preferredCoursesData, setPreferredCoursesData] = useState([]);
const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch preferred courses data from API
    fetchPreferredCourses();
  }, []);

  async function fetchPreferredCourses() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/miscellaneous/testeligibility"
      );
      const data = await response.json();
      // console.log(data);
      setPreferredCoursesData(data.courses);
    } catch (error) {
      console.error("Error fetching preferred courses:", error);
    }
  }

  function validateForm() {
    const errors = {};
    let isValid = true;

    if (!fullname.trim()) {
      errors.fullname = "Full name is required";
      isValid = false;
    }

    if (!contactNumber.trim()) {
      errors.contactNumber = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = "Contact number should be 10 digits";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Form is valid, proceed with form submission
      // console.log('Form submitted successfully');
      // console.log("Full Name:", fullname);
      // console.log("Contact Number:", contactNumber);
      // console.log("Preferred Course:", preferredCourse);
      // console.log("Email:", email);
      // console.log("Message:", message);
      setIsLoading(true);
      var formData = new FormData();
      formData.append("name", fullname);
      formData.append("contact", contactNumber);
      formData.append("message", message);
      formData.append("email", email);
      formData.append("course", preferredCourse);

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/sendmail", {
  method: 'POST',
  body: formData
})
.then(response => {
  
  if (response.ok) {
    router.push('/thankyou')
  } else {
    // console.log('Data upload failed');
  }
  setIsLoading(false);
})
.catch(error => {
  console.error('Error:', error);
  setIsLoading(false); 
});
     
      // Reset form fields
      setFullname("");
      setContactNumber("");
      setPreferredCourse("");
      setEmail("");
      setMessage("");
      setErrors({});
    } else {
      // Form validation failed, display error messages
      // console.log("Form validation failed");
    }
  };
  return (
    <>  <Head>
    <title>
    Contact Us | Expert Educational Guidance at Your Fingertips
        </title>
        <meta
          name="description"
          content="Contact us for personalized educational counseling & assistance. Reach out to us for queries, suggestions. Start your journey to informed career decisions today."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(StructuredDataOrg),
          }}
        />
    </Head>
    <div
      className={`container my-5 `}
    >
      <div
        className={Classes.contact2}
        style={{
          backgroundImage:
            "url(https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/map.jpg)",
        }}
        id="contact"
      >
        <Container>
          <Row className={Classes["contact-container"]}>
            <Col lg={12}>
              <div className={Classes["card"]}>
                <Row>
                  <Col lg={8}>
                    <div className=" p-4">
                      <h4>Contact Us</h4>
                      <Form action="#" onSubmit={handleSubmit}>
                        <Row>
                          <Col lg={6} className="my-3">
                            <Form.Group controlId="fullname">
                              <Form.Control
                                type="text"
                                placeholder="Full Name *"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                              />
                              {errors.fullname && (
                                <span className={Classes["error-message"]}>
                                  {errors.fullname}
                                </span>
                              )}
                            </Form.Group>
                          </Col>
                          <Col lg={6} className="my-3">
                            <Form.Group controlId="contactNumber">
                              <Form.Control
                                type="text"
                                placeholder="Contact Number *"
                                minLength={10}
                                maxLength={10}
                                value={contactNumber}
                                onChange={(e) =>
                                  setContactNumber(
                                    e.target.value.replace(/\D/g, "")
                                  )
                                }
                              />
                              {errors.contactNumber && (
                                <span className={Classes["error-message"]}>
                                  {errors.contactNumber}
                                </span>
                              )}
                            </Form.Group>
                          </Col>
                          <Col lg={6} className="my-3">
                            <Form.Group controlId="preferredCourse">
                              <Form.Control
                                as="select"
                                value={preferredCourse}
                                onChange={(e) =>
                                  setPreferredCourse(e.target.value)
                                }
                              >
                                <option value="">
                                  Select Preferred Course
                                </option>
                                {preferredCoursesData.map((course) => (
                                  <option
                                    key={course._id}
                                    value={course.course}
                                  >
                                    {course.course}
                                  </option>
                                ))}
                                <option key="other" value="other">
                                  Other
                                </option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                          <Col lg={6} className="my-3">
                            <Form.Group controlId="email">
                              <Form.Control
                                type="email"
                                placeholder="Email *"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              {errors.email && (
                                <span className={Classes["error-message"]}>
                                  {errors.email}
                                </span>
                              )}
                            </Form.Group>
                          </Col>
                          <Col lg={12} className="my-3">
                            <Form.Group controlId="message">
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                              />
                              {/* Add error message for message if needed */}
                            </Form.Group>
                          </Col>
                          <Col lg={12} className="my-3">
                          {isLoading ? (
                            <Button variant="danger">Loading...</Button>
  ) : (
                            <Button
                              type="submit"
                              className={Classes.linkButton}
                              // onClick={handleSubmit}
                            >
                              <span>Submit Now</span>
                            </Button>
  )}
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Col>
                  <Col
                    lg={4}
                    className="bg-image"
                    style={{
                      backgroundImage:
                        "url(https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/1.jpg)",
                    }}
                  >
                    <div className="detail-box p-4">
                      <h5 className="text-white font-weight-light mb-3">
                        ADDRESS
                      </h5>
                      <p className="text-white op-7">
                        {" "}
                        SCF 1, 2nd Floor, Shopping Complex, Ashoka Enclave Part
                        II, Sector 37, Faridabad, Haryana 121003
                      </p>
                      <h5 className="text-white font-weight-light mb-3 mt-4">
                        CALL US
                      </h5>
                      <p className="text-white op-7">918800756846</p>
                      <h5 className="text-white font-weight-light mb-3 mt-4">
                        EMAIL ID
                      </h5>
                      <p className="text-white op-7">contact@learnerhunt.com</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    </>
  );
}
