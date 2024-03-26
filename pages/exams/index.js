import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FormControl, Button, Typography, Slider } from "@mui/material";
import FilterComponent from "../../components/FilterComponent";
import ExamCard from "@/components/ExamCard";
import CircularProgress from "@mui/material/CircularProgress";

export default function index(testeligibility, filterCollege) {
    const [searchResults, setSearchResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);


  const examsdata = async() =>{
    setIsLoading(true)
    const filterExam_res =  await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/exams?limit=-1&page=0");
    const filterExam =  await filterExam_res.json();
    // console.log(filterExam)
    setSearchResults(filterExam.data);
    setIsLoading(false);
  }
    useEffect(() => {
        examsdata()
      }, []);
  return (
    <div className="my-5">
      <Container>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between align-items-center ">
              <h4 className="font-bold mb-4" style={{color:"#0151c1"}}>Exams</h4>
           
            </div>
            <div style={{ overflow: "auto", height: "400px" }}>
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <CircularProgress color="inherit" size={30} />
                </div>
              ) :(
                <div className="grid grid-cols-1 gap-4">
                  {searchResults.map((exam) => (
                    <ExamCard key={exam.slug} exam={exam} />
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

