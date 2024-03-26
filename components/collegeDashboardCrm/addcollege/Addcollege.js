import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Classes from "/styles/addCollege.module.css";
import Gernal from "./addcollegefields/Gernal";
import Overview from "./addcollegefields/Overview";
import Courses from "./addcollegefields/Courses";
import Campus from "./addcollegefields/Campus";
import Admission from "./addcollegefields/Admission";
import Placement from "./addcollegefields/Placement";
import Scholorship from "./addcollegefields/Scholorship";
import Cutoff from "./addcollegefields/Cutoff";
import { Spinner } from "react-bootstrap";
import CollegeRanking from "./addcollegefields/CollegeRanking";
import Gallary from "./addcollegefields/Gallary";
import { useRouter } from "next/router";

const Addcollege = (props) => {
  const router = useRouter();
  // console.log(router);
  const { e } = router.query;
  // console.log(e);
  var disabledTabs = [];
  if (e && e != undefined) {
    disabledTabs = ['1','2','3','4','5','6','7','8','9'];
  } else {
    disabledTabs = [];
  }
  const [selectedTab, setSelectedTab] = useState("0");

  const handleSelectTab = (k) => {
    setSelectedTab(k);
    // console.log("hjvghug");
    sessionStorage.setItem("ct", k);
  };

  const defaultOpentab = () => {
    const sTab = sessionStorage.getItem("ct");
    if (sTab && sTab != "0") {
      handleSelectTab(sTab);
    }
  };

  useEffect(() => {
    const sTab = sessionStorage.getItem("ct");
    if (!disabledTabs.includes(sTab)) {
      // console.log("colling")
      defaultOpentab();
    }
  }, []);

  const onSuccess = () => {
    defaultOpentab();
  };

  // console.log("hfhuhgv")
  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className={`${Classes["custom-tabs mb-3"]}`}
        onSelect={(k) => handleSelectTab(k)}
        activeKey={selectedTab}
        style={{
          background: "white",
          position: "sticky",
          top: "0",
          zIndex: "9",
        }}
      >
        <Tab
          eventKey="0"
          title="General Info"
          disabled={disabledTabs.includes("0")}
        >
          {selectedTab == "0" && <Gernal edit_id={e}/>}
        </Tab>
        <Tab
          eventKey="1"
          title="Overview"
          disabled={disabledTabs.includes("1")}
        >
          {selectedTab == "1" && (
            <Overview onSuccess={onSuccess}/>
          )}
        </Tab>
        <Tab
          eventKey="2"
          title="Courses"
          disabled={disabledTabs.includes("2")}
        >
          {selectedTab == "2" && (
            <Courses onSuccess={onSuccess}/>
          )}
        </Tab>
        <Tab
          eventKey="3"
          title="Campus"
          disabled={disabledTabs.includes("3")}
        >
          {selectedTab == "3" && (
            <Campus onSuccess={onSuccess}/>
          )}
        </Tab>
        <Tab
          eventKey="4"
          title="Admission"
          disabled={disabledTabs.includes("4")}
        >
          {selectedTab == "4" && (
            <Admission onSuccess={onSuccess}/>
          )}
        </Tab>
        <Tab
          eventKey="5"
          title="ScholarShip"
          disabled={disabledTabs.includes("5")}
        >
          {selectedTab == "5" && (
            <Scholorship onSuccess={onSuccess}/>
          )}
        </Tab>
        <Tab
          eventKey="6"
          title="Placement"
          disabled={disabledTabs.includes("6")}
        >
          {selectedTab == "6" && (
            <Placement onSuccess={onSuccess}/>
          )}
        </Tab>
        <Tab
          eventKey="7"
          title="Cut Off"
          disabled={disabledTabs.includes("7")}
        >
          {selectedTab == "7" && (
            <Cutoff onSuccess={onSuccess}/>
          )}
        </Tab>
        {/* <Tab
          eventKey="8"
          title="College Ranking"
          disabled={disabledTabs.includes("8")}
        >
          {selectedTab == "8" && (
            <CollegeRanking onSuccess={onSuccess}/>
          )}
        </Tab> */}
        <Tab
          eventKey="9"
          title="Gallery"
          disabled={disabledTabs.includes("9")}
        >
          {selectedTab == "9" && (
            <Gallary onSuccess={onSuccess}/>
          )}
        </Tab>
      </Tabs>
    </>
  );
};
export default Addcollege;
