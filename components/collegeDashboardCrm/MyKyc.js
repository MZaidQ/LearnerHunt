import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import styles from "/styles/studentProfile.module.css";
import { genderType } from "@/components/Comps/type";
import { maritalType } from "@/components/Comps/type";
import { Physicalchallenge } from "@/components/Comps/type";
import { DesignationType } from "@/components/Comps/type";

import FormatDate from "/components/Comps/FormatDate";
import Swal from "sweetalert2";
import CTA from "/components/Comps/CTA";
import { Spinner } from "react-bootstrap";
import { IndianStates } from "/components/Comps/StatesIndia";

import { TextField, MenuItem } from "@mui/material";
var oldData = [];
const MyKyc = () => {
  const [showmykycinput, setshowmykycinput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // kyc Details

  const [collegename, setcollegename] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [maritalstatus, setMaritalstatus] = useState("");
  const [physically, setPhysically] = useState("");
  const [adminname, setAdminName] = useState("");
  const [clgmobile, setClgMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [referrer, setReferrer] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  // const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const studentDataApi = () => {
    setIsLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/college/my-kyc", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ct")}`,
      },
    })
      .then(async (response) => {
        var res = await response.json();
        // console.log(res.data);
        oldData = res.data;
        setcollegename(res.data.college_name);
        setAdminName(res.data.name);
        setDate(res.data.dob.split('T')[0]);
        setGender(res.data.gender);
        setMaritalstatus(res.data.merital_status);
        setPhysically(res.data.disablity);
        setClgMobile(res.data.mobile);
        setCountry(res.data.country);
        setState(res.data.state);
        setCity(res.data.city);
        setEmail(res.data.email);
        setDesignation(res.data.designation);
        setReferrer(res.data.referrer);
        setLinkedIn(res.data.linkedin_link);
        setVerified(res.data.verified);

        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    studentDataApi();
  }, []);
  const handleSubmit = () => {
    // console.log("hello");
    if (showmykycinput) {
      if (clgmobile.length !== 10 || /\s/.test(clgmobile)) {
        // Display an error message or take the appropriate action
        setError(true);
      } else {
        // Your form submission logic
        setError(false);
        setIsLoading(true);
        const fd = new FormData();
        fd.append("name", adminname);
        fd.append("dob", date);
        fd.append("gender", gender);
        fd.append("linkedin_link", linkedIn);
        fd.append("designation", designation);
        fd.append("referrer", referrer);
        fd.append("merital_status", maritalstatus);
        fd.append("disablity", physically);
        fd.append("mobile", clgmobile);
        fd.append("city", city);
        fd.append("state", state);
        fd.append("country", country);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/college/my-kyc`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ct")}`,
          },
          method: "PUT",
          body: fd,
        }).then(async (response) => {
          var res = await response.json();
          // console.log(res);
          setIsLoading(false);
          if (response.ok) {
            // console.log("hello", response.data);

            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setshowmykycinput(false);
              studentDataApi();
            });
          } else {
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsLoading(false);
            });
          }
        });
      }
    }
  };

  const handleKycclose = () => {
    // console.log(oldData)
    setcollegename(oldData.college_name);
    setAdminName(oldData.name);
    setDate(oldData.dob.split('T')[0]);
    setGender(oldData.gender);
    setMaritalstatus(oldData.merital_status);
    setPhysically(oldData.disablity);
    setClgMobile(oldData.mobile);
    setCountry(oldData.country);
    setState(oldData.state);
    setCity(oldData.city);
    setEmail(oldData.email);
    setDesignation(oldData.designation);
    setReferrer(oldData.referrer);
    setLinkedIn(oldData.linkedin_link);
    setshowmykycinput(false);
  };

  return (
    <>
      {!isLoading ? (
        <>
          <div className={styles["basic-details"]} style={{ margin: "0.5rem" }}>
            <div className={styles["basic"]}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: "0px 5px" }}>My KYC</h3>
                <img
                  src={
                    verified
                      ? "/assets/images/verified.png"
                      : "/assets/images/notverified.png"
                  }
                  width={35}
                  height={35}
                  alt="img"
                />
              </div>
              {showmykycinput ? (
                <div style={{ display: "flex" }}>
                  <p onClick={handleKycclose}>
                    <CloseIcon color="error" fontSize="large" />
                  </p>
                </div>
              ) : (
                <p onClick={() => setshowmykycinput(true)}>
                  <EditIcon color="info" fontSize="large" />
                </p>
              )}
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>College Name</div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      placeholder={collegename}
                      size="small"
                      margin="dense"
                      type="text"
                      disabled
                      value={collegename}
                      onChange={(e) =>
                        setcollegename(
                          e.target.value.charAt(0).toUpperCase() +
                            e.target.value.slice(1)
                        )
                      }
                    />
                  ) : (
                    <h6>{collegename || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Admin Name</div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={adminname}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                    
                        // Regular expression to check if the input contains only English characters
                        const isEnglish = /^[a-zA-Z\s]*$/.test(inputValue);
                    
                        // If the input contains only English characters, update the state
                        if (isEnglish) {
                          setAdminName(
                            inputValue
                              .split(' ')
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')
                          );
                        } else {
                          Swal.fire({
                            icon: "error",
                            title: "Invalid input",
                            text: "Please enter only English characters!",
                          });
                        }
                      }}
                    />
                  ) : (
                    <h6>{adminname || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>DOB </div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  ) : (
                    <h6>{date && FormatDate(date) || "N/A"}</h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Gender </div>
                  {showmykycinput ? (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      margin="dense"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem disabled value="">
                        Select a gender
                      </MenuItem>
                      {genderType.map((e) => (
                        <MenuItem value={e.value}>{e.gendername}</MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <h6>{gender || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Designation</div>
                  {showmykycinput ? (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      margin="dense"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    >
                      <MenuItem disabled value="">
                        Select a designation
                      </MenuItem>
                      {DesignationType.map((e) => (
                        <MenuItem value={e}>{e}</MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <h6>{designation || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Referrer</div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={referrer}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                    
                        // Regular expression to check if the input contains only English characters
                        const isEnglish = /^[a-zA-Z\s]*$/.test(inputValue);
                    
                        // If the input contains only English characters, update the state
                        if (isEnglish) {
                          setReferrer(
                            inputValue
                          );
                        } else {
                          Swal.fire({
                            icon: "error",
                            title: "Invalid input",
                            text: "Please enter only English characters!",
                          });
                        }
                      }}
                    />
                  ) : (
                    <h6>{referrer || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>LinkedIn Link</div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={linkedIn}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                    
                        // Regular expression to check if the input contains only English characters
                        const isEnglish = /^[a-zA-Z\s]*$/.test(inputValue);
                    
                        // If the input contains only English characters, update the state
                        if (isEnglish) {
                          setLinkedIn(
                            inputValue
                          );
                        } else {
                          Swal.fire({
                            icon: "error",
                            title: "Invalid input",
                            text: "Please enter only English characters!",
                          });
                        }
                      }}
                    />
                  ) : (
                    <h6>
                      { linkedIn &&
                        <a href={linkedIn} target="_blank">
                          {linkedIn}
                        </a>
                       || "N/A"}
                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Marital Status </div>
                  {showmykycinput ? (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      margin="dense"
                      value={maritalstatus}
                      onChange={(e) => setMaritalstatus(e.target.value)}
                    >
                      <MenuItem disabled value="">
                        Select a Marital Status
                      </MenuItem>
                      {maritalType.map((e) => (
                        <MenuItem value={e.value}>{e.MarrigeType}</MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <h6>{maritalstatus || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Physically challenged?</div>
                  {showmykycinput ? (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      margin="dense"
                      value={physically}
                      onChange={(e) => setPhysically(e.target.value)}
                    >
                      <MenuItem disabled value="">
                        Select a Physically challenged
                      </MenuItem>
                      {Physicalchallenge.map((e) => (
                        <MenuItem value={e.value}>{e.PhysicalType}</MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <h6>{physically ? "Yes" : "No"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Mobile Number</div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      value={clgmobile}
                      inputProps={{ minLength: 10, maxLength: 10 }}
                      onChange={(e) =>
                        setClgMobile(e.target.value.replace(/\D/g, ""))
                      }
                      helperText={error ? "Incorrect Entry" : ""}
                      error={error ? true : false}
                    />
                  ) : (
                    <h6>{clgmobile || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Email address</div>
                  {showmykycinput ? (
                    <TextField
                      disabled
                      placeholder={email}
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                    />
                  ) : (
                    <h6>{email || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Country</div>
                  {showmykycinput ? (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      margin="dense"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value), setState(""), setCity("");
                      }}
                    >
                      <MenuItem disabled value="">
                        Select a country
                      </MenuItem>
                      {Object.keys(IndianStates).map((country, i) => (
                        <MenuItem key={i} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <h6>{country || "N/A"}</h6>
                  )}{" "}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>State</div>
                  {showmykycinput ? (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      margin="dense"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <MenuItem disabled value="">
                        Select a state
                      </MenuItem>
                      {country != "" &&
                        Object.keys(IndianStates[country]).map((state, i) => (
                          <MenuItem key={i} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                    </TextField>
                  ) : (
                    <h6>{state || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>City</div>
                  {showmykycinput ? (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      margin="dense"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <MenuItem disabled value="">
                        Select a city
                      </MenuItem>
                      {state != "" &&
                        IndianStates[country][state].map((city, i) => (
                          <MenuItem key={i} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                    </TextField>
                  ) : (
                    <h6>{city || "N/A"}</h6>
                  )}
                </div>
              </div>
            </div>
          </div>

          {showmykycinput == true && (
            <CTA
              title="Save"
              color="white"
              fontWeight="bold"
              onClick={handleSubmit}
            />
          )}
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner variant="outlined" />
        </div>
      )}
    </>
  );
};

export default MyKyc;
