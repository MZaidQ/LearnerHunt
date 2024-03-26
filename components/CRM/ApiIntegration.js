import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import Loading from "/components/Comps/Loading";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import Tablenav from "/components/Comps/Tablenav";
import axios from "axios";

import Dropdown from "react-bootstrap/Dropdown";
export default class ApiIntegration extends Component {
  constructor(props) {
    super(props);
    this.getDataFunction = this.getDataFunction.bind(this);
    this.state = {
      exportOptions: [],
      isLoading: false,
      selectedInstituteId: "",
      selectedApiId: "",
      selectedSourceId: "",
      collegeList: [],
      apiList: [],
      sourceNameList: [],

      name: "",
      mobilenumber: "",
      email: "",
      selectedStateName: "",
      stateList: [],
      selectedCityName: "",
      cityList: [],
      selectedCampusName: "",
      CampusNameList: [],
      selectedCourseName: "",
      selectedSpecName: "",
      CourseNameList: [],
      SpecializationList: [],
      selectedspecialization: "",
      medium: "",
      campaign: "",
      iid: "",
      aid: "",
    };
  }

  getDataFunction =()=>{
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
        "/admin/get-third-party-integration-data",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
      }
    )
      .then(async (response) => {
        const resp = await response.json();
        // console.log(resp)

        // console.log(resp.data);
        const expOpt = [];
        for (let i = 0; i < resp.data.length; i++) {
          let iid = resp.data[i].institute_id,
            i_name = resp.data[i].institute_name;
          for (let j = 0; j < resp.data[i].api_details.length; j++) {
            let obj = {
              label: i_name + " (" + resp.data[i].api_details[j].api_name + ")",
              iid,
              aid: resp.data[i].api_details[j].id,
            };
            expOpt.push(obj);
            // console.log(expOpt)
          }
        }

        this.setState({ collegeList: resp.data, exportOptions: expOpt });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  componentDidMount() {
   this.getDataFunction()
  }

  // componentDidMount(){
  //   axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/export-excel-template?iid=1&aid=1" , { responseType: 'blob',
  //   headers: {
  //            'Authorization': `Bearer ${localStorage.getItem("pt")}`
  //         },
  // })
  //   .then((response) => {
  //     // Create a URL for the blob response
  //     console.log(response)
  //     console.log(process.env.ROOT_DIR_PATH)
  //     // const url = window.URL.createObjectURL(new Blob([response.data]));
  //     fetch.get(process.env.ROOT_DIR_PATH+response.href)
  //     // Create a temporary anchor element to initiate the download
  //     // const a = document.createElement('a');
  //     // a.href = process.env.ROOT_DIR_PATH+response.data.href;
  //     // a.download = 'sample.xlsx'; // Specify the filename
  //     // document.body.appendChild(a);
  //     // a.click();

  //     // // Cleanup the temporary URL and anchor element
  //     // window.URL.revokeObjectURL(url);
  //     // document.body.removeChild(a);
  //   })
  //   .catch((error) => {
  //     console.error('Error downloading file:', error);
  //   });
  // }

  handleInstituteChange = (selectedInstituteId) => {
    // console.log(selectedInstituteId)
    const selectedApiNames = this.state.collegeList.find(
      (apiDetails) => apiDetails.institute_id == parseInt(selectedInstituteId)
    )?.api_details;

    const selectedStates = this.state.collegeList
      .find(
        (stateDetails) =>
          stateDetails.institute_id == parseInt(selectedInstituteId)
      )
      ?.locations.map((state) => state.state);

    this.setState({
      selectedInstituteId,
      selectedSourceId: "",
      selectedApiId: "",
      selectedStateName: "",
      selectedCampusName: "",
      selectedCityName: "",
      selectedCourseName: "",
      apiList: selectedApiNames || [],
      stateList: selectedStates,
    });
  };

  handleApiChange = (id) => {
    // console.log(id)

    const selectedSourceNames = this.state.apiList.find(
      (apiDetails) => apiDetails.id == id
    )?.source;
    const selectedCampuss = this.state.apiList
      .find((apiDetails) => apiDetails.id == id)
      ?.courses.map((campus) => campus.campus);

    // console.log(selectedSourceNames)
    this.setState({
      selectedApiId: id,
      selectedSourceId: "",
      selectedCampusName: "",
      selectedCourseName: "",
      sourceNameList: selectedSourceNames || [],
      CampusNameList: selectedCampuss,
      CourseNameList: [],
      SpecializationList: [],
    });
  };
  handleCampusChange = (selectedCampusName) => {
    // console.log(selectedCampusName);
    // const selectedCourseNames = this.state.collegeList
    //   .find((apiDetails) => apiDetails.institute_id === parseInt(this.state.selectedInstituteId))
    //   ?.courses.find((api) => api.campus === selectedCampusName)
    //   ?.course.map((course) => course);
    // console.log(this.state.selectedInstituteId);
    let selectedcourse = this.state.apiList
      .find((apiDetails) => apiDetails.id == this.state.selectedApiId)
      ?.courses.find((c) => c.campus == selectedCampusName)?.course;
    // console.log(selectedcourse);
    if (this.state.selectedInstituteId == 3) {
      // console.log("entry");
      selectedcourse = Object.keys(selectedcourse);
      // console.log(selectedcourse);
    }
    this.setState({
      selectedCampusName,
      selectedCourseName: "",
      CourseNameList: selectedcourse || [],
    });
  };

  handleCourseChange = (selectedCourse) => {
    // console.log(this.state.selectedInstituteId, selectedCourse);
    let selectedspec = this.state.apiList
      .find((apiDetails) => apiDetails.id == this.state.selectedApiId)
      ?.courses.find((c) => c.campus == this.state.selectedCampusName)?.course[
      selectedCourse
    ];
    // ?.Object.keys(course)
    // ?.course;
    // console.log(selectedspec);

    this.setState({
      selectedCourseName: selectedCourse,
      SpecializationList: selectedspec,
      // selectedSpecName: "",
      // SpecNameList: selectedcourse || [],
    });
  };

  handleStateChange = (selectedStateName) => {
    // console.log(selectedStateName)
    const selectedStateNames = this.state.collegeList
      .find(
        (apiDetails) =>
          apiDetails.institute_id === parseInt(this.state.selectedInstituteId)
      )
      ?.locations.find((api) => api.state === selectedStateName)
      ?.city.map((city) => city);

    this.setState({
      selectedStateName,
      // selectedStateName: "",
      cityList: selectedStateNames || [],
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    try {
      const fd = new FormData();
      fd.append("name", this.state.name);
      fd.append("mobile", this.state.mobilenumber);
      fd.append("email", this.state.email);
      fd.append("state", this.state.selectedStateName);
      fd.append("city", this.state.selectedCityName);
      fd.append("course", this.state.selectedCourseName);
      fd.append("medium", this.state.medium);
      fd.append("campaign", this.state.campaign);
      fd.append("campus", this.state.selectedCampusName);
      fd.append(
        "source",
        this.state.sourceNameList.find(
          (obj) => obj.college_id == this.state.selectedSourceId
        )?.source_name
      );
      fd.append("college_id", this.state.selectedSourceId);
      fd.append("institute_id", this.state.selectedInstituteId);
      fd.append(
        "institute_name",
        this.state.collegeList.find(
          (obj) => obj.institute_id == this.state.selectedInstituteId
        )?.institute_name
      );
      fd.append("api_id", this.state.selectedApiId);
      if(this.state.selectedInstituteId == 3){
      fd.append("specialization", this.state.selectedspecialization);
    }
      fd.append(
        "api_name",
        this.state.apiList.find((obj) => obj.id == this.state.selectedApiId)
          ?.api_name
      );

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/save-api-details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
        method: "POST",
        body: fd,
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res)
        // console.log(res.message)
        // console.log(res.error)
        this.setState({ isLoading: false });

        if (res.data.status == "Success") {
          // console.log("hello", response.data);
          Swal.fire({
            title: "Success",
            text: `${res.data.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            this.setState({
              selectedInstituteId: "",
              selectedApiId: "",

              selectedSourceId: "",
              collegeList: [],
              apiList: [],
              sourceNameList: [],

              name: "",
              mobilenumber: "",
              email: "",
              selectedStateName: "",
              stateList: [],
              selectedCityName: "",
              cityList: [],
              selectedCampusName: "",
              CampusNameList: [],
              selectedCourseName: "",
              CourseNameList: [],
              medium: "",
              campaign: "",
            });
            this.getDataFunction()
          });
        } else {
          Swal.fire({
            title: "error",
            text: `${res.data.message}`,
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {
            this.setState({ isLoading: false });
          });
        }
      });
    } catch (error) {
      // Handle network or fetch error
      console.error(error);
    }
  };

  handleimportChange = async (s) => {
    // console.log(s)
    // this.setState({aid:s.aid,iid:s.iid})
    // axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/export-excel-template?iid=${s.iid}&aid=${s.aid}` , { responseType: 'blob',
    //   headers: {
    //            'Authorization': `Bearer ${localStorage.getItem("pt")}`
    //         },
    // })
    //   .then((response) => {
    //     // Create a URL for the blob response
    //     console.log(response)
    //     // console.log(process.env.ROOT_DIR_PATH)
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     console.log(url)
    //     // fetch.get(process.env.ROOT_DIR_PATH+response.href)
    //     // Create a temporary anchor element to initiate the download
    //     const a = document.createElement('a');
    //     a.href = process.env.ROOT_DIR_PATH+response.data.href;
    //     a.download = 'sample.xlsx'; // Specify the filename
    //     document.body.appendChild(a);
    //     a.click();

    //     // Cleanup the temporary URL and anchor element
    //     window.URL.revokeObjectURL(url);
    //     document.body.removeChild(a);
    //   })
    //   .catch((error) => {
    //     console.error('Error downloading file:', error);
    //   });

    try {
      // Make a GET request to fetch the Blob data
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/admin/export-excel-template?iid=${s.iid}&aid=${s.aid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
          mode: "cors",
        }
      );

      if (response.ok) {
        const blob = await response.blob();

        const contentDispositionHeader = response.headers.get(
          "Content-Disposition"
        );
        //  console.log(contentDispositionHeader)
        var filename = "template.xlsx";
        // Parse the filename from the header
        if (contentDispositionHeader) {
          const matches = contentDispositionHeader.split("filename=");
          // console.log(matches)
          if (matches && matches.length > 1) {
            filename = matches[1].replace(/['"]/g, ""); // Remove surrounding quotes if present
            // console.log('Filename:', filename);
          }
        }
        // Create a File object from the Blob
        const file = new File([blob], filename, { type: blob.type });

        // You now have a File object that you can work with or save
        // For example, you can create a download link
        const url = window.URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to fetch Blob data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    return (
      <>
        {/* <Tablenav
          Actions={{
            Actions: (
             <>
                 <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Import
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {this.state.exportOptions.map((s)=>{
          return(
            <Dropdown.Item onClick={(e)=>this.handleimportChange(s)} >{s.label}</Dropdown.Item>
          )
        })}
        
      </Dropdown.Menu>
    </Dropdown>
    </>
          
            ),
          }}
        /> */}

        <div className={Classes["add-user"]}>
          <div className={Classes["form-div"]}>
            <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
              <div className="row">
                <div className="col-md-3">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Select Institute{" "}
                      <span className={Classes["error"]}>*</span>
                    </label>
                    <select
                      name="colleges"
                      id="colleges"
                      required
                      className="form-select"
                      value={this.state.selectedInstituteId}
                      onChange={(e) => {
                        this.handleInstituteChange(e.target.value);
                      }}
                    >
                      <option disabled value="">
                        Select an institute
                      </option>
                      {this.state.collegeList.map((c, i) => {
                        return (
                          <option key={i} value={c.institute_id}>
                            {c.institute_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Select Api Name{" "}
                      <span className={Classes["error"]}>*</span>
                    </label>
                    <select
                      name="collegeapi"
                      required
                      id="collegeapi"
                      className="form-select"
                      value={this.state.selectedApiId}
                      onChange={(e) => {
                        this.handleApiChange(e.target.value);
                      }}
                    >
                      <option disabled value="">
                        Select an API
                      </option>
                      {this.state.apiList.map((api, i) => (
                        <option key={i} value={api.id}>
                          {api.api_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Select Source Name{" "}
                      <span className={Classes["error"]}>*</span>
                    </label>
                    <select
                      required
                      name="sources"
                      id="sources"
                      className="form-select"
                      value={this.state.selectedSourceId}
                      onChange={(e) =>
                        this.setState({ selectedSourceId: e.target.value })
                      }
                    >
                      <option disabled value="">
                        Select a source
                      </option>
                      {this.state.sourceNameList.map((source, i) => (
                        <option key={i} value={source.college_id}>
                          {source.source_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {this.state.CampusNameList.length > 0 && (
                  <div className="col-md-3">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Select campus Name{" "}
                        <span className={Classes["error"]}>*</span>
                      </label>
                      <select
                        name="campus"
                        id="campus"
                        required
                        className="form-select"
                        value={this.state.selectedCampusName}
                        onChange={(e) => {
                          const selectedCampusName = e.target.value;
                          this.handleCampusChange(selectedCampusName);
                        }}
                      >
                        <option disabled value="">
                          Select a campus
                        </option>
                        {this.state.CampusNameList.map((campus, i) => (
                          <option key={i} value={campus}>
                            {campus}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
              <hr></hr>

              <div className="row">
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Student Name <span className={Classes["error"]}>*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={this.state.name}
                      required
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Mobile Number <span className={Classes["error"]}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      required
                      minLength={1}
                      maxLength={10}
                      value={this.state.mobilenumber}
                      onChange={(e) =>
                        this.setState({
                          mobilenumber: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      E-mail <span className={Classes["error"]}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      placeholder="Enter E-mail"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Select State <span className={Classes["error"]}>*</span>
                    </label>
                    <select
                      name="collegeapi"
                      id="collegeapi"
                      className="form-select"
                      required
                      value={this.state.selectedStateName}
                      onChange={(e) => {
                        const selectedStateName = e.target.value;
                        this.handleStateChange(selectedStateName);
                      }}
                    >
                      <option disabled value="">
                        Select an State
                      </option>
                      {this.state.stateList.map((state, i) => (
                        <option key={i} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Select City <span className={Classes["error"]}>*</span>
                    </label>
                    <select
                      name="city"
                      id="city"
                      className="form-select"
                      required
                      value={this.state.selectedCityName}
                      onChange={(e) =>
                        this.setState({ selectedCityName: e.target.value })
                      }
                    >
                      <option disabled value="">
                        Select a city
                      </option>
                      {this.state.cityList.map((city, i) => (
                        <option key={i} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      Select course Name{" "}
                      <span className={Classes["error"]}>*</span>
                    </label>
                    {this.state.CampusNameList.length > 0 ? (
                      <select
                        name="courses"
                        id="courses"
                        required
                        className="form-select"
                        value={this.state.selectedCourseName}
                        onChange={
                          (e) => {
                            const selectedCourseName = e.target.value;
                            this.handleCourseChange(selectedCourseName);
                          }
                          // this.setState({ selectedCourseName: e.target.value })
                        }
                      >
                        <option disabled value="">
                          Select a course
                        </option>
                        {this.state.CourseNameList.map((course, i) => (
                          <option key={i} value={course}>
                            {course}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Course Name"
                        value={this.state.selectedCourseName}
                        onChange={(e) =>
                          this.setState({ selectedCourseName: e.target.value })
                        }
                      />
                    )}
                  </div>
                </div>
                {this.state.selectedInstituteId == 3 &&
                  this.state.selectedCourseName && (
                    <div className="col-md-4">
                      <div className={Classes["form-group"]}>
                        <label className={Classes["labelname"]} htmlFor="name">
                          Select specialization Name{" "}
                          <span className={Classes["error"]}>*</span>
                        </label>
                        <select
                          name="specialization"
                          id="specialization"
                          required
                          className="form-select"
                          value={this.state.selectedspecialization}
                          onChange={(e) =>
                            this.setState({
                              selectedspecialization: e.target.value,
                            })
                          }
                        >
                          <option disabled value="">
                            Select a specialization
                          </option>
                          {this.state.SpecializationList.map((spec, i) => (
                            <option key={i} value={spec}>
                              {spec}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      {" "}
                      Medium{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Medium"
                      value={this.state.medium}
                      onChange={(e) =>
                        this.setState({ medium: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={Classes["form-group"]}>
                    <label className={Classes["labelname"]} htmlFor="name">
                      {" "}
                      Campaign{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Campaign"
                      value={this.state.campaign}
                      onChange={(e) =>
                        this.setState({ campaign: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <CTA title="Create" />
                </div>
              </div>
            </form>
          </div>

          {
            <Loading
              show={this.state.isLoading}
              onHide={() => this.setState({ isLoading: false })}
            />
          }
        </div>
      </>
    );
  }
}
