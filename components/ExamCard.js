import React, { useState } from 'react';
import Link from 'next/link';
import { Image, Spinner ,Button } from 'react-bootstrap';
import Classes from "/styles/TopColleges.module.css";
import VisibilityIcon from '@mui/icons-material/Visibility';


const examCard = ({ exam }) => {
  const [loadingColleges, setLoadingColleges] = useState([]);

  const handleCollegeClick = (collegeId) => {
    setLoadingColleges((prevLoadingColleges) => [...prevLoadingColleges, collegeId]);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-3">
      <div className="row border-bottom">
        <div className="col-md-9">
          <div className='row'>
          <div className='col-2'>
          <Image
            src={exam.exam_logo == null ||exam.exam_logo == "" ? "/assets/images/DummyLOGO.jpg" : exam.exam_logo}
            alt="Not Found Image"
            width={80}
            height="auto"
          />
          </div>
          <div className='col-md-10'>
            <h6 className="fw-bold flex-wrap">{exam.exam_name}</h6>
            <p className="text-secondary mb-1">Exam Date: {exam.exam_date}</p>
            <p className="text-secondary mb-1">Mode: {exam.exam_pattern[0].mode}</p>
          </div>
          
        </div>
</div>
        <div className="col-md-3 d-flex align-items-center">
        <Link href={`/exams/${exam.slug}`}>
                      {loadingColleges.includes(exam.slug) ? (
                        <Button variant="danger">Loading...</Button>
                      ) : (
                        <Button
                        className={Classes.linkButton}
                          onClick={() => handleCollegeClick(exam.slug)}
                        >
                          <span style={{marginRight:"3px"}}><VisibilityIcon fontSize="inherit"/></span>View Exam
                        </Button>
                      )}
                    </Link>
        </div>
      </div>
    </div>
  );
};

export default examCard;