import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Classes from "/styles/TopExam.module.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function TopExams({ exams }) {
  // console.log(exams)
  const [loadingExams, setLoadingExams] = useState([]);

  // const handleExamClick = (examSlug) => {
  //   setLoadingExams((prevLoadingExams) => [...prevLoadingExams, examSlug]);
  // };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      // partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
      slidestoSlide:4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      // partialVisibilityGutter: 50, // this is needed to tell the amount of px that should be visible.
      slidestoSlide:2

    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      // partialVisibilityGutter: 80, // this is needed to tell the amount of px that should be visible.
      slidestoSlide:1

    },
  };
  return (
    <div id="examId" className="container  my-5">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 style={{ fontSize: "calc(1em + 1vw)" }}>Top Exams</h2>
        <Link href={"/exams"} >
          <Button className={Classes.linkButton}>Explore More<ArrowOutwardOutlinedIcon  style={{marginLeft:"2px"}}/></Button>
        </Link>
      </div>
    

      {
         exams.length>1?
        <Carousel responsive={responsive} showDots={true} partialVisbile={false}>

          {
            exams.length>0?
            exams.map((exam,i) => (
              <div key={i} style={{marginBottom:"2rem"}}>
             <Link href={`/exams/${exam.slug}`} style={{textDecoration:"none"}}>
 
           <div className={Classes.card} key={exam.slug}>
             <div className={Classes.logo}>
               <img src={exam.exam_logo} alt={exam.logo} />
             </div>
             <div className={Classes.info}>
               <h4 className={Classes.name}>{exam.exam_name}</h4>
               <p className={Classes.fullName}>{exam.exam_full_name}</p>
               <div className={Classes.details}>
                 <span className={Classes.detailLabel}>Exam Date:</span>
               <p className={Classes.fullName}>{exam.exam_date}</p>
 
               {/* {exam.exam_dates.map((e,i)=>{
                 return(
                   <>
                   <span className={Classes.detailValue}>{e.date}</span>
                   {i!=exam.exam_dates.length - 1 && ","}
                   </>
 
                 )
               })} */}
               </div>
               <div className={Classes.details}>
                 <span className={Classes.detailLabel}>Exam Mode:</span>
                 <span className={Classes.detailValue}>{exam.exam_pattern[0].mode}</span>
               </div>
             </div>
             <div className={Classes.buttonContainer}>
               {/* {loadingExams.includes(exam.slug) ? (
                 <Button variant="danger">Loading...</Button>
               ) : ( */}
                 <Button
                 className={Classes.linkButton}
                   // onClick={() => handleExamClick(exam.slug)}
                 >
                    <span style={{marginRight:"3px"}}><VisibilityIcon fontSize="inherit"/></span>  View Exams
                 </Button>
               {/* )} */}
             </div>
 
           </div>
           </Link>
 
           </div>
         ))
            :"no record"
          }

        </Carousel>
        :
        <div className="row">
        {exams.map((exam,i) => (
             <div key={i} className="col-lg-3 col-md-6 mb-3">
            <Link href={`/exams/${exam.slug}`} style={{textDecoration:"none"}}>

          <div className={Classes.card} key={exam.slug}>
            <div className={Classes.logo}>
              <img src={exam.exam_logo} alt={exam.examname_short} />
            </div>
            <div className={Classes.info}>
              <h4 className={Classes.name}>{exam.exam_name}</h4>
              <p className={Classes.fullName}>{exam.exam_full_name}</p>
              <div className={Classes.details}>
                <span className={Classes.detailLabel}>Exam Date:</span>
              <p className={Classes.fullName}>{exam.exam_date}</p>

              {/* {exam.exam_dates.map((e,i)=>{
                return(
                  <>
                  <span className={Classes.detailValue}>{e.date}</span>
                  {i!=exam.exam_dates.length - 1 && ","}
                  </>

                )
              })} */}
              </div>
              <div className={Classes.details}>
                <span className={Classes.detailLabel}>Exam Mode:</span>
                <span className={Classes.detailValue}>{exam.exam_pattern[0].mode}</span>
              </div>
            </div>
            <div className={Classes.buttonContainer}>
              {/* {loadingExams.includes(exam.slug) ? (
                <Button variant="danger">Loading...</Button>
              ) : ( */}
                <Button
                className={Classes.linkButton}
                  // onClick={() => handleExamClick(exam.slug)}
                >
                   <span style={{marginRight:"3px"}}><VisibilityIcon fontSize="inherit"/></span>  View Exams
                </Button>
              {/* )} */}
            </div>

          </div>
          </Link>

          </div>
        ))}
      </div>
       }
    </div>
  );
}
