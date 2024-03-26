import React, { useEffect, useState } from "react";
import { Button, Badge, Card, Container, Row, Col, Nav } from "react-bootstrap";
import Classes from "/styles/userdashboard.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Link from "next/link";
import CircularProgress from '@mui/material/CircularProgress';

export default function CollegeComponent() {
  const [active, setActive] = useState(1);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const [value, setValue] = React.useState("3");
  const [studentdata, setStudentdata] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const handleTabClick = () => {
    setIsRecommendationOpen(!isRecommendationOpen);
  };
  const handleActiveTab = (tab) => {
    setActive(tab);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const studentdataget = async () => {
    const student_res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/student/get-applied-colleges`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("userid")}`
          }
        }
    );
    const student = await student_res.json();
    setStudentdata(student.data);
    setIsLoading(false); // Set loading to false after data fetch
  };

  useEffect(() => {
    studentdataget();
  }, []);

  return (
   <>
      {/* <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="1" label="Recommendations" />
                <Tab value="2" label="Shortlists" />
          <Tab value="3" label="Application" />
        </Tabs>
      </Box> */}

      <div style={{ marginTop: "20px" }}>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center fw-bold " style={{ height: "76vh" }}>
      <CircularProgress />
          </div>
        ) : studentdata.length > 0 ? (
          studentdata?.map((s, i) => {
            return (
              <Card key={i} style={{ marginBottom: "20px", padding: "1rem", border:`${s.status?'':'1px solid red'}` }}>
                <Container>
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col md={2}>
                      <Card.Img 
                        className="img-fluid"
                        src={s.logo_img_path}
                        onError={(e) =>
                          (e.target.src = "/assets/images/DummyLOGO.jpg")
                        }
                        alt="Image"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit:"contain"
                        }}
                      />
                    </Col>
                    <Col md={7}>
                      <h2>{s.college_name}</h2>
                      <span>{s.location}</span>
                      <p>Applied Courses : <span style={{backgroundColor:"#e9ecff",padding:"0.2rem 0.5rem"}}>{s.applied_courses}</span></p>

                    </Col>
                    
                    <Col md={3}>
                    {s.status &&
                      <Link href={`/colleges/${s.slug}`}>
                        <Button variant="primary">View College</Button>
                      </Link>
                    }
                    </Col>
                  </Row>
                </Container>
              </Card>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center fw-bold " style={{ height: "76vh" }}><a href="/colleges" style={{textDecoration:"none"}}>Click here to apply</a></div>
        )}
      </div>
      </>
  );
}