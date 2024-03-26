import React, { useState } from 'react';
import Link from 'next/link';
import { Image, Spinner, Button } from 'react-bootstrap';
import Classes from "/styles/TopColleges.module.css";
import VisibilityIcon from '@mui/icons-material/Visibility';


const CollegeCard = ({ college }) => {
  const [loadingColleges, setLoadingColleges] = useState([]);

  const { square_img_path, name, ratings, short_address, slug } = college;

  const handleCollegeClick = (collegeId) => {
    setLoadingColleges((prevLoadingColleges) => [...prevLoadingColleges, collegeId]);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4" key={college.slug}>
      <div className="row border-bottom" >
        <div className="col-md-9">
          <div className='row' >
            <div className='col-2'>
              <Image
                src={square_img_path}
                onError={(e) =>
                  (e.target.src = "/assets/images/DummySQUARE.jpg")
                }
                alt="Not Found Image"
                width={80}
                height={80}
                className="me-4 rounded img-fluid"
              />
            </div>
            <div className='col-md-10'>
              <h6 className="fw-bold flex-wrap">{name}</h6>
              <p className="text-secondary mb-1">Rating: {ratings}</p>
              <p className="text-secondary mb-1">Location: {short_address}</p>
            </div>

          </div>
        </div>
        <div className="col-md-3">
          <Link href={`/colleges/${slug}`}>
            {loadingColleges.includes(slug) ? (
              <Button variant="danger">Loading...</Button>
            ) : (
              <Button
                className={Classes.linkButton}
                onClick={() => handleCollegeClick(slug)}
              >
                <span style={{ marginRight: "3px" }}><VisibilityIcon fontSize="inherit" /></span> View College
              </Button>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;