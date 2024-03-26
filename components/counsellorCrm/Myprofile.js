import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import styles from "/styles/studentProfile.module.css";
import { Physicalchallenge } from "@/components/Comps/type";
import FormatDate from "/components/Comps/FormatDate";
import Swal from "sweetalert2";
import CTA from "/components/Comps/CTA";
import { genderType } from "@/components/Comps/type";
import { maritalType } from "@/components/Comps/type";
import { Spinner } from "react-bootstrap";
import { IndianStates } from "/components/Comps/StatesIndia";
import { TextField, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
var oldData = [];
const Myprofile = () => {
  const [showmykycinput, setshowmykycinput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // kyc Details

  const [name, setname] = useState("");
  const [date, setDate] = useState("");
  const [physically, setPhysically] = useState("");
  const [gender, setGender] = useState("");
  const [maritalstatus, setMaritalstatus] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [Experience, setExperience] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const studentDataApi = () => {
    setIsLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/counsellor/my-profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("cst")}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          var res = await response.json();
          console.log(res.data);
          oldData = res.data;
          setname(res.data.name);
        setMaritalstatus(res.data.merital_status);
        setGender(res.data.gender);
        setDate(res.data.createdAt.split('T')[0]);
          setPhysically(res.data.physically_challenged);
          setMobile(res.data.mobile);
          if (res.data.country) {
            setCountry(res.data.country);
            setState(res.data.state);
            setCity(res.data.city);
          }
          setEmail(res.data.email);
        setLinkedIn(res.data.linked_in_link);
        setExperience(res.data.experience_in_year);
          setVerified(res.data.verified);
        } else {
          var res = await response.json();

          setError(res.error);
          setIsLoading(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  };
  // console.log(studentDataApi())
  useEffect(() => {
    studentDataApi();
  }, []);
  const handleSubmit = () => {
    // console.log("hello");
    if (showmykycinput) {
      if (mobile.length !== 10 || /\s/.test(mobile)) {
        // Display an error message or take the appropriate action
        setError(true);
      } else {
        // Your form submission logic
        setError(false);
        setIsLoading(true);
        const fd = new FormData();
        fd.append("name",name);
        fd.append("mobile", mobile);
        fd.append("disablity", physically);
        fd.append("state", state);
        fd.append("city", city);
        fd.append("Experience", Experience);
        fd.append("country", country);
        fd.append("gender", gender);
        fd.append("merital_status", maritalstatus);
        fd.append("linkedin_link", linkedIn);
        fd.append("dob", date);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/counsellor/my-profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("cst")}`,
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
    console.log(oldData);
    setname(oldData.name);
    setDate(oldData.createdAt.split('T')[0]);
    setGender(oldData.gender);
    setPhysically(oldData.physically_challenged);
    setMaritalstatus(oldData.merital_status);
    setMobile(oldData.mobile);
    if(oldData.country){
      setCity(oldData.city);
      setState(oldData.state);
    }
    setEmail(oldData.email);
    setLinkedIn(oldData.linked_in_link);
    setExperience(oldData.experience_in_year);
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
                <h3 style={{ margin: "0px 5px" }}>My Profile</h3>
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
                  <div className={styles.heading}>Name</div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      placeholder={name}
                      size="small"
                      margin="dense"
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setname(
                          e.target.value.charAt(0).toUpperCase() +
                            e.target.value.slice(1)
                        )
                      }
                    />
                  ) : (
                    <h6>{name || "N/A"}</h6>
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
                     <Select
                     sx={{ mt: 1 }}
                     fullWidth
                     size="small"
                     margin="dense"
                     value={gender}
                      onChange={(e) => setGender(e.target.value)}
                     displayEmpty
                   >
                     <MenuItem value="" disabled>
                        Select a gender
                      </MenuItem>
                      {genderType.map((e,i) => (
                        <MenuItem key={i} value={e.value}>{e.gendername}</MenuItem>
                      ))}
                   </Select>
                  ) : (
                    <h6>{gender || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Marital Status </div>
                  {showmykycinput ? (
                     <Select
                     sx={{ mt: 1 }}
                     fullWidth
                     size="small"
                     margin="dense"
                     value={maritalstatus}
                     onChange={(e) => setMaritalstatus(e.target.value)}
                     displayEmpty
                   >
                       <MenuItem disabled value="">
                        Select a Marital Status
                      </MenuItem>
                      {maritalType.map((e,i) => (
                        <MenuItem key={i} value={e.value}>{e.MarrigeType}</MenuItem>
                      ))}
                   </Select>
                  
                  ) : (
                    <h6>{maritalstatus || "N/A"}</h6>
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
                  <div className={styles.heading}>Experience</div>
                  {showmykycinput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={Experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  ) : (
                    <h6>{Experience || "N/A"}</h6>
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
                      value={mobile}
                      inputProps={{ minLength: 10, maxLength: 10 }}
                      onChange={(e) =>
                        setMobile(e.target.value.replace(/\D/g, ""))
                      }
                      helperText={error ? "Incorrect Entry" : ""}
                      error={error ? true : false}
                    />
                  ) : (
                    <h6>{mobile || "N/A"}</h6>
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
                    <Select
                     sx={{ mt: 1 }}
                     fullWidth
                      size="small"
                      margin="dense"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setState("");
                        setCity("");
                      }}
                      displayEmpty
                      //  inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="" disabled>
                        Select a country
                      </MenuItem>
                      {Object.keys(IndianStates).map((country, i) => (
                        <MenuItem key={i} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <h6>{country || "N/A"}</h6>
                  )}{" "}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>State</div>
                  {showmykycinput ? (
                    <Select
                     sx={{ mt: 1 }}
                     fullWidth
                      size="small"
                      margin="dense"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      displayEmpty
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
                    </Select>
                  ) : (
                    <h6>{state || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>City</div>
                  {showmykycinput ? (
                     <Select
                     sx={{ mt: 1 }}
                     fullWidth
                     size="small"
                     margin="dense"
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     displayEmpty
                   >
                    <MenuItem disabled value="">
                        Select a city
                      </MenuItem>
                      {state &&
                        state != "" &&
                        IndianStates[country][state].map((city, i) => (
                          <MenuItem key={i} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                   </Select>
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

export default Myprofile;
