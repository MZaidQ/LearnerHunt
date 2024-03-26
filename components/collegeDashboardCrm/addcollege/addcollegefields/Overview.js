import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import Loading from "/components/Comps/Loading";
import MultipleTagsInput from "@/components/Comps/MultipleTagsInput";
import YearList from "@/components/Comps/YearList";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { coursenameList } from "@/components/Comps/type";
import { courseduration } from "@/components/Comps/type";
import AddClgTopbar from "@/components/Comps/AddClgTopbar";

const courseLabels = coursenameList.map((course) => course.label);
const durationLabels = courseduration.map((course) => course.label);
export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiHitComplete: true,
      isDataFound: false,
      isLoading: false,
      selectedClg: "",

      // maincomponent
      selectedYear: "",
      selectedInstituteType: "",
      collegeDescription: "",
      recognisedValues: [],
      foreignCollaborations: [],
      whereToApply: "",
      campusSize: "",
      offeredCourseCount: "",
      totalFaculty: "",
      totalIntake: "",
      avgPackage: "",
      highestPackage: "",
      topRecruiters: [],
      campusFacilities: [],
      acceptedExams: [],
      offeredCourses: [],
      applicationProcess: "",
      collegeCollaborations: [],
      topCourseAndFees: [],
      Faqs: [],
      faculty: [],
      admissionDates: [],
      selectedCountry: "",
      iscollegeListEmpty: false,
      isError:false
    };
  }
  handleApiHit(){
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/college/my-college?tab=1`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ct")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      // console.log(response)
      this.setState({ isDataFound: false });
      if (response.error) {
        this.setState({ isError: true, errorMsg: response.error });
      } else {
        if (response.data && Object.keys(response.data).length > 0) {
          this.setState({
            selectedYear: response.data.establishment_year.substring(0,4),
            recognisedValues:response.data.recognised_by ? response.data.recognised_by.split(",") : [],
            foreignCollaborations:response.data.foreign_collaboration?response.data.foreign_collaboration.split(","):[],
            whereToApply:response.data.where_to_apply,
            campusSize: response.data.campus_size,
      offeredCourseCount: response.data.course_offered_count,
      totalFaculty: response.data.total_faculty,
      totalIntake: response.data.total_intake,
      avgPackage: response.data.avg_package,
      highestPackage: response.data.highest_annual_package,
      topRecruiters: response.data.top_recruiter?response.data.top_recruiter.split(","):[],
      campusFacilities: response.data.campus_facilities?response.data.campus_facilities.split(","):[],
      acceptedExams: response.data.exams_accepted?response.data.exams_accepted.split(","):[],
      applicationProcess: response.data.application_process,
      collegeCollaborations: response.data.college_collaborations?response.data.college_collaborations.split(","):[],
      collegeDescription:response.data.description,
      admissionDates:response.data.admission_dates.map((s)=>{
        let obj = {
          ...s,
          date:s.date.split("T")[0]
        }
        return obj
      }),
      offeredCourses: response.data.offered_courses,
      topCourseAndFees: response.data.top_course,
      Faqs:response.data.college_faqs,
      faculty:response.data.college_faculty,



            isDataFound: true,
          });
        }
      }
    });
  }
  componentDidMount() {
    this.handleApiHit()
  }

  onFieldChange(index, field, value, curFields, box) {
    const updatedFields = [...curFields];
    updatedFields[index][field] = value;

    if (box === "1") {
      this.setState({
        offeredCourses: updatedFields,
      });
    } else if (box === "2") {
      this.setState({
        topCourseAndFees: updatedFields,
      });
    } else if (box === "3") {
      this.setState({
        Faqs: updatedFields,
      });
    } else if (box === "4") {
      this.setState({
        faculty: updatedFields,
      });
    } else if (box === "5") {
      this.setState({
        admissionDates: updatedFields,
      });
    }
  }
  addNewField = (box) => {
    if (box === "1") {
      this.setState((prevState) => ({
        offeredCourses: [
          ...prevState.offeredCourses,
          { course_name: "", course_duration: "", annual_fees: "" },
        ],
      }));
    } else if (box === "2") {
      this.setState((prevState) => ({
        topCourseAndFees: [
          ...prevState.topCourseAndFees,
          { course_name: "", course_count: "", annual_fees: "" },
        ],
      }));
    } else if (box === "3") {
      this.setState((prevState) => ({
        Faqs: [...prevState.Faqs, { question: "", answer: "" }],
      }));
    } else if (box === "4") {
      this.setState((prevState) => ({
        faculty: [...prevState.faculty, { faculty_name: "", designation: "" }],
      }));
    } else if (box === "5") {
      this.setState((prevState) => ({
        admissionDates: [
          ...prevState.admissionDates,
          { year: "", event_name: "", date: "" },
        ],
      }));
    }
  };
  deleteField(i, curFields, box) {
    const fields = [...curFields];
    fields.splice(i, 1);
    if (box === "1") {
      this.setState({
        offeredCourses: fields,
      });
    } else if (box === "2") {
      this.setState({
        topCourseAndFees: fields,
      });
    } else if (box === "3") {
      this.setState({
        Faqs: fields,
      });
    } else if (box === "4") {
      this.setState({
        faculty: fields,
      });
    } else if (box === "5") {
      this.setState({
        admissionDates: fields,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to save the data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({ isLoading: true });
        var formData = new FormData();
        formData.append("college_id", this.state.selectedClg);
        formData.append("description", this.state.collegeDescription);
        formData.append(
          "admission_dates",
          JSON.stringify(this.state.admissionDates)
        );
        formData.append("establishment_year", this.state.selectedYear);
        formData.append("recognised_by", this.state.recognisedValues);
        formData.append(
          "foreign_collaboration",
          this.state.foreignCollaborations
        );
        formData.append("where_to_apply", this.state.whereToApply);
        formData.append("campus_size", this.state.campusSize);
        formData.append("course_offered_count", this.state.offeredCourseCount);
        formData.append("total_faculty", this.state.totalFaculty);
        formData.append("total_intake", this.state.totalIntake);
        formData.append("avg_package", this.state.avgPackage);
        formData.append("highest_annual_package", this.state.highestPackage);
        formData.append("top_recruiter", this.state.topRecruiters);
        formData.append("campus_facilities", this.state.campusFacilities);
        formData.append("exams_accepted", this.state.acceptedExams);
        formData.append(
          "offered_courses",
          JSON.stringify(this.state.offeredCourses)
        );
        formData.append("application_process", this.state.applicationProcess);
        formData.append(
          "college_collaborations",
          this.state.collegeCollaborations
        );
        formData.append(
          "top_course",
          JSON.stringify(this.state.topCourseAndFees)
        );
        formData.append("college_faqs", JSON.stringify(this.state.Faqs));
        formData.append("college_faculty", JSON.stringify(this.state.faculty));

        fetch(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/college/my-college?tab=1",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ct")}`,
            },
            body: formData,
          }
        )
          .then(async (response) => {
            // console.log(response)
            this.setState({ isLoading: false });

            if (response.ok) {
              var res = await response.json();
              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then(() => {
                this.handleApiHit()

              });
            } else {
              var res = await response.json();
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              }).then(() => {
                this.setState({ isLoading: false });
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };

  render() {
    // const { collegeList } = this.props
    return (
     <>
      {!this.state.isError ? (

<div className={Classes["add-user"]}>
  <div className={Classes["form-div"]}>
    <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
      {/* <AddClgTopbar
        onclgchange={(id) => this.setState({ selectedClg: id })}
        selectedClg={this.state.selectedClg}
        iscollegeListEmpty={(x) =>
          this.setState({ iscollegeListEmpty: x })
        }
      />

      <hr /> */}

      {/* {!this.state.iscollegeListEmpty ? (
        this.state.selectedClg != "" ? ( */}
          <div className="row">
            <div className="col-md-4">
              <YearList
                label="Establishment year"
                  disabled={this.state.isDataFound}
                  required
                selectedYear={this.state.selectedYear}
                onChange={(year) => this.setState({ selectedYear: year })}
              />
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Recognised By (Tags)
                </label>
                <MultipleTagsInput
                  placeholder="Add recognised by"
                  disabled={this.state.isDataFound}
                  value={this.state.recognisedValues}
                  onChange={(values) =>
                    this.setState({ recognisedValues: values })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  International Collabration (Tags)
                </label>
                <MultipleTagsInput
                  disabled={this.state.isDataFound}
                  placeholder="Add International Collabration"
                  value={this.state.foreignCollaborations}
                  onChange={(values) =>
                    this.setState({ foreignCollaborations: values })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Application Link
                </label>
                <input
                  type="text"
                  className="form-control"
                  disabled={this.state.isDataFound}
                  placeholder="ex: Paste link"
                  value={this.state.whereToApply}
                  onChange={(e) =>
                    this.setState({ whereToApply: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Campus Size
                </label>
                <input
                  type="text"
                  className="form-control"
                  disabled={this.state.isDataFound}
                  placeholder="ex: 800 acres"
                  value={this.state.campusSize}
                  onChange={(e) =>
                    this.setState({ campusSize: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Number of course offered{" "}
                  <span className={Classes["error"]}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter offered courses count"
                  disabled={this.state.isDataFound}
                  required
                  minLength={1}
                  maxLength={10}
                  value={this.state.offeredCourseCount}
                  onChange={(e) =>
                    this.setState({
                      offeredCourseCount: e.target.value.replace(
                        /\D/g,
                        ""
                      ),
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Total Faculty
                </label>
                <input
                  type="text"
                  className="form-control"
                  disabled={this.state.isDataFound}
                  placeholder="Enter faculty count"
                  minLength={1}
                  maxLength={10}
                  value={this.state.totalFaculty}
                  onChange={(e) =>
                    this.setState({
                      totalFaculty: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Total Intake
                </label>
                <input
                  type="text"
                  disabled={this.state.isDataFound}
                  className="form-control"
                  placeholder="Enter total intake"
                  minLength={1}
                  maxLength={10}
                  value={this.state.totalIntake}
                  onChange={(e) =>
                    this.setState({
                      totalIntake: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Average package(per annum){" "}
                  <span className={Classes["error"]}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ex: Rs 3.6 lakhs"
                  disabled={this.state.isDataFound}
                  required
                  value={this.state.avgPackage}
                  onChange={(e) =>
                    this.setState({ avgPackage: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  highest package(per annum){" "}
                  <span className={Classes["error"]}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ex: Rs 12.5 lakhs"
                  disabled={this.state.isDataFound}
                  required
                  value={this.state.highestPackage}
                  onChange={(e) =>
                    this.setState({ highestPackage: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Top recruiters (Tags)
                </label>
                <MultipleTagsInput
                  placeholder="Add top recruiters"
                  disabled={this.state.isDataFound}
                  value={this.state.topRecruiters}
                  onChange={(values) =>
                    this.setState({ topRecruiters: values })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Campus facilities (Tags)
                </label>
                <MultipleTagsInput
                  disabled={this.state.isDataFound}
                  placeholder="Add campus facilities"
                  value={this.state.campusFacilities}
                  onChange={(values) =>
                    this.setState({ campusFacilities: values })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Exams accepted (Tags){" "}
                  <span className={Classes["error"]}>*</span>
                </label>
                <MultipleTagsInput
                  required
                  disabled={this.state.isDataFound}
                  placeholder="Add accepted exams"
                  value={this.state.acceptedExams}
                  onChange={(values) =>
                    this.setState({ acceptedExams: values })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Application process
                </label>
                <textarea
                  type="text"
                  disabled={this.state.isDataFound}
                  rows={2}
                  className="form-control"
                  placeholder="Enter application process"
                  value={this.state.applicationProcess}
                  onChange={(e) =>
                    this.setState({ applicationProcess: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  College collaborations (Tags)
                </label>
                <MultipleTagsInput
                  disabled={this.state.isDataFound}
                  placeholder="Add college collaborations"
                  value={this.state.collegeCollaborations}
                  onChange={(values) =>
                    this.setState({ collegeCollaborations: values })
                  }
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  College description
                </label>
                <textarea
                  type="text"
                  rows={6}
                  className="form-control"
                  disabled={this.state.isDataFound}
                  placeholder="Enter college description"
                  value={this.state.collegeDescription}
                  onChange={(e) =>
                    this.setState({ collegeDescription: e.target.value })
                  }
                />
              </div>
            </div>
            <div
              className="col-md-12 border mb-3"
              style={{ backgroundColor: "#ededed" }}
            >
              <h3 style={{ padding: "0.5rem 0rem" }}>
                Admission Dates{" "}
                <Badge
                  badgeContent={this.state.admissionDates.length}
                  color="primary"
                >
                  <CalendarMonthIcon color="action" />
                </Badge>
              </h3>
              {this.state.admissionDates.map((d, i) => {
                return (
                  <div className="row">
                    <div className="col-md-3">
                      <YearList
                        label="Year"
                  disabled={this.state.isDataFound}
                  selectedYear={d.year}
                        onChange={(year) =>
                          this.onFieldChange(
                            i,
                            "year",
                            year,
                            this.state.admissionDates,
                            "5"
                          )
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Event name
                        </label>
                        <input
                          type="text"
                  disabled={this.state.isDataFound}
                  className="form-control"
                          placeholder="Enter event name"
                          value={d.event_name}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "event_name",
                              e.target.value,
                              this.state.admissionDates,
                              "5"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Select date
                        </label>
                        <input
                          type="date"
                  disabled={this.state.isDataFound}
                  className="form-control"
                          value={d.date}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "date",
                              e.target.value,
                              this.state.admissionDates,
                              "5"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-1">
                      <div className={Classes.dltIcon}>
                        <Tooltip
                          title="Delete"
                          onClick={() =>
                            this.deleteField(
                              i,
                              this.state.admissionDates,
                              "5"
                            )
                          }
                        >
                          <IconButton>
                            <DeleteIcon style={{ color: "red" }} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                );
              })}
              <span
                className="add-more-btn"
                onClick={() => this.addNewField("5")}
              >
                + Add more
              </span>
            </div>
            <div
              className="col-md-12 border mb-3"
              style={{ backgroundColor: "#ededed" }}
            >
              <h3 style={{ padding: "0.5rem 0rem" }}>
                Offered Courses{" "}
                <Badge
                  badgeContent={this.state.offeredCourses.length}
                  color="primary"
                >
                  <LocalOfferIcon color="action" />
                </Badge>
              </h3>
              {this.state.offeredCourses.map((course, i) => {
                return (
                  <div className="row">
                    <div className="col-md-4">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Course name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ex: B.Tech"
                  disabled={this.state.isDataFound}
                  value={course.course_name}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "course_name",
                              e.target.value,
                              this.state.offeredCourses,
                              "1"
                            )
                          }
                        />
                        {/* <Autocomplete
disablePortal
id="combo-box-demo"
options={courseLabels}
size="small"
onChange={(event, newValue) =>
this.onFieldChange(
i,
"course_name",
newValue,
this.state.offeredCourses,
"1"
)
}
style={{ background: "white" }}
renderInput={(params) => (
<TextField
{...params}
placeholder="Enter Course Name"
/>
)}
/> */}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Course duration
                        </label>
                        {/* <input
                        type="text"
                        className="form-control"
                        placeholder="ex: 4 years"
                        value={course.course_duration}
                        onChange={(e) => this.onFieldChange(i, 'course_duration', e.target.value, this.state.offeredCourses, '1')}
                      /> */}
                        <Autocomplete
                  disabled={this.state.isDataFound}
                  disablePortal
                          id="combo-box-demo"
                        value={course.course_duration}

                          options={durationLabels}
                          size="small"
                          onChange={(event, newValue) =>
                            this.onFieldChange(
                              i,
                              "course_duration",
                              newValue,
                              this.state.offeredCourses,
                              "1"
                            )
                          }
                          style={{ background: "white" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Enter Course Duration"
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Annual fees
                        </label>
                        <input
                  disabled={this.state.isDataFound}
                  type="text"
                          className="form-control"
                          placeholder="ex: Rs 40,000 - Rs 1,25,000 "
                          value={course.annual_fees}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "annual_fees",
                              e.target.value,
                              this.state.offeredCourses,
                              "1"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-1">
                      <div className={Classes.dltIcon}>
                        <Tooltip
                          title="Delete"
                          onClick={() =>
                            this.deleteField(
                              i,
                              this.state.offeredCourses,
                              "1"
                            )
                          }
                        >
                          <IconButton>
                            <DeleteIcon style={{ color: "red" }} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                );
              })}
              <span
                className="add-more-btn"
                onClick={() => this.addNewField("1")}
              >
                + Add Course
              </span>
            </div>
            <div
              className="col-md-12 border mb-3"
              style={{ backgroundColor: "#ededed" }}
            >
              <h3 style={{ padding: "0.5rem 0rem" }}>
                Top Course & fees{" "}
                <Badge
                  badgeContent={this.state.topCourseAndFees.length}
                  color="primary"
                >
                  <DomainVerificationIcon color="action" />
                </Badge>
              </h3>
              {this.state.topCourseAndFees.map((course, i) => {
                return (
                  <div className="row">
                    <div className="col-md-4">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Course name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                  disabled={this.state.isDataFound}
                  placeholder="ex: BSc"
                          value={course.course_name}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "course_name",
                              e.target.value,
                              this.state.topCourseAndFees,
                              "2"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Course count
                        </label>
                        <input
                          type="text"
                  disabled={this.state.isDataFound}
                  className="form-control"
                          placeholder="ex: 8 courses"
                          value={course.course_count}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "course_count",
                              e.target.value,
                              this.state.topCourseAndFees,
                              "2"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Annual fees
                        </label>
                        <input
                  disabled={this.state.isDataFound}
                  type="text"
                          className="form-control"
                          placeholder="ex: Rs 40,000 - Rs 1,25,000"
                          value={course.annual_fees}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "annual_fees",
                              e.target.value,
                              this.state.topCourseAndFees,
                              "2"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-1">
                      <div className={Classes.dltIcon}>
                        <Tooltip
                          title="Delete"
                          onClick={() =>
                            this.deleteField(
                              i,
                              this.state.topCourseAndFees,
                              "2"
                            )
                          }
                        >
                          <IconButton>
                            <DeleteIcon style={{ color: "red" }} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                );
              })}
              <span
                className="add-more-btn"
                onClick={() => this.addNewField("2")}
              >
                + Add Course
              </span>
            </div>
            <div
              className="col-md-12 border mb-3"
              style={{ backgroundColor: "#ededed" }}
            >
              <h3 style={{ padding: "0.5rem 0rem" }}>
                FAQs{" "}
                <Badge
                  badgeContent={this.state.Faqs.length}
                  color="primary"
                >
                  <LiveHelpIcon color="action" />
                </Badge>
              </h3>
              {this.state.Faqs.map((d, i) => {
                return (
                  <div className="row">
                    <div className="col-md-5">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Question
                        </label>
                        <textarea
                          type="text"
                          rows={3}
                          className="form-control"
                  disabled={this.state.isDataFound}
                  placeholder="Enter question"
                          value={d.question}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "question",
                              e.target.value,
                              this.state.Faqs,
                              "3"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Answer
                        </label>
                        <textarea
                          type="text"
                          rows={3}
                  disabled={this.state.isDataFound}
                  className="form-control"
                          placeholder="Enter answer"
                          value={d.answer}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "answer",
                              e.target.value,
                              this.state.Faqs,
                              "3"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-1">
                      <div className={Classes.dltIcon}>
                        <Tooltip
                          title="Delete"
                          onClick={() =>
                            this.deleteField(i, this.state.Faqs, "3")
                          }
                        >
                          <IconButton>
                            <DeleteIcon style={{ color: "red" }} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                );
              })}
              <span
                className="add-more-btn"
                onClick={() => this.addNewField("3")}
              >
                + Add FAQ
              </span>
            </div>
            <div
              className="col-md-12 border mb-3"
              style={{ backgroundColor: "#ededed" }}
            >
              <h3 style={{ padding: "0.5rem 0rem" }}>
                College Faculties{" "}
                <Badge
                  badgeContent={this.state.faculty.length}
                  color="primary"
                >
                  <PersonIcon color="action" />
                </Badge>
              </h3>
              {this.state.faculty.map((f, i) => {
                return (
                  <div className="row">
                    <div className="col-md-5">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Faculty name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                  disabled={this.state.isDataFound}
                  placeholder="Enter faculty name"
                          value={f.faculty_name}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "faculty_name",
                              e.target.value,
                              this.state.faculty,
                              "4"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={Classes["form-group"]}>
                        <label
                          className={Classes["labelname"]}
                          htmlFor="name"
                        >
                          Designation
                        </label>
                        <input
                          type="text"
                          className="form-control"
                  disabled={this.state.isDataFound}
                  placeholder="Enter designation"
                          value={f.designation}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "designation",
                              e.target.value,
                              this.state.faculty,
                              "4"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-1">
                      <div className={Classes.dltIcon}>
                        <Tooltip
                          title="Delete"
                          onClick={() =>
                            this.deleteField(i, this.state.faculty, "4")
                          }
                        >
                          <IconButton>
                            <DeleteIcon style={{ color: "red" }} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                );
              })}
              <span
                className="add-more-btn"
                onClick={() => this.addNewField("4")}
              >
                + Add Faculty
              </span>
            </div>
            <div className="col-md-12">
            {this.state.isDataFound ? (
                <h5 style={{marginTop:"2rem",color:"red",fontStyle:"italic"}}>Note:Please contact learnerhunt admins to edit your college. </h5>
              ) : (
                <CTA title="Create" />
              )}
            </div>
          </div>
        {/* ) : (
          <div className={Classes["select-clg"]}>
            <p>Please Select a College</p>
          </div>
        )
      ) : (
        <div className={Classes["select-clg"]}>
          <p>Create a College from General Info</p>
        </div>
      )} */}
    </form>
  </div>
  {
    <Loading
      show={this.state.isLoading}
      onHide={() => this.setState({ isLoading: false })}
    />
  }
</div>
  ) : (
    <div style={{margin:"0.5rem",border: "1px solid gainsboro",
    borderRadius: "5px",
    padding: "1.5rem",
    marginBottom: "1rem" ,
    backgroundColor: "#fff"}}>
   { this.state.errorMsg}
    </div>)}
     </>
    );
  }
}
