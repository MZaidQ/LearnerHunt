import React, { useEffect, useState } from "react";
import Classes from "/styles/common.module.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LoginForm from "./Loginuc";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import SearchModal from "./SearchModal";
import Image from "next/image";

export default function Topbar() {
  const [isWindowScroll, setIsWindowScroll] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  const [screenWidth, setsCreenWidth] = useState(1200);
  const [selectedSmList, setSelectedSmList] = useState("");
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [userrole, setUserRole] = useState(null);
  const [userStatus, setUserStatus] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [state, setState] = React.useState({
    right: false,
  });

  const router = useRouter();

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      if (windowHeight > 150) {
        setIsWindowScroll(true);
      } else {
        setIsWindowScroll(false);
      }
    }
  };
  useEffect(() => {
    setsCreenWidth(screen.width);
    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  useEffect(() => {
    const newstatus = localStorage.getItem("userid");
    // console.log(newstatus);
    if (newstatus) {
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/check-status", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userid")}`,
        },
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res)
        if (res.status) {
          setUserStatus(newstatus);
        } else {
          localStorage.removeItem("userid");
          localStorage.removeItem("status");
          localStorage.removeItem("useremail");
        }
      });
    } else {
      localStorage.removeItem("userid");
      localStorage.removeItem("status");
      localStorage.removeItem("useremail");
    }
  }, [userStatus]);

  const getSideList = (list, isMob) => {
    return list.map((el) => {
      if (el.children != undefined) {
        return (
          <li className={`${Classes["sage-menu-list"]}`} key={el.name}>
            <div
              className={` ${Classes["dwp-icon"]} d-flex justify-content-between align-items-center`}
              onClick={() => {
                if (selectedSmList == el.name) {
                  setSelectedSmList("");
                } else {
                  setSelectedSmList(el.name);
                }
              }}
            >
              {el.href != -1 ? (
                // <Link href={el.href}>
                <a href={el.href}>{el.name}</a>
              ) : (
                // </Link>
                <span style={{ cursor: "pointer" }}>{el.name}</span>
              )}
              {isMob ? (
                <img
                  src="/assets/images/01/down-arrow.svg"
                  alt="downarrow"
                  className={`${
                    selectedSmList == el.name ? Classes["dwp-img"] : ""
                  }`}
                  width={11}
                  height={7}
                />
              ) : null}
            </div>
            <ul
              className={`${Classes["drop-down-menu"]} ${
                isMob && selectedSmList == el.name
                  ? Classes["mob-dropdown"]
                  : ""
              }`}
            >
              {getSideList(el.children, isMob)}
            </ul>
          </li>
        );
      } else {
        return (
          <li key={el.name}>
            <Link href={el.href}>{el.name}</Link>
          </li>
        );
      }
    });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    // setShowToggleMenu(!showToggleMenu);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlelogin = (role) => {
    // console.log(role);
    // console.log("studentClick");
    setUserRole(role);
    setAnchorEl(null);
    setAnchorEl(null);
    setShowToggleMenu(false);
    setIsLoginFormOpen(true);
  };

  // console.log(getSideList(navbarList, 1));
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Dashboard", "LogOut"].map((text, index) => (
          <ListItem
            onClick={(e) => handlebuttons(text, index)}
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <DashboardIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handlebuttons = (text, index) => {
    // console.log(text, index);
    if (text.toLowerCase() == "dashboard") {
      router.push("/dashboard");
    }
    if (text.toLowerCase() == "logout") {
      try {
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userid")}`,
          },
        }).then(async (response) => {
          var res = await response.json();
          // console.log(res.data)
          // console.log(res.data.status)
          if (res.data.status == false) {
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              localStorage.clear();
              window.location.href = "/";
            });
            //            localStorage.setItem("status", "");
            // localStorage.setItem("userid", "");
            // localStorage.setItem("useremail", "");
          }
        });
      } catch (error) {
        console.error("Failed to fetch OTP:", error);
      }
    }
  };

  const handleProfile = (e, anchor) => {
    toggleDrawer(anchor, true)(e);
    setShowToggleMenu(false);
  };
  return (
    <>
      {screenWidth > 992 ? (
        <>
          {/* Top header start */}

          {/* Top header end */}

          {/* sage logo start */}
          {/* This Section is hiding */}
          {/* <div className={`${Classes["Sage-logo"]}`}>
            <div className="container">
              <div className="row">
                <div className="col-xl-6">
                  <div className={`${Classes["sage-logo"]}`}>
                    {!isWindowScroll && (
                      <Link href="/">
                        <img
                          loading="lazy"
                          src="/assets/images/Svglogo.svg"
                          alt="sagenext logo"
                          width={176}
                          height={50}
                        />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className={`${Classes["sage-logo-menu"]}`}>
                    <ul type="none">
                      <li>
                        <Link href="https://portal.thesagenext.com/login">
                          My Acount
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.thesagenext.com/blog/">
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* This Section is hiding */}
          {/* sage logo end */}

          {/* Sage Menu start */}
          <div
            className={`${Classes["sage-menu"]} ${
              isWindowScroll ? Classes["sage-sticky-menu"] : ""
            }`}
          >
            <div className={`${Classes["top-header"]}`}>
              <div className="container">
                <div className="row">
                  <div className="col-3">
                    <p className={`${Classes["top-header-para"]}`}>
                      <img
                        loading="lazy"
                        src="/assets/images/topbar/support.svg"
                        className="me-1"
                        alt="support"
                        width={12}
                        height={14}
                      />
                      Sales/Support +91-8800756846
                    </p>
                  </div>
                  <div className="col-6">
                    <p className={`${Classes["top-header-para"]}`}>
                      Download the app to find best colleges for you.{" "}
                      <a
                        target="_blank"
                        aria-label="Download Now"
                        href="https://play.google.com/store/apps/details?id=com.learnerhunt.app"
                      >
                        Download Now
                      </a>
                    </p>
                  </div>
                  <div className="col-3">
                    <div className={Classes["topnav-icons"]}>
                      <Link
                        target="_blank"
                        href="https://www.facebook.com/learnerhunt/"
                      >
                        <img
                          src="/assets/images/footer/facebook.webp"
                          alt="facebook"
                          width={30}
                          height={30}
                        />
                      </Link>
                      <Link
                        target="_blank"
                        href="https://twitter.com/learnerhunt"
                      >
                        <img
                          src="/assets/images/footer/twitter.webp"
                          alt="twitter"
                          width={30}
                          height={30}
                        />
                      </Link>
                      <Link
                        target="_blank"
                        href="https://www.instagram.com/learnerhunt_india/"
                      >
                        <img
                          src="/assets/images/footer/instagram.webp"
                          alt="instagram"
                          width={30}
                          height={30}
                        />
                      </Link>
                      <Link
                        target="_blank"
                        href="https://in.linkedin.com/company/learnerhunt-com"
                      >
                        <img
                          src="/assets/images/footer/linkedin.webp"
                          alt="linkedIn"
                          width={30}
                          height={30}
                        />
                      </Link>
                      <Link
                        target="_blank"
                        href="https://www.youtube.com/@Learnerhunt"
                      >
                        <img
                          src="/assets/images/footer/youtube.webp"
                          alt="youtube"
                          width={30}
                          height={30}
                        />
                      </Link>
                    </div>
                  </div>

                  {/* <div className="col-9">
                <marquee>
                  <Link
                    className="text-decoration-none"
                    href="https://www.google.com/search?q=iit+hyderabad+jee+advanced+cut+off&oq=IIT+hyderabad+jee+advanced+cut+off&gs_lcrp=EgZjaHJvbWUqCQgAECMYJxiKBTIJCAAQIxgnGIoFMggIARAAGBYYHtIBCDExMzhqMGo5qAIAsAIA&sourceid=chrome&ie=UTF-8"
                  >
                    <p className={`${Classes["top-header-para"]}`}>
                      <span className={`${Classes["top-header-news"]}`}>
                        News :-
                      </span>
                      IIT hyderabad jee advanced cut off
                    </p>
                  </Link>
                </marquee>
              </div> */}
                </div>
              </div>
            </div>
            <div className={` ${Classes["con-large"]} container `}>
              <div className={`${Classes["sage-menu-container"]}`}>
                <div className={`${Classes["sage-sticky-logo"]}`}>
                  {/* {isWindowScroll && (
                    <Link href="/">
                      <img
                        loading="lazy"
                        src="/assets/images/Svglogo.svg"
                        alt="sagenext logo"
                        width={176}
                        height={50}
                      />
                    </Link>
                  )} */}
                  <Link href="/">
                    <img
                      loading="lazy"
                      // src="/assets/images/Svglogo.svg"
                      src="/assets/images/Learnerhunt-Logo.webp"
                      alt="sagenext logo"
                      width={176}
                      height={55}
                    />
                  </Link>
                </div>
                <div className={`${Classes["sage-menu-item"]}`}>
                  <ul>
                    {/* {getSideList(navbarList)} */}
                    <li className={`${Classes["sage-menu-list"]}`}>
                      <Link href="/">Home</Link>
                    </li>
                    <li className={`${Classes["sage-menu-list"]}`}>
                      <Link href="/colleges">Colleges</Link>
                    </li>
                    <li className={`${Classes["sage-menu-list"]}`}>
                      <Link href="/courses">Courses</Link>
                    </li>
                    <li className={`${Classes["sage-menu-list"]}`}>
                      <Link href="/exams">Exams</Link>
                    </li>
                    <li className={`${Classes["sage-menu-list"]}`}>
                      <Link href="/comingsoon">Study Abroad</Link>
                    </li>
                  </ul>
                </div>
                <div className={`${Classes["contact-cta"]}`}>
                  {/* <Link href="#">Sign In</Link>&nbsp; */}
                  {/* <Link href="#"> */}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsSearchModalOpen(true)}
                  >
                    <SearchIcon />
                  </span>
                  &nbsp;
                  {!userStatus ? (
                    <>
                      <span
                        className={Classes.loginbutton}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        // endIcon={<KeyboardArrowDownIcon />}
                        // style={{ color: "white",background:"#0151c1",borderRadius:"25px",padding:"0.2rem 1rem 0.5rem 1rem"}}
                      >
                        Log In
                      </span>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={() => handlelogin(3)}>
                          Student
                        </MenuItem>
                        <MenuItem onClick={() => handlelogin(2)}>
                          Counsellor
                        </MenuItem>
                        <MenuItem onClick={() => handlelogin(1)}>
                          College
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    // <Link href="/dashboard"
                    //   // onClick={handleClickDashboard}
                    // >
                    //   Go To Dashboard
                    // </Link>
                    <span>
                      {["right"].map((anchor) => (
                        <React.Fragment key={anchor}>
                          <span
                            className={Classes.loginbutton}
                            onClick={toggleDrawer(anchor, true)}
                          >
                            Profile
                          </span>
                          <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                          >
                            {list(anchor)}
                          </Drawer>
                        </React.Fragment>
                      ))}
                    </span>
                  )}
                  {/* </Link> */}
                  &nbsp;
                  <Link href="/contact-us">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Sage Menu end */}
        </>
      ) : (
        <>
         
          <div
            className={`${Classes["sage-menu"]} ${
              isWindowScroll ? Classes["sage-sticky-menu"] : ""
            }`}
          >
              <div className={`${Classes["mobile-top-header"]}`}>
              {/* <div className="container">
                <div className="row">
                  <div className="col-12">
                    <p className={`${Classes["top-header-para"]}`}>
                      Download the app to find best colleges for you.{" "}
                      <a
                        target="_blank"
                        aria-label="Download Now"
                        href="https://play.google.com/store/apps/details?id=com.learnerhunt.app"
                      >
                        Download Now
                      </a>
                    </p>
                  </div>
                </div>
              </div> */}
                    <p className={`${Classes["mobile-center-part"]}`}>
                    <a
                        target="_blank"
                        aria-label="Download"
                        href="https://play.google.com/store/apps/details?id=com.learnerhunt.app"
                      >
                        Download
                      </a> the app to find best colleges for you.{" "}
                    </p>

                      
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className={`${Classes["sage-logo"]}`}>
                    <Link href="/">
                      <img
                        loading="lazy"
                        // src="/assets/images/Svglogo.svg"
                        src="/assets/images/Learnerhunt-Logo.webp"
                        alt="sagenext logo"
                        width={150}
                        height={50}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-2">
                  <div className={`${Classes["sage-toggle-icon"]} text-end`}>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsSearchModalOpen(true)}
                    >
                      <SearchIcon />
                    </span>
                  </div>
                </div>
                <div className="col-4">


                  <div className={`${Classes["sage-toggle-icon"]} text-end`}>
                    <img
                      loading="lazy"
                      onClick={() => setShowToggleMenu(!showToggleMenu)}
                      src="/assets/images/topbar/toggle-icon.svg"
                      alt="toggle"
                      width={25}
                      height={25}
                    />
                  </div>


                  
                </div>
              </div>
            </div>
          </div>
          <div className={Classes["sm-menu"]}>
            <div
              className={`${Classes["toggle-menu-container"]} ${
                showToggleMenu ? Classes["show"] : ""
              }`}
            >
              <div
                className={`${Classes["left-toggle-menu"]}`}
                onClick={() => setShowToggleMenu(!showToggleMenu)}
              ></div>
              <div className={`${Classes["right-toggle-menu"]}`}>
                <div className={`${Classes["top-toggle-menu"]}`}>
                  <div className={`${Classes["sage-flex"]}`}>
                    <ul>
                      <li onClick={() => setShowToggleMenu(!showToggleMenu)}>
                        <Link href="/contact-us">Contact US</Link>
                      </li>

                      <li>
                        {!userStatus ? (
                          <>
                            <Button
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              Log In
                            </Button>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              style={{ zIndex: "99999" }}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem onClick={() => handlelogin(3)}>
                                Student
                              </MenuItem>
                              <MenuItem onClick={() => handlelogin(2)}>
                                Counsellor
                              </MenuItem>
                              <MenuItem onClick={() => handlelogin(1)}>
                                College
                              </MenuItem>
                            </Menu>
                          </>
                        ) : (
                          <>
                            {["right"].map((anchor) => (
                              <React.Fragment key={anchor}>
                                <span
                                  onClick={(e) => handleProfile(e, anchor)}
                                  // .then(()=>{setShowToggleMenu(false)})
                                >
                                  Profile
                                </span>
                                <Drawer
                                  anchor={anchor}
                                  open={state[anchor]}
                                  onClose={toggleDrawer(anchor, false)}
                                >
                                  {list(anchor)}
                                </Drawer>
                              </React.Fragment>
                            ))}
                          </>
                        )}
                      </li>
                    </ul>

                    <span onClick={() => setShowToggleMenu(!showToggleMenu)}>
                      <img
                        loading="lazy"
                        src="/assets/images/topbar/Cancel-Icon.svg"
                        alt="cancel"
                      />
                    </span>
                  </div>
                  <div className={`${Classes["sage-toggle-menu-list"]}`}>
                    {/* <ul>{getSideList(mobNavbarList, 1)}</ul> */}
                    <ul>
                      <li
                        onClick={() => setShowToggleMenu(!showToggleMenu)}
                        className={`${Classes["sage-menu-list"]}`}
                      >
                        <Link href="/">Home</Link>
                      </li>
                      <li
                        onClick={() => setShowToggleMenu(!showToggleMenu)}
                        className={`${Classes["sage-menu-list"]}`}
                      >
                        <Link href="/colleges">Colleges</Link>
                      </li>
                      <li
                        onClick={() => setShowToggleMenu(!showToggleMenu)}
                        className={`${Classes["sage-menu-list"]}`}
                      >
                        <Link href="/courses">Courses</Link>
                      </li>
                      <li
                        onClick={() => setShowToggleMenu(!showToggleMenu)}
                        className={`${Classes["sage-menu-list"]}`}
                      >
                        <Link href="/exams">Exams</Link>
                      </li>
                      <li
                        onClick={() => setShowToggleMenu(!showToggleMenu)}
                        className={`${Classes["sage-menu-list"]}`}
                      >
                        <Link href="/comingsoon">Study Abroad</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className={`${Classes["bottom-toggle-menu"]}`}> */}
                  {/* <div className={`${Classes["bottom-toggle-menu-list"]}`}>
                    <ul>
                      <li>
                        <Link href="#">
                          <>
                            <img
                              loading="lazy"
                              src="/assets/images/topbar/my-account.svg"
                              alt=""
                              width={19}
                              height={23}
                            />
                            My Account
                          </>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <>
                            <img
                              loading="lazy"
                              src="/assets/images/topbar/blog.svg"
                              alt=""
                              width={18}
                              height={23}
                            />
                            Blog
                          </>
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                  {/* <hr className="my-sm-4" /> */}
                  <div className={`${Classes["bottom-toggle-menu-cta"]}`}>
                    <div className="mt-2">
                      <span> Sales/Support </span>
                      <br /> <br />
                      <a href="tel:+1-855-922-7243">
                        <span> +91-8800756846</span>
                      </a>
                      <a href="https://play.google.com/store/apps/details?id=com.learnerhunt.app">
                        <span>Download App</span>
                      </a>
                    </div>
                  </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          {/* jhvnjvn */}
        </>
      )}
      {isLoginFormOpen && (
        <LoginForm
          isOpen={isLoginFormOpen}
          onClose={() => setIsLoginFormOpen(false)}
          role={userrole}
        />
      )}

      {isSearchModalOpen && (
        <SearchModal onHide={() => setIsSearchModalOpen(false)} />
      )}
    </>
  );
}
