import React, { useState } from "react";
import Classes from "../styles/HomePageHero.module.css";
import { useRouter } from "next/router";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Slider,
} from "@mui/material";
import SearchModal from "./SearchModal";

const SelectionBtns = [
  {
    value: 0,
    label: "Test Your Eligibility",
  },
  {
    value: 1,
    label: "Free Counselling",
  },
  {
    value: 2,
    label: "Explore Colleges",
  },
];

const HomepageHeroSection = ({ data }) => {
  // console.log(data)

  const [fee, setFee] = useState(200000);
  const [activeBtn, setActiveBtn] = useState(SelectionBtns[0].value);
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");
  const [examAppears, setExamAppears] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedRanking, setSelectedRanking] = useState("");
  const [error,setError] = useState(false)
  // const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const router = useRouter();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (contact.length !== 10 || /\s/.test(contact)) {
      // Display an error message or take the appropriate action
      setError(true)
    } else {
      // Your form submission logic
      setError(false)
    }
    // console.log("working");
    if (activeBtn == "2") {
      router.push(
        `/colleges?course=${selectedCourse}&zone=${selectedLocation}&rating=${selectedRanking}&fee=${200000}`
      );
    } else if (activeBtn == "0") {
      if (contact.length !== 10 || /\s/.test(contact)) {
        // Display an error message or take the appropriate action
        console.log("Error: Contact number must be exactly 10 digits without spaces.");
      } else {
        router.push(
          `/colleges?course=${selectedCourse}&zone=${selectedLocation}&fee=${fee}&name=${fullName}&mobile=${contact}&specialization=${selectedSpecialization}&qualification=${selectedQualification}&exam=${selectedExam}`
        );
      }
    
    }
  };
  const handleSliderChange = (event, newValue) => {
    setFee(newValue);
  };
  const formatFeeLabel = (value) => {
    if (value >= 100000) {
      return `${value / 100000} Lakhs`;
    }
    return value;
  };

  const checkValue = (value) => {
    return value != undefined && value != null && value != "";
  };
  return (
    <div className={Classes["hero-section"]}>
      <div className={Classes["overlay"]}></div>
      <div className="container" style={{ zIndex: 2, position: "relative" }}>
        <div className="row">
          <div className="col-lg-7 d-none d-lg-block ">
            <div className={Classes["herosection-desc"]}>
              <h1> Learnerhunt - Your Path to Exceptional Education</h1>
              {/* <ul>
              <li>
              Forem ipsum dolor sit amet, consectetur adipiscing 
              </li>
              <li>
              Forem ipsum dolor sit amet, consectetur adipiscing 
              </li>
              <li>
              Forem ipsum dolor sit amet, consectetur adipiscing 
              </li>
              <li>
              Forem ipsum dolor sit amet, consectetur adipiscing 
              </li>
              <li>
              Forem ipsum dolor sit amet, consectetur adipiscing 
              </li>

            </ul> */}
              <p>
                Learnerhunt is a digital platform for educational career
                counselling, offering comprehensive information about top
                colleges and universities in India and abroad that provide
                undergraduate programs, postgraduate programs, MBBS, and other
                professional courses. We have over 300 business schools and
                universities registered with us. We have become a trusted source
                of detailed information to assist you in making the right
                college and career decisions. Our platform covers more than
                1,000 colleges and universities, offers 150+ courses, and
                provides the latest updates on #courses, #admissions, and
                entrance exams.
              </p>
            </div>
          </div>
          <div className="col-lg-5 mx-auto">
            {/* <div
              className={Classes["search-box"]}
              onClick={() => setIsSearchModalOpen(true)}
            >
              <div className={Classes["search-bar"]}>
          
                <span>Search colleges, exams, courses & more.</span>
              </div>
              <div className={Classes["search-btn"]}>
                {" "}
                <img src="/assets/images/search.png" alt="" />{" "}
              </div>
            </div> */}
            <div className={Classes["buttons-section"]}>
              {SelectionBtns.map((btn, i) => {
                return (
                  <button
                    key={i}
                    className={activeBtn === i ? Classes["active"] : ""}
                    onClick={() => setActiveBtn(i)}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
            <div className={Classes["hero-form"]}>
              <span className={Classes["heading"]}>
                {SelectionBtns.find((btn) => btn.value == activeBtn).label}
              </span>
              <form action="#" onSubmit={handleFormSubmit}>
                <div className="row">
                  {activeBtn == "0" ? (
                    <>
                      <div className="col-md-6">
                        <TextField
                          className="rounded-lg"
                          required
                          fullWidth
                          margin="normal"
                          label="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          size="small"
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          className={`rounded-lg `}
                          fullWidth
                          required
                          margin="normal"
                          type="text"
                          inputProps={{ minLength: 10, maxLength: 10 }}
                          label="Contact Number"
                          value={contact}
                          onChange={(e) =>
                            setContact(e.target.value.replace(/\D/g, ""))
                          }
                          error={error ?true :false}
                          helperText={error ?"Incorrect Entry" :""}
                          size="small"
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-6">
                        <FormControl
                          required
                          size="small"
                          className="rounded-lg"
                          fullWidth
                          margin="normal"
                        >
                          <InputLabel>Location</InputLabel>
                          <Select
                            value={selectedLocation}
                            label="Location"
                            onChange={(e) =>
                              setSelectedLocation(e.target.value)
                            }
                          >
                            <MenuItem value="" disabled>
                              <em>Select</em>
                            </MenuItem>
                            {checkValue(data.zones) &&
                              data.zones.map((zone, i) => {
                                return (
                                  <MenuItem key={i} value={zone.name}>
                                    {zone.name}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-md-6">
                        <FormControl
                          required
                          size="small"
                          className="rounded-lg"
                          fullWidth
                          margin="normal"
                        >
                          <InputLabel>Courses</InputLabel>
                          <Select
                            value={selectedCourse}
                            label="Courses"
                            onChange={(e) => setSelectedCourse(e.target.value)}
                          >
                            <MenuItem value="" disabled>
                              <em>Select</em>
                            </MenuItem>
                            {checkValue(data.courses) &&
                              data.courses.map((c, i) => {
                                return (
                                  <MenuItem key={i} value={c.course}>
                                    {c.course}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </div>
                      {selectedCourse != "" && (
                        <>
                          <div className="col-md-6">
                            <FormControl
                              size="small"
                              className="rounded-lg"
                              fullWidth
                              margin="normal"
                            >
                              <InputLabel>Specialization</InputLabel>
                              <Select
                                value={selectedSpecialization}
                                label="Specialization"
                                onChange={(e) =>
                                  setSelectedSpecialization(e.target.value)
                                }
                              >
                                <MenuItem value="" disabled>
                                  <em>Select</em>
                                </MenuItem>
                                {checkValue(data.courses) &&
                                  data.courses
                                    .find((c) => c.course == selectedCourse)
                                    .specialization.map((s, i) => {
                                      return (
                                        <MenuItem key={i} value={s}>
                                          {s}
                                        </MenuItem>
                                      );
                                    })}
                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-md-6">
                            <FormControl
                              required
                              size="small"
                              className="rounded-lg"
                              fullWidth
                              margin="normal"
                            >
                              <InputLabel>Qualification</InputLabel>
                              <Select
                                value={selectedQualification}
                                label="Qualification"
                                onChange={(e) =>
                                  setSelectedQualification(e.target.value)
                                }
                              >
                                <MenuItem value="" disabled>
                                  <em>Select</em>
                                </MenuItem>
                                {checkValue(data.courses) &&
                                  data.courses
                                    .find((c) => c.course == selectedCourse)
                                    .qualification.map((q, i) => {
                                      return (
                                        <MenuItem key={i} value={q}>
                                          {q}
                                        </MenuItem>
                                      );
                                    })}
                              </Select>
                            </FormControl>
                          </div>
                          {selectedQualification != "" && (
                            <div className="col-md-6">
                              <FormControl
                                size="small"
                                className="rounded-lg"
                                fullWidth
                                margin="normal"
                              >
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                  Entrance Exam
                                </FormLabel>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                  value={examAppears}
                                  onChange={(e) =>
                                    setExamAppears(e.target.value)
                                  }
                                >
                                  <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    label="Appear"
                                  />
                                  <FormControlLabel
                                    value="0"
                                    control={<Radio />}
                                    label="Non Appear"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>
                          )}
                        </>
                      )}
                      {examAppears != "" && examAppears != "0" && (
                        <div className="col-md-6">
                          <FormControl
                            size="small"
                            className="rounded-lg"
                            fullWidth
                            margin="normal"
                          >
                            <InputLabel>Exam*</InputLabel>
                            <Select
                              value={selectedExam}
                              label="Exam*"
                              onChange={(e) => setSelectedExam(e.target.value)}
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {checkValue(data.courses) &&
                                data.courses
                                  .find((c) => c.course == selectedCourse)
                                  .entrance_exam.map((e, i) => {
                                    return (
                                      <MenuItem key={i} value={e}>
                                        {e}
                                      </MenuItem>
                                    );
                                  })}
                            </Select>
                          </FormControl>
                        </div>
                      )}
                      <div className="col-12 px-4">
                        <FormControl
                          size="small"
                          className="rounded-lg"
                          fullWidth
                          margin="normal"
                        >
                          <Typography id="input-slider" gutterBottom>
                            College Fees: {formatFeeLabel(fee)}
                          </Typography>
                          <Slider
  value={fee}
  min={200000}
  step={100000}
  max={5000000}
  // scale={calculateValue}
  // getAriaValueText={valueLabelFormat}
  // valueLabelFormat={valueLabelFormat}
  // marks={[{ value: fee, label: formatFeeLabel(fee) }]}
  onChange={handleSliderChange}
  // valueLabelDisplay="auto"
  aria-labelledby="non-linear-slider"
/>
                          {/* <Slider
                            value={fee}
                            onChange={handleSliderChange}
                            min={200000}
                            max={5000000}
                            step={100000}
                            marks={[{ value: fee, label: formatFeeLabel(fee) }]}
                            aria-labelledby="fee-slider"
                          /> */}
                        </FormControl>
                      </div>
                      <div className="col-12">
                        <div className={Classes["submit-btn"]}>
                          <input type="submit" />
                        </div>
                      </div>
                    </>
                  ) : activeBtn == "1" ? (
                    <div className={Classes["free-counselling"]}>
                      <p>Toll Free Number</p>
                      <p>+91 1294631199</p>
                    </div>
                  ) : (
                    activeBtn == "2" && (
                      <>
                        <div className="col-md-4">
                          <FormControl
                            required
                            size="small"
                            className="rounded-lg"
                            fullWidth
                            margin="normal"
                          >
                            <InputLabel>Courses</InputLabel>
                            <Select
                              value={selectedCourse}
                              label="Courses"
                              onChange={(e) =>
                                setSelectedCourse(e.target.value)
                              }
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {checkValue(data.courses) &&
                                data.courses.map((c, i) => {
                                  return (
                                    <MenuItem key={i} value={c.course}>
                                      {c.course}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-4">
                          <FormControl
                            required
                            size="small"
                            className="rounded-lg"
                            fullWidth
                            margin="normal"
                          >
                            <InputLabel>Location</InputLabel>
                            <Select
                              value={selectedLocation}
                              label="Location"
                              onChange={(e) =>
                                setSelectedLocation(e.target.value)
                              }
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {checkValue(data.zones) &&
                                data.zones.map((zone, i) => {
                                  return (
                                    <MenuItem key={i} value={zone.name}>
                                      {zone.name}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-4">
                          <FormControl
                            required
                            size="small"
                            className="rounded-lg"
                            fullWidth
                            margin="normal"
                          >
                            <InputLabel>Ratings</InputLabel>
                            <Select
                              value={selectedRanking}
                              label="Ratings"
                              onChange={(e) =>
                                setSelectedRanking(e.target.value)
                              }
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {checkValue(data.ratings) &&
                                data.ratings.map((r, i) => {
                                  return (
                                    <MenuItem key={i} value={r.value}>
                                      {r.label}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-12">
                          <div className={Classes["submit-btn"]}>
                            <input type="submit" />
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* {isSearchModalOpen && (
        <SearchModal onHide={() => setIsSearchModalOpen(false)} />
      )} */}
    </div>
  );
};

export default HomepageHeroSection;
