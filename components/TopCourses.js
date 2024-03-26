import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Classes from "/styles/TopCourses.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function TopCourses({ courses }) {
  const router = useRouter();

  // console.log(courses);
  const [loadingColleges, setLoadingColleges] = useState([]); // Added loadingColleges state
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [isCourses, setIsCourses] = useState(courses);
  const [active, setActive] = useState("ug");
  const [isLoading, setIsLoading] = useState(false);
  const [nameactive, setNameActive] = useState("Undergraduate");

  useEffect(() => {
    const fetchCourses = async () => {
      if (selectedCourseType) {
        setIsLoading(true);

        const coursesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/courses?limit=3&page=0&type=${selectedCourseType}`
        );
        const coursesData = await coursesRes.json();
        setIsCourses(coursesData.data);
        setIsLoading(false);
      } else {
        setIsCourses(courses);
      }
    };

    fetchCourses();
  }, [selectedCourseType]);

  // const handleCollegeClick = (collegeId) => {
  //   setLoadingColleges((prevLoadingColleges) => [...prevLoadingColleges, collegeId]);
  // };

  const coursesType = [
    {
      name: "Undergraduate",
      type: "ug",
    },
    {
      name: "Postgraduate",
      type: "pg",
    },
  ];

  const handleTabChange = (type, name) => {
    setActive(type);
    setNameActive(name);
    setSelectedCourseType(type);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      // partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
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
    <>
      <section id="courseId" className=" container  my-5">
        <div className=" d-flex justify-content-between align-items-center my-4">
          <h2 style={{ fontSize: "calc(1em + 1vw)" }}>
            Top Courses in{" "}
            <span style={{ color: "#0151c1" }}>{nameactive}</span> Program
          </h2>
          <Link href={`/courses?course=${active}`}>
            <Button className={Classes.linkButton}>
              Explore More
              <ArrowOutwardOutlinedIcon style={{ marginLeft: "2px" }} />
            </Button>
          </Link>
        </div>
        <div className="row">
          <div className="col-md-12 mb-4">
            <Stack direction="row" spacing={1}>
              {coursesType.map((course) => {
                return (
                  <Chip
                    key={course.type}
                    onClick={(e) => handleTabChange(course.type, course.name)}
                    label={course.name}
                    color="primary"
                    variant={active == course.type ? "" : "outlined"}
                    // className={`${Classes["customchip"]} ${
                    //   active == course.type ? Classes["active"] : ""
                    // }`}
                  />
                );
              })}
            </Stack>
          </div>
        </div>

        {isCourses.length > 1 ? (
          <Carousel
            responsive={responsive}
            showDots={true}
            partialVisbile={false}
          >
            {isCourses.length > 0
              ? isCourses.map((s) => {
                  return (
                    <div key={s.slug} style={{ marginBottom: "2rem" }}>
                      {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center h-100">
                          <Skeleton
                            variant="rectangular"
                            width={210}
                            height={118}
                          />
                        </div>
                      ) : (
                        <Link
                          href={`/courses/${s.slug}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Card className={Classes["course-card"]}>
                            <Card.Body>
                              <Card.Title className={Classes["course-title"]}>
                                {s.course_name}
                              </Card.Title>
                              {/* <p className={Classes["course-fullname"]}>{s.slug}</p> */}
                              <div className={Classes["course-info"]}>
                                <div className={Classes["course-details"]}>
                                  <span
                                    className={Classes["course-detail-label"]}
                                  >
                                    Duration:
                                  </span>
                                  <span
                                    className={Classes["course-detail-value"]}
                                  >
                                    {s.course_description[0].course_duration}
                                  </span>
                                </div>
                                <div className={Classes["course-details"]}>
                                  <span
                                    className={Classes["course-detail-label"]}
                                  >
                                    Fees:
                                  </span>
                                  <span
                                    className={Classes["course-detail-value"]}
                                  >
                                    {s.course_description[0].annual_course_fee}
                                  </span>
                                </div>
                              </div>
                            </Card.Body>
                            <Card.Footer>
                              {/* {loadingColleges.includes(s.slug) ? (
                        <Button variant="danger">Loading...</Button>
                      ) : ( */}
                              <Button
                                className={Classes.linkButton}
                                // onClick={() => handleCollegeClick(s.slug)}
                              >
                                <span style={{ marginRight: "3px" }}>
                                  <VisibilityIcon fontSize="inherit" />
                                </span>
                                View Course
                              </Button>
                              {/* )} */}
                            </Card.Footer>
                          </Card>
                        </Link>
                      )}
                    </div>
                  );
                })
              : "no record"}
          </Carousel>
        ) : (
          <div className="row">
            {isCourses.map((s) => {
              return (
                <div key={s.slug} className="col-lg-4 col-md-6 mb-3">
                  {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <Skeleton
                        variant="rectangular"
                        width={210}
                        height={118}
                      />
                    </div>
                  ) : (
                    <Link
                      href={`/courses/${s.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card className={Classes["course-card"]}>
                        <Card.Body>
                          <Card.Title className={Classes["course-title"]}>
                            {s.course_name}
                          </Card.Title>
                          {/* <p className={Classes["course-fullname"]}>{s.slug}</p> */}
                          <div className={Classes["course-info"]}>
                            <div className={Classes["course-details"]}>
                              <span className={Classes["course-detail-label"]}>
                                Duration:
                              </span>
                              <span className={Classes["course-detail-value"]}>
                                {s.course_description[0].course_duration}
                              </span>
                            </div>
                            <div className={Classes["course-details"]}>
                              <span className={Classes["course-detail-label"]}>
                                Fees:
                              </span>
                              <span className={Classes["course-detail-value"]}>
                                {s.course_description[0].annual_course_fee}
                              </span>
                            </div>
                          </div>
                        </Card.Body>
                        <Card.Footer>
                          {/* {loadingColleges.includes(s.slug) ? (
                    <Button variant="danger">Loading...</Button>
                  ) : ( */}
                          <Button
                            className={Classes.linkButton}
                            // onClick={() => handleCollegeClick(s.slug)}
                          >
                            <span style={{ marginRight: "3px" }}>
                              <VisibilityIcon fontSize="inherit" />
                            </span>
                            View Course
                          </Button>
                          {/* )} */}
                        </Card.Footer>
                      </Card>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
