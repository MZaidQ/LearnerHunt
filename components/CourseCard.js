import React, { useState } from 'react';
import Link from 'next/link';
import { Image, Spinner ,Button } from 'react-bootstrap';
import Classes from "/styles/TopColleges.module.css";
import VisibilityIcon from '@mui/icons-material/Visibility';


const CourseCard = ({ course }) => {
  const [loadingColleges, setLoadingColleges] = useState([]);

  const handleCollegeClick = (collegeId) => {
    setLoadingColleges((prevLoadingColleges) => [...prevLoadingColleges, collegeId]);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-3">
      <div className="row border-bottom">
        <div className="col-md-9">
          <div className='row'>
        
          <div className='col-md-12'>
            <h6 className="fw-bold flex-wrap">{course.course_name}</h6>
            <p className="text-secondary mb-1">Duration: {course.course_description[0].course_duration}</p>
            <p className="text-secondary mb-1">Fees: {course.course_description[0].annual_course_fee}</p>
          </div>
          
        </div>
</div>
        <div className="col-md-3 d-flex align-items-center">
        <Link href={`/courses/${course.slug}`}>
                      {loadingColleges.includes(course.slug) ? (
                        <Button variant="danger">Loading...</Button>
                      ) : (
                        <Button
                        className={Classes.linkButton}
                          onClick={() => handleCollegeClick(course.slug)}
                        >
                          <span style={{marginRight:"3px"}}><VisibilityIcon fontSize="inherit"/></span>View Course
                        </Button>
                      )}
                    </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;