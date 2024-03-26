import React, { useEffect, useState } from "react";
import { Button, Badge, Card, Container, Row, Col, Nav ,Spinner } from "react-bootstrap";
import Classes from "/styles/userdashboard.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import MyProfile from "../../components/studentdashboard/MyProfile";
import Educational from "../../components/studentdashboard/Educational";
import CollegeComponent from "../../components/studentdashboard/CollegeComponent";
// import MyFeed from "../../components/studentdashboard/Myfeed";
import Rate from "../../components/studentdashboard/Rate";
// import PastExperience from "../../components/studentdashboard/PastExperience";
// import CounsellerHistory from "../../components/studentdashboard/CounsellerHistory";





import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


export default function Index(props) {
  const [activeLink, setActiveLink] = useState("myprofile"); // state to manage active link
  const [sidemenuopen, setSidemenuopen] = useState(false);
  const [isuserlogin,setIsuserlogin] = useState(false);
  // Function to handle link clicks
  const handleLinkClick = (link) => {
    // console.log(link);
    setActiveLink(link);
  };

  useEffect(() => {
    if(localStorage.getItem("userid")==null && localStorage.getItem("userid")==undefined){
      window.history.back()
    }else{
      setIsuserlogin(true)
    }
  
  }, [])


  


  return (
    <>
    {isuserlogin&&
    <div
    className={Classes["stud-dashboard"]}
    style={{ backgroundColor: "#f8f8f8",height: "calc(100vh - 100px)" }}
  >
        

    <Container>
      <span className={`${Classes["arrowbutton"]}`} onClick={()=>setSidemenuopen(!sidemenuopen)}>
        <ArrowForwardIcon />
      </span>
      <Row>
        <Col md={3} xs={5} className={`${Classes["sidebar-parent"]} ${sidemenuopen?Classes["show"]:""}`}>
          {/* Sidebar content here */}
          <div className={Classes["sidebar"]}>
            <ul>
              <li
                onClick={() => handleLinkClick("myprofile",setSidemenuopen(!sidemenuopen))}
                className={activeLink === "myprofile" ? Classes["active"] : ""}
              >
                My Profile
              </li>
              <li
                onClick={() => handleLinkClick("educational",setSidemenuopen(!sidemenuopen))}
                className={activeLink === "educational" ? Classes["active"] : ""}
              >
               Educational background
              </li>
              <li
                onClick={() => handleLinkClick("college",setSidemenuopen(!sidemenuopen))}
                className={activeLink === "college" ? Classes["active"] : ""}
              >
                Applied Colleges
              </li>
              {/* <li
                onClick={() => handleLinkClick("myfeed",setSidemenuopen(!sidemenuopen))}
                className={activeLink === "myfeed" ? Classes["active"] : ""}
              >
               My Feed
              </li> */}
               {/* <li
                onClick={() => handleLinkClick("pastexp",setSidemenuopen(!sidemenuopen))}
                className={activeLink === "pastexp" ? Classes["active"] : ""}
              >
              Past Experience
              </li> */}
              {/* <li
                onClick={() => handleLinkClick("counsellerhistory",setSidemenuopen(!sidemenuopen))}
                className={activeLink === "counsellerhistory" ? Classes["active"] : ""}
              >
             Counselling History
              </li> */}
                 <li
                onClick={() => handleLinkClick("rate",setSidemenuopen(!sidemenuopen))}
                className={activeLink === "rate" ? Classes["active"] : ""}
              >
              Rate this platform
              </li>
            </ul>
          </div>
        </Col>
   
        <Col md={9} xs={7} className={`${Classes["sidebar-content"]} ${sidemenuopen?Classes["show"]:""}`}>
          <div className={Classes['outercontainer']}>
          {/* Conditional rendering of content based on activeLink state */}
          {activeLink === "myprofile" && <MyProfile />}
          {activeLink === "educational" && <Educational />}
          {activeLink === "college" && <CollegeComponent />}
          {/* {activeLink === "myfeed" && <MyFeed/>} */}
          {/* {activeLink === "pastexp" && <PastExperience/>} */}
          {/* {activeLink === "counsellerhistory" && <CounsellerHistory/>} */}

          {activeLink === "rate" && <Rate/>}


          </div>
      
        </Col>
        

      </Row>
    </Container>


  </div>}
    </>
  );
}
