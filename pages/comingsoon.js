import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Classes from "/styles/thankyou.module.css";
import Link from "next/link";

const ThankYouPage = () => {
  return (
    <div className="row border-top border-3 border-primary gx-0">
      <div className="col-md-6 mx-auto">
        <div className="  bg-white  p-5">
          <div className="mb-4 text-center">
      
          </div>
          <div className="text-center">
            <h1 className="mb-2">Coming Soon!</h1>
            <p>
            We are working on something amazing.
              <br /> Stay tuned for updates!
           
            </p>
            <Link href="/">
              <Button className={Classes.linkButton}>
                <span>Back Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
