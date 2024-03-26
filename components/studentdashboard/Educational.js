import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import styles from "/styles/studentProfile.module.css";
import CTA from "/components/Comps/CTA";
import { Spinner } from "react-bootstrap";
import { IndianStates } from "/components/Comps/StatesIndia";
import { classX } from "@/components/Comps/type";
import { MarksType } from "@/components/Comps/type";
import { PassingYear } from "@/components/Comps/type";
import { StreamXII } from "@/components/Comps/type";




import Swal from "sweetalert2";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

var oldData = []

const HomeComponent = () => {
  // const [educationDetailsShow, setEducationDetailsShow] = useState(false);
  // const [preferencesShow, setPreferencesShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [boardx, setBoardx] = useState(null);
  const [school, setSchool] = useState(null);
  const [year, setYear] = useState(null);
  const [marks, setMarks] = useState(null);
  const [percentage, setPercentage] = useState(null);

  const [boardxii, setBoardxii] = useState(null);
  const [schoolxii, setSchoolxii] = useState(null);
  const [yearxii, setYearxii] = useState(null);
  const [streamxii, setStreamxii] = useState(null);
  const [marksxii, setMarksxii] = useState(null);

  const [percentagexii, setPercentagexii] = useState(null);

  const [universityg, setUniversityg] = useState(null);
  const [collegeg, setCollegeg] = useState(null);
  const [yearg, setYearg] = useState(null);
  const [degreeg, setDegreeg] = useState(null);
  const [specialisationg, setSpecialisationg] = useState(null);
  const [percentageg, setPercentageg] = useState(null);

  // const [level, setLevel] = useState("");
  // const [specialisation, setSpecialisation] = useState("");
  // const [location, setLocation] = useState("");
  // const [collegee, setCollegee] = useState("");
  // const [fee, setFee] = useState("");
  // const [abroad, setAbroad] = useState("");
  // const [loan, setLoan] = useState("");

  const [showEducationalInput, setshowEducationalInput] = useState(false);

  

  // const [preferencsShow, setPreferencsShow] = useState(false);

  // const handleIconClick = () => {
  //     setPreferencsShow(!preferencsShow);
  //   };

  const studentDataApi = () => {
    setIsLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/education-details", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userid")}`,
      },
    })
      .then(async (response) => {
        var res = await response.json();
        // console.log(res.data);
        oldData = res.data
        // class x
        setBoardx(res.data.class_X.board)
        setSchool(res.data.class_X.school)
        setYear(res.data.class_X.passing_year)
        setMarks(res.data.class_X.marks_type)
        setPercentage(res.data.class_X.percentage)
    // class xii
    setBoardxii(res.data.class_XII.board)
    setSchoolxii(res.data.class_XII.school)
    setYearxii(res.data.class_XII.passing_year)
    setMarksxii(res.data.class_XII.marks_type)
    setPercentagexii(res.data.class_XII.percentage)
    setStreamxii(res.data.class_XII.stream)
    // graduation
    setUniversityg(res.data.graduation.University)
    setCollegeg(res.data.graduation.college)
    setYearg(res.data.graduation.passing_year)
    setDegreeg(res.data.graduation.degree)
    setSpecialisationg(res.data.graduation.specialization)
    setPercentageg(res.data.graduation.percentage)
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
    setIsLoading(true);
    const class_X =  {
      "board":  boardx,
      "school":school,
      "passing_year": year,
      "marks_type":marks,
      "percentage":  percentage
    }
    const class_XII =  {
      "board":boardxii ,
      "school":  schoolxii ,
      "passing_year": yearxii ,
      "stream":  streamxii , 
      "percentage":  percentagexii , 
      "marks_type":marksxii ,
    }
    const Graduation =  {
      "University": universityg ,
      "college": collegeg,
      "passing_year": yearg ,
      "degree": degreeg,
      "specialization":specialisationg ,
      "percentage": percentageg  
    }
    const fd = new FormData();
    fd.append("class_X",JSON.stringify(class_X))
    fd.append("class_XII",JSON.stringify(class_XII))
    fd.append("graduation",JSON.stringify(Graduation))

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/student/education-details`, {
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
          setshowEducationalInput(false);
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
  };

  const handleCloseEducation = () =>{
     // class x
     setBoardx(oldData.class_X.board)
     setSchool(oldData.class_X.school)
     setYear(oldData.class_X.passing_year)
     setMarks(oldData.class_X.marks_type)
     setPercentage(oldData.class_X.percentage)
 // class xii
 setBoardxii(oldData.class_XII.board)
 setSchoolxii(oldData.class_XII.school)
 setYearxii(oldData.class_XII.passing_year)
 setMarksxii(oldData.class_XII.marks_type)
 setPercentagexii(oldData.class_XII.percentage)
 setStreamxii(oldData.class_XII.stream)
 // graduation
 setUniversityg(oldData.graduation.University)
 setCollegeg(oldData.graduation.college)
 setYearg(oldData.graduation.passing_year)
 setDegreeg(oldData.graduation.degree)
 setSpecialisationg(oldData.graduation.specialization)
 setPercentageg(oldData.graduation.percentage)

 setshowEducationalInput(false);

  }

  return (
    <>
      {" "}
      {!isLoading ? (
        <>
          {/* <Modal
          size="xl"
          show={showSuccess}
          onHide={() => setShowSuccess(false)}
          aria-labelledby="example-modal-sizes-title-sm"

        >
          <Alert severity="success" onClose={() => setShowSuccess(false)}>
            <AlertTitle>Success</AlertTitle>
          </Alert>
        </Modal> */}
          <div className={styles["basic-details"]}>
            <div className={styles["basic"]}>
              <h3> Education Details</h3>
              <p>
                {showEducationalInput ? (
                  <CloseIcon
                    onClick={handleCloseEducation}
                    color="error"
                    fontSize="large"
                  />
                ) : (
                  <EditIcon
                  onClick={() => setshowEducationalInput(true)}
                    color="info"
                    fontSize="large"
                  />
                )}
              </p>
            </div>
            <div className={styles["basic"]}>
              <h6>Class X </h6>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Board</div>
                  {showEducationalInput ? (
                    <TextField
                    select
                    fullWidth
                    size="small"
                    margin="dense"
                    value={boardx}
                    onChange={(e) => setBoardx(e.target.value)
                    }
                  >
                    <MenuItem disabled value="">
                      Select a Board
                    </MenuItem>
                    {classX.map((e) => (
                      <MenuItem value={e}>{e}</MenuItem>
                    ))}
                  </TextField>
                  ) : (
                    <h6>
                      {boardx || "N/A"}
                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>School </div>
                  {showEducationalInput ? (
                    
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      required
                      type="text"
                      value={school}
                      onChange={(e) => 
                          setSchool(e.target.value)
                      }
                    />
                  ) : (
                    <h6>
                      {school || "N/A"}
                    </h6>
                  )}{" "}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Passing Year </div>
                  {showEducationalInput ? (
                             <TextField
                             select
                             fullWidth
                             size="small"
                             margin="dense"
                             value={year}

                             onChange={(e) => setYear(e.target.value)
                             }
                           >
                             <MenuItem disabled value="">
                               Select a Year
                             </MenuItem>
                             {PassingYear.map((e) => (
                               <MenuItem value={e}>{e}</MenuItem>
                             ))}
                           </TextField>

                
                  ) : (
                    <h6>
                      {year || "N/A"}
                    </h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Marks type </div>
                  {showEducationalInput ? (
                     <TextField
                     select
                     fullWidth
                     size="small"
                     margin="dense"
                     value={marks}
                     onChange={(e) => setMarks(e.target.value)
                     }
                   >
                     <MenuItem disabled value="">
                       Select a MarksType
                     </MenuItem>
                     {MarksType.map((e) => (
                       <MenuItem value={e}>{e}</MenuItem>
                     ))}
                   </TextField>
                   
                  ) : (
                    <h6>
                                         {marks || "N/A"}
                    </h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Percentage/CGPA </div>
                  {showEducationalInput ? (
                    
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      required
                      type="text"
                      value={percentage}
                      onChange={(e) => {
                          setPercentage(e.target.value);
                      }}
                    />
                  ) : (
                    <h6>
                    {percentage || "N/A"}
                    </h6>
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div className={styles["basic"]}>
              <h6>Class XII </h6>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Board </div>
                  {showEducationalInput ? (
                    <TextField
                    select
                    fullWidth
                    size="small"
                    margin="dense"
                    value={boardxii}
                    onChange={(e) => setBoardxii(e.target.value)
                    }
                  >
                    <MenuItem disabled value="">
                      Select a Board
                    </MenuItem>
                    {classX.map((e) => (
                      <MenuItem value={e}>{e}</MenuItem>
                    ))}
                  </TextField>
                  ) : (
                    <h6>
                                        {boardxii || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>School </div>
                  {showEducationalInput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      required
                      type="text"
                      value={schoolxii}
                      onChange={(e) => {
                        const re = /^[A-Za-z]+$/;
                        if (e.target.value === "" || re.test(e.target.value))
                          setSchoolxii(e.target.value);
                      }}
                    />
                  ) : (
                    <h6>
                                      {schoolxii || "N/A"}

                    </h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Passing Year </div>
                  {showEducationalInput ? (
                      <TextField
                      select
                      fullWidth
                      size="small"
                      margin="dense"
                      value={yearxii}

                      onChange={(e) => setYearxii(e.target.value)
                      }
                    >
                      <MenuItem disabled value="">
                        Select a Year
                      </MenuItem>
                      {PassingYear.map((e) => (
                        <MenuItem value={e}>{e}</MenuItem>
                      ))}
                    </TextField>
                  
                  ) : (
                    <h6>
                                      {yearxii || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Marks type </div>
                  {showEducationalInput ? (
                     <TextField
                     select
                     fullWidth
                     size="small"
                     margin="dense"
                     value={marksxii}
                     onChange={(e) => setMarksxii(e.target.value)
                     }
                   >
                     <MenuItem disabled value="">
                       Select a MarksType
                     </MenuItem>
                     {MarksType.map((e) => (
                       <MenuItem value={e}>{e}</MenuItem>
                     ))}
                   </TextField>
                  
                  ) : (
                    <h6>
                                        {marksxii || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Stream </div>
                  {showEducationalInput ? (
                   <TextField
                   select
                   fullWidth
                   size="small"
                   margin="dense"
                   value={streamxii}
                   onChange={(e) => setStreamxii(e.target.value)
                   }
                 >
                   <MenuItem disabled value="">
                     Select a Stream
                   </MenuItem>
                   {StreamXII.map((e) => (
                     <MenuItem value={e}>{e}</MenuItem>
                   ))}
                 </TextField>
                   
                  ) : (
                    <h6>
                                         {streamxii || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Percentage/CGPA </div>
                  {showEducationalInput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      required
                      type="text"
                      value={percentagexii}
                      onChange={(e) => {
                          setPercentagexii(e.target.value);
                      }}
                    />
                  ) : (
                    <h6>
                                     {percentagexii || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div className={styles["basic"]}>
              <h6>Graduation </h6>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>University </div>
                  {showEducationalInput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      required
                      type="text"
                      value={universityg}
                      onChange={(e) => {
                        const re = /^[A-Za-z]+$/;
                        if (e.target.value === "" || re.test(e.target.value))
                          setUniversityg(e.target.value);
                      }}
                    />
                  ) : (
                    <h6>
                                                      {universityg || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>College </div>
                  {showEducationalInput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      required
                      type="text"
                      value={collegeg}
                      onChange={(e) => {
                        const re = /^[A-Za-z]+$/;
                        if (e.target.value === "" || re.test(e.target.value))
                          setCollegeg(e.target.value);
                      }}
                    />
                  ) : (
                    <h6>
                                                        {collegeg || "N/A"}

                    </h6>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Passing Year </div>
                  {showEducationalInput ? (
                    <TextField
                    select
                    fullWidth
                    size="small"
                    margin="dense"
                    value={yearg}

                    onChange={(e) => setYearg(e.target.value)
                    }
                  >
                    <MenuItem disabled value="">
                      Select a Year
                    </MenuItem>
                    {PassingYear.map((e) => (
                      <MenuItem value={e}>{e}</MenuItem>
                    ))}
                  </TextField>
                    
                  ) : (
                    <h6>
                                                       {yearg || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Degree </div>
                  {showEducationalInput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      required
                      type="text"
                      value={degreeg}
                      onChange={(e) => {
                        const re = /^[A-Za-z]+$/;
                        if (e.target.value === "" || re.test(e.target.value))
                          setDegreeg(e.target.value);
                      }}
                    />
                  ) : (
                    <h6>
                                                         {degreeg || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Specialisation </div>
                  {showEducationalInput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      required
                      type="text"
                      value={specialisationg}
                      onChange={(e) => {
                        const re = /^[A-Za-z]+$/;
                        if (e.target.value === "" || re.test(e.target.value))
                          setSpecialisationg(e.target.value);
                      }}
                    />
                  ) : (
                    <h6>
                                                           {specialisationg || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className={styles["box"]}>
                  <div className={styles.heading}>Percentage/CGPA </div>
                  {showEducationalInput ? (
                    <TextField
                      fullWidth
                      size="small"
                      margin="dense"
                      required
                      type="text"
                      value={percentageg}
                      onChange={(e) => {
                          setPercentageg(e.target.value);
                      }}
                    />
                  ) : (
                    <h6>
                                                       {percentageg || "N/A"}

                    </h6>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles["basic-details"]}>
          <div className={styles["basic"]}>
            <h3>Preferences </h3>
            <p>
          {preferencsShow ?  
            <div style={{display:'flex',gap:'30px'}}>  
                  
                <CheckIcon />  
                 <CloseIcon
                   onClick={handleIconClick}
                   className="me-2"
                  style={{ cursor: "pointer",color:'red' }}
          />
              
        </div>
 : (
          <EditIcon
            onClick={handleIconClick}
            className="me-2"
            style={{ cursor: "pointer",color:'blue'}}
          />
        )}
        
            </p>
          
          



             
               </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>

                <div className={styles.heading}>Stream </div>
                {preferencsShow ? (
        <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <TextField
              fullWidth
              size="small"
              margin="dense"
              placeholder="Art"

              value={customMenuItem}
              onClick={(event) => handleTextFieldClick(event, popupState)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  popupState.close();
                }
              }}
            />
            <Menu
              {...bindMenu(popupState)}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleCustomItemClick(popupState, 'Art')}>
                Art
              </MenuItem>
              <MenuItem onClick={() => handleCustomItemClick(popupState, ' Science')}>
                 Science 
              </MenuItem>
              <MenuItem onClick={() => handleCustomItemClick(popupState, 'Commerce')}>
                Commerce
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>

) : (
        <h6>Design</h6>
      )}

              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Level </div>
                {preferencsShow ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="PG"
        value={level}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setLevel(e.target.value);
        }}
      />
) : (
        <h6>PG</h6>
      )}
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Specialisation </div>
                {preferencsShow ? (

                <TextField fullWidth size='small' margin="dense" 
        required
        type="text"
        placeholder="NO Preference"
        value={specialisation}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setSpecialisation(e.target.value);
        }}
      />
) : (
        <h6>NO Preference</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading} >Location </div>
                {preferencsShow ? (

<TextField fullWidth size='small' margin="dense" 
required
type="text"
placeholder="N/A"
value={location}
onChange={(e) => {
const re = /^[A-Za-z]+$/;
if (e.target.value === "" || re.test(e.target.value))
setLocation(e.target.value);
}}
/>
) : (
<h6>N/A</h6>
)}
</div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>College Type </div>
                {preferencsShow ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="N/A"
        value={collegee}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
          setCollegee(e.target.value);
        }}
      />
) : (
        <h6>N/A</h6>
      )}

              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Fee-Range </div>
                {preferencsShow ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="3-4LPA"
        value={fee}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value))
            setFee(e.target.value);
        }}
      />
) : (
        <h6>3-4LPA</h6>
      )}
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Intrested in Study Abroad </div>
                {preferencsShow ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="No"
        value={abroad}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
          setAbroad(e.target.value);
        }}
      />
) : (
        <h6>No</h6>
      )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className={styles["box"]}>
                <div className={styles.heading}>Need A Loan? </div>
                {preferencsShow ? (
        <TextField fullWidth size='small' margin="dense" 
        
        required
        type="text"
        placeholder="Yes"
        value={loan}
        onChange={(e) => {
          const re = /^[A-Za-z]+$/;
          if (e.target.value === "" || re.test(e.target.value))
          setLoan(e.target.value);
        }}
      />
) : (
        <h6>Yes</h6>
      )}
              </div>
            </div>
          </div>
        </div> */}
          {showEducationalInput && (
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

export default HomeComponent;
