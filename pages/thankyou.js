import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Classes from "/styles/thankyou.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const ThankYouPage = () => {
  const router = useRouter();
  return (
    <div className="row border-top border-3 border-primary gx-0">
      <div className="col-md-6 mx-auto">
        <div className="  bg-white  p-5">
          <div className="mb-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ fill: "green" }}
              width="75"
              height="75"
              fill="currentColor"
              className="bi bi-check-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="mb-2">Thank you for getting in touch!</h1>
            <p>
              We appreciate your precious time.
              <br /> Our representative will get back in touch with you soon!
              <br /> For an immediate response, please use the contact number
              listed below.
              <br /> Have a great day!
            </p>
            {/* <Link href="back"> */}
              <Button onClick={()=>router.back()} className={Classes.linkButton}>
                <span>Go Back</span>
              </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
