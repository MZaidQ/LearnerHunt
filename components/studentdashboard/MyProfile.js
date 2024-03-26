import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import styles from "/styles/studentProfile.module.css";
import { genderType } from "@/components/Comps/type";
import { maritalType } from "@/components/Comps/type";
import { Physicalchallenge } from "@/components/Comps/type";
import FormatDate from "/components/Comps/FormatDate";
import Swal from "sweetalert2";
import CTA from "/components/Comps/CTA";
import { Spinner } from "react-bootstrap";
import { IndianStates } from "/components/Comps/StatesIndia";

import { TextField, MenuItem } from "@mui/material";
var oldData = []
const MyProfile = () => {
  const [studentProfile, setStudentProfile] = useState([]);
  const [showprofileinput, setShowProfileinput] = useState(false);
  const [showcontactinput, setShowContactinput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);


  // Basic Details
  const [fullname, setFullname] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [maritalstatus, setMaritalstatus] = useState("");
  const [physically, setPhysically] = useState("");

  // contact Details
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  
  const studentDataApi = () => {
    setIsLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/my-profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userid")}`,
      },
    })
      .then(async (response) => {
        var res = await response.json();
        // console.log(res.data);
        setStudentProfile(res.data);
        oldData = res.data
        setFullname(res.data.basic_details.fullname)
        setDate(res.data.basic_details.dob)
        setGender(res.data.basic_details.gender)
        setMaritalstatus(res.data.basic_details.merital_status)
        setPhysically(res.data.basic_details.disablity)

        setMobile(res.data.contact_details.mobile)
        setCountry(res.data.contact_details.country)
        setState(res.data.contact_details.state)
        setCity(res.data.contact_details.city)
        setEmail(res.data.contact_details.email)
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
    if(showcontactinput || showprofileinput){
      if (mobile.length !== 10 || /\s/.test(mobile)) {
        // Display an error message or take the appropriate action
        setError(true)
      } else {
        // Your form submission logic
        setError(false)
        setIsLoading(true);
      const fd = new FormData();
      fd.append(
        "name",
        fullname 
      );
      fd.append(
        "dob",
        date 
      );
      fd.append(
        "gender",
        gender 
      );
      fd.append(
        "merital_status",
        maritalstatus 
      );
      fd.append(
        "disablity",
        physically 
      );
      fd.append(
        "mobile",
        mobile 
      );
      fd.append(
        "city",
        city 
      );
      fd.append(
        "state",
        state 
      );
      fd.append(
        "country",
        country
      );
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/student/my-profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userid")}`,
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
            setShowProfileinput(false);
            setShowContactinput(false);
            studentDataApi();
            // After the user clicks 'Ok' on the success message
            // if (typeof props.onSuccess === 'function') {
            //   props.onSuccess();
            // }
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

   const handleBasicClose =()=>{
    // console.log(oldData)
    setFullname(oldData.basic_details.fullname)
        setDate(oldData.basic_details.dob)
        setGender(oldData.basic_details.gender)
        setMaritalstatus(oldData.basic_details.merital_status)
        setPhysically(oldData.basic_details.disablity)
    setShowProfileinput(false)
   }

   const handleContactClose =()=>{
    // console.log(oldData)
    setMobile(oldData.contact_details.mobile)
    setCountry(oldData.contact_details.country)
    setState(oldData.contact_details.state)
    setCity(oldData.contact_details.city)
    setEmail(oldData.contact_details.email)
    setShowContactinput(false)
   }
  return (
    <>
      {!isLoading ? (
        <>
          <div className={styles["basic-details"]}>
            <div className={styles["basic"]}>
              <h3>Basic Details</h3>
              {showprofileinput ? (
                <div style={{ display: "flex" }}>
                  <p onClick={handleBasicClose}>
                    <CloseIcon color="error" fontSize="large" />
                  </p>
                </div>
              ) : (
                <p onClick={() => setShowProfileinput(true)}>
                  <EditIcon color="info" fontSize="large" />
                </p>
              )}
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Full Name </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder={
                        studentProfile.basic_details.fullname
                      }
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1))}
                    />
                  ) : (
                    <h6>
                      {fullname || "N/A"}
                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>DOB </div>
                  {showprofileinput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  ) : (
                    <h6>
                      {FormatDate(date) || "N/A"}
                    </h6>
                  )}
                </div>
              </div>

              {/* <div className='col-md-6 col-lg-4'>
       <div className={styles["box"]}>
       <div>Social Category </div>
         <h6>N/A</h6>
       </div>
       </div> */}
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Gender </div>
                  {showprofileinput ? (
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
                    <h6>
                      {gender || "N/A"}
                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Marital Status </div>
                  {showprofileinput ? (
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
                    <h6>
                      {maritalstatus || "N/A"}
                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Physically challenged?</div>
                  {showprofileinput ? (
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
                    <h6>
                      {physically
                        ? "Yes"
                        : "No"}
                    </h6>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles["basic-details"]}>
            <div className={styles["basic"]}>
              <h3>Contact Details</h3>
              {showcontactinput ? (
                <div style={{ display: "flex" }}>
                  {/* <p onClick={handleSubmit}><CheckIcon color='success' fontSize="large"/></p> */}

                  <p onClick={handleContactClose}>
                    <CloseIcon color="error" fontSize="large" />
                  </p>
                </div>
              ) : (
                <p onClick={() => setShowContactinput(true)}>
                  <EditIcon color="info" fontSize="large" />
                </p>
              )}
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Mobile Number</div>
                  {showcontactinput ? (
                    <TextField
                      placeholder={
                        studentProfile.contact_details.mobile
                      }
                      fullWidth
                      size="small"
                      margin="dense"
                      value={mobile}
                      inputProps={{ minLength: 10, maxLength: 10 }}
                      helperText={error ?"Incorrect Entry" :""}
                      error={error ?true :false}

                      onChange={(e) =>
                        setMobile(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  ) : (
                    <h6>
                      {mobile || "N/A"}
                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Email address</div>
                  {showcontactinput ? (
                    <TextField
                      disabled
                      placeholder={
                        studentProfile.contact_details.email
                      }
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                    />
                  ) : (
                    <h6>
                                       {email || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Country</div>
                  {showcontactinput ? (
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
                    <h6>
                                          {country || "N/A"}

                    </h6>
                  )}{" "}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>State</div>
                  {showcontactinput ? (
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
                    <h6>
                                          {state || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>City</div>
                  {showcontactinput ? (
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
                    <h6>
                                         {city || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
            </div>
          </div>

{(showprofileinput == true || showcontactinput == true) &&
  <CTA
            title="Save"
            color="white"
            fontWeight="bold"
            onClick={handleSubmit}
          />
}
          
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner variant="outlined" />
        </div>
      )}
      {/* 
      <Modal
        size="xl"
        show={showprofilemodal}
        onHide={() => setShowProfilemodal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <h3> Education Details</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <div className={styles["model-scroll"]}>
                <div className={styles["basic"]}>
                  <h6>Class X </h6>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <Button variant="secondary" type="submit">
                  Submit{" "}
                </Button>
              </div>
            </Form>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default MyProfile;
