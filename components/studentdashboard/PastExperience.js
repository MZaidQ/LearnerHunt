import React, { useState, useEffect } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import styles from "/styles/studentProfile.module.css";
import { genderType } from "@/components/Comps/type";
import { collegeType } from "@/components/Comps/type";
import FormatDate from "/components/Comps/FormatDate";
import Swal from "sweetalert2";
import CTA from "/components/Comps/CTA";
import { Spinner } from "react-bootstrap";

import { TextField, MenuItem } from "@mui/material";
var oldData = [];
const PastExperience = () => {
  const [studentProfile, setStudentProfile] = useState([]);
  const [showprofileinput, setShowProfileinput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [field1, setField1] = useState("");
  const [location1, setLocation1] = useState("");
  const [duration1, setDuration1] = useState("");
  const [annual, setAnnual] = useState("");
  const [field2, setField2] = useState("");
  const [location2, setLocation2] = useState("");
  const [duration2, setDuration2] = useState("");
  const [annual2, setAnnual2] = useState("");
  const [field3, setField3] = useState("");
  const [location3, setLocation3] = useState("");
  const [duration3, setDuration3] = useState("");
  const [annual3, setAnnual3] = useState("");


//   const studentDataApi = () => {
//     setIsLoading(true);
//     fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/my-profile", {
//       headers: {
//         Authorization: "Bearer " + ${`localStorage.getItem("userid")`},
//       },
//     })
//       .then(async (response) => {
//         var res = await response.json();
//         console.log(res.data);
//         setStudentProfile(res.data);
//         oldData = res.data;

//         setField1(res.data.basic_details.ratings);
//         setLocation1(res.data.basic_details.ratings);
//         setDuration1(res.data.basic_details.ratings);
//         setAnnual(res.data.basic_details.ratings);
//         setField2(res.data.basic_details.ratings);
//         setLocation2(res.data.basic_details.ratings);
//         setDuration2(res.data.basic_details.ratings);
//         setAnnual2(res.data.basic_details.ratings);
//         setField3(res.data.basic_details.ratings);
//         setLocation3(res.data.basic_details.ratings);
//         setDuration3(res.data.basic_details.ratings);
//         setAnnual3(res.data.basic_details.ratings);

//         setIsLoading(false);
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

//   useEffect(() => {
//     studentDataApi();
//   }, []);
//   const handleSubmit = () => {
//     console.log(showprofileinput);
//     if (showprofileinput) {
//       setError(false);
//       setIsLoading(true);
//       const fd = new FormData();
//       fd.append("field1", field1);
//       fd.append("location1", location1);
//       fd.append("duration1", duration1);
//       fd.append("annual", annual);
//       fd.append("field2", field2);
//       fd.append("location2", location2);
//       fd.append("duration2", duration2);
//       fd.append("annual2", annual2);
//       fd.append("field3", field3);
//       fd.append("location3", location3);
//       fd.append("duration3", duration3);
//       fd.append("annual3", annual3);
//       console.log("data", fd);
//       setShowProfileinput(false);
//       setIsLoading(false);

//       Swal.fire({
//         title: "Success",
//         text: ${res.message},
//         icon: "success",
//         confirmButtonText: "Ok",
//       });
//     }
//   };

  const handleBasicClose = () => {
    // console.log(oldData)

    setField1(oldData.basic_details.ratings);
    setLocation1(oldData.basic_details.ratings);
    setDuration1(oldData.basic_details.ratings);
    setAnnual(oldData.basic_details.ratings);
    setField2(oldData.basic_details.ratings);
    setLocation2(oldData.basic_details.ratings);
    setDuration2(oldData.basic_details.ratings);
    setAnnual2(oldData.basic_details.ratings);
    setField3(oldData.basic_details.ratings);
    setLocation3(oldData.basic_details.ratings);
    setDuration3(oldData.basic_details.ratings);
    setAnnual3(oldData.basic_details.ratings);

    // setPhysically(oldData.basic_details.disablity)
    setShowProfileinput(false);
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className={styles["basic-details"]}>
            <div className={styles["basic"]}>
              <h3>Past Experience (For Working Professional) </h3>
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
            <div className={styles["basic"]}>
            <h6>Company Name </h6>
          </div>

            <div className="row">
                          <div className="row">
                          <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Field </div>
                  {showprofileinput ? (
                    <TextField
                      fullWidth
                      placeholder="IT"
                      size="small"
                      type="text"
                      margin="dense"
                      value={field1}
                      onChange={(e) => setField1(e.target.value)}
                    />
                  ) : (
                    <h6>{field1 || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Location </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder="Gurugram(Haryana)"
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={location1}
                      onChange={(e) => setLocation1(e.target.value)}

                    />
                  ) : (
                    <h6>{location1 || "N/A"}</h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>
                     Duration Of Working{" "}
                  </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder="2012-2018"
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={duration1}
                    />
                  ) : (
                    <h6>{duration1 || "N/A"}</h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Annual CTC </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder="26 lpa"
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={annual}
                      onChange={(e) => setAnnual(e.target.value)}
                    />
                  ) : (
                    <h6>{annual || "N/A"}</h6>
                  )}
                </div>
              </div>
          </div>
          <hr />

          <div className={styles["basic"]}>
            <h6>Company Name 2 </h6>
          </div>

          <div className="row">
          <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Field </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder="IT"
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={field2}
                      onChange={(e) => setField2(e.target.value)}
                    />
                  ) : (
                    <h6>{field2 || "N/A"}</h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>
                    Location{" "}
                  </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder="Gurugram(Haryana)"
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={location2}
                      onChange={(e) => setLocation2(e.target.value)}
                    />
                  ) : (
                    <h6>{location2 || "N/A"}</h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Duration Of Working </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder="2012-2018 "
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={duration2}
                      onChange={(e) => setDuration2(e.target.value)}
                    />
                  ) : (
                    <h6>{duration2 || "N/A"}</h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Annual CTC </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder="26 lpa"
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={annual2}
                      onChange={(e) => setAnnual2(e.target.value)}
                    />
                  ) : (
                    <h6>{annual2 || "N/A"}</h6>
                  )}
                </div>
              </div>

          </div>
          <hr />
           
          <div className={styles["basic"]}>
            <h6>Company Name 3 </h6>
          </div>

          <div className="row">
          <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Field </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder="IT"
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={field3}
                      onChange={(e) => setField3(e.target.value)}
                    />
                  ) : (
                    <h6>{field3 || "N/A"}</h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>
                    Location{" "}
                  </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder="Gurugram(Haryana)"
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={location3}
                      onChange={(e) => setLocation3(e.target.value)}
                    />
                  ) : (
                    <h6>{location3 || "N/A"}</h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Duration Of Working </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder="2012-2018 "
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={duration3}
                      onChange={(e) => setDuration3(e.target.value)}
                    />
                  ) : (
                    <h6>{duration3 || "N/A"}</h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Annual CTC </div>
                  {showprofileinput ? (
                    <TextField
                      placeholder="26 lpa"
                      fullWidth
                      size="small"
                      margin="dense"
                      type="text"
                      value={annual3}
                      onChange={(e) => setAnnual3(e.target.value)}
                    />
                  ) : (
                    <h6>{annual3 || "N/A"}</h6>
                  )}
                </div>
              </div>

          </div>
          <hr />

            </div>
          </div>       
              <div className={styles["basic-details"]}>
            <div className={styles["basic"]}>
              <h3>Suggested Courses </h3>
            </div>



          </div>


{(showprofileinput == true) &&
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
      </>
  );
};

export default PastExperience;