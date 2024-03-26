import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import Loading from "/components/Comps/Loading";
import { IndianStates } from "/components/Comps/StatesIndia";
import { TypeofCollege } from "/components/Comps/type";
import MultipleTagsInput from "@/components/Comps/MultipleTagsInput";


export default class Gernal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiHitComplete: true,
      isDataFound: false,
      collegename: "",
      selectedCountry: "",
      selectedState: "",
      selectedCity: "",
      selectedcollegetype: "",
      email: "",
      phone: "",
      password: "",
      c_password: "",
      ratings: "",
      isLoading: false,
      selectedFile: null,
      selectedValues: [],
      selectedKeyword: [],
      isError: false,
      errorMsg: "",
    };
    this.fileInputRef = React.createRef();
  }

  handleApiHit(){
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/college/my-college?tab=0`, {
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
        if (response.name=="" && response.data && Object.keys(response.data).length > 0) {
          const {
            college_name,
            city,
            college_type,
            country,
            ratings,
            state,
            approved_by,
            keywords,
          } = response.data;
          let found = false;
          if (IndianStates[country][state] != undefined) {
            found = true;
          }
          
          this.setState({
            collegename: college_name,
            selectedCountry: IndianStates[country] ? country : "",
            selectedState: found ? state : "",
            selectedCity: city,
            selectedcollegetype: college_type,
            selectedValues: approved_by ? approved_by.split(",") : [],
            selectedKeyword: keywords ? keywords.split(",") : [],
            ratings: ratings,
          
            isDataFound: true,
          });
        }else{
          this.setState({
            collegename: response.name,
          });
        }
      }
    });
  }
  componentDidMount() {
    this.handleApiHit()
  }

  

  //  componentDidUpdate(prevProps){
  //   if(prevProps.edit_id != this.props.edit_id){
  //     this.setState({ collegename: "",selectedCountry:"", selectedState:"", selectedCity:"", selectedcollegetype:"",selectedValues:[],selectedKeyword:[],ratings:""  })

  //      }
  //  }

  handleTagDelete = (index) => {
    const newSelectedValues = [...this.state.selectedValues];
    newSelectedValues.splice(index, 1);
    this.setState({ selectedValues: newSelectedValues });
  };

  handleTagAdd = (value) => {
    this.setState((prevState) => ({
      selectedValues: [...prevState.selectedValues, value],
    }));
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];

    this.setState({ selectedFile: file });
  };

  handleSubmit = async (e) => {
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
        try {
          if (this.props.edit_id) {
            this.setState({ isLoading: true });
            const fd = new FormData();
            fd.append("college_name", this.state.collegename.trim());
            fd.append("country", this.state.selectedCountry);
            fd.append("state", this.state.selectedState);
            fd.append("city", this.state.selectedCity);
            fd.append("college_type", this.state.selectedcollegetype);
            fd.append("approved_by", this.state.selectedValues);
            fd.append("college_broucher_pdf", this.state.selectedFile);
            fd.append("ratings", this.state.ratings);
            fd.append("keywords", this.state.selectedKeyword);
            fetch(
              process.env.NEXT_PUBLIC_API_ENDPOINT +
                `/college/my-college?tab=0`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("ct")}`,
                },
                method: "PUT",
                body: fd,
              }
            ).then(async (response) => {
              var res = await response.json();
              // console.log(res);
              // console.log(res.message)
              // console.log(res.error)
              this.setState({ isLoading: false });
              if (response.ok) {
                // console.log("hello", response.data);
                Swal.fire({
                  title: "Success",
                  text: `${res.message}`,
                  icon: "success",
                  confirmButtonText: "Ok",
                });
              } else {
                Swal.fire({
                  title: "error",
                  text: `${res.error}`,
                  icon: "error",
                  confirmButtonText: "Ok",
                }).then(() => {
                  this.setState({ isLoading: false });
                });
              }
            });
          } else {
            this.setState({ isLoading: true });
            const fd = new FormData();
            fd.append("college_name", this.state.collegename.trim());
            fd.append("country", this.state.selectedCountry);
            fd.append("state", this.state.selectedState);
            fd.append("city", this.state.selectedCity);
            fd.append("college_type", this.state.selectedcollegetype);
            fd.append("approved_by", this.state.selectedValues);
            fd.append("college_broucher_pdf", this.state.selectedFile);
            fd.append("ratings", this.state.ratings);
            fd.append("keywords", this.state.selectedKeyword);

            fetch(
              process.env.NEXT_PUBLIC_API_ENDPOINT +
                "/college/my-college?tab=0",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("ct")}`,
                },
                method: "POST",
                body: fd,
              }
            ).then(async (response) => {
              var res = await response.json();
              // console.log(res)
              // console.log(res.message)
              // console.log(res.error)
              this.setState({ isLoading: false });

              if (response.ok) {
                // console.log("hello", response.data);
                Swal.fire({
                  title: "Success",
                  text: `${res.message}`,
                  icon: "success",
                  confirmButtonText: "Ok",
                }).then(() => {
    this.handleApiHit()

                  // this.setState(
                  //   {
                  //     collegename: "",
                  //     selectedCountry: "",
                  //     selectedState: "",
                  //     selectedCity: "",
                  //     selectedcollegetype: "",
                  //     selectedValues: [],
                  //     selectedKeyword: [],
                  //     ratings: "",
                  //     selectedFile: null,
                  //   },
                  //   () => (this.fileInputRef.current.value = null)
                  // );
                });
              } else {
                if (res.error && res.status == 0) {
                  Swal.fire({
                    title: "error",
                    text: `${res.error}`,
                    icon: "error",
                    confirmButtonText: "Login",
                  }).then(() => {
                    localStorage.removeItem("ct");
                    window.location.href = "/";
                  });
                } else {
                  Swal.fire({
                    title: "error",
                    text: `${res.error}`,
                    icon: "error",
                    confirmButtonText: "Ok",
                  }).then(() => {
                    this.setState({ isLoading: false });
                  });
                }
              }
            });
          }
        } catch (error) {
          // Handle network or fetch error
          console.error(error);
        }
      }
    });
  };
  render() {
    // console.log(IndianStates)
    return (
      <>
        {!this.state.isError ? (
          <div className={Classes["add-user"]}>
            <div className={Classes["form-div"]}>
              <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        className={Classes["labelname"]}
                        htmlFor="countries"
                      >
                        Countries<span className={Classes["error"]}>*</span>
                      </label>
                      <select
                        disabled={this.state.isDataFound}
                        name="countries"
                        id="countries"
                        className="form-select"
                        required
                        value={this.state.selectedCountry}
                        onChange={(e) =>
                          // console.log(e.target.value)
                          this.setState({
                            selectedCountry: e.target.value,
                            selectedState: "",
                            selectedCity: "",
                          })
                        }
                      >
                        <option disabled value="">
                          Select a country
                        </option>
                        {Object.keys(IndianStates).map((c, i) => {
                          return (
                            <option key={i} value={c}>
                              {c}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        College Name <span className={Classes["error"]}>*</span>
                      </label>
                      <input
                        disabled={this.state.isDataFound}
                        type="text"
                        className="form-control"
                        placeholder="Enter College Name"
                        required
                        value={this.state.collegename}
                        onChange={(e) =>
                          this.setState({ collegename: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className={Classes["labelname"]} htmlFor="state">
                        {this.state.selectedCountry != "India"
                          ? "Region"
                          : "State"}{" "}
                        <span className={Classes["error"]}>*</span>
                      </label>
                      <select
                        name="state"
                        id="state"
                        className="form-select"
                        disabled={this.state.isDataFound}
                        required
                        value={this.state.selectedState}
                        onChange={(e) =>
                          this.setState({ selectedState: e.target.value })
                        }
                      >
                        <option disabled value="">
                          Select a{" "}
                          {this.state.selectedCountry != "India"
                            ? "region"
                            : "state"}
                        </option>
                        {this.state.selectedCountry != "" &&
                          Object.keys(
                            IndianStates[this.state.selectedCountry]
                          ).map((d, i) => {
                            return (
                              <option key={i} value={d}>
                                {d}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className={Classes["labelname"]} htmlFor="city">
                        City <span className={Classes["error"]}>*</span>
                      </label>
                      <select
                        name="city"
                        disabled={this.state.isDataFound}
                        id="city"
                        className="form-select"
                        required
                        value={this.state.selectedCity}
                        onChange={(e) =>
                          this.setState({ selectedCity: e.target.value })
                        }
                      >
                        <option disabled value="">
                          Select a city
                        </option>
                        {this.state.selectedState != "" &&
                          IndianStates[this.state.selectedCountry][
                            this.state.selectedState
                          ].map((c, i) => {
                            return (
                              <option key={i} value={c}>
                                {c}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        className={Classes["labelname"]}
                        htmlFor="collegetype"
                      >
                        College Type <span className={Classes["error"]}>*</span>
                      </label>
                      <select
                        name="collegetype"
                        id="collegetype"
                        disabled={this.state.isDataFound}
                        className="form-select"
                        required
                        value={this.state.selectedcollegetype}
                        onChange={(e) =>
                          this.setState({ selectedcollegetype: e.target.value })
                        }
                      >
                        <option disabled value="">
                          Select a College Type
                        </option>
                        {TypeofCollege.map((d, i) => {
                          return (
                            <option key={i} value={d.name}>
                              {d.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="ratings">
                        Ratings{" "}
                      </label>
                      <input
                        type="text"
                        disabled={this.state.isDataFound}
                        className="form-control"
                        placeholder="ex-2.3"
                        minLength={3}
                        maxLength={3}
                        value={this.state.ratings}
                        onChange={(e) =>
                          this.setState({ ratings: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  {!this.props.edit_id && (
                    <div className="col-md-4">
                      <div className={Classes["form-group"]}>
                        <label className={Classes["labelname"]} htmlFor="name">
                          {" "}
                          Brochure Upload
                        </label>
                        <input
                          type="file"
                          className="form-control"
                        disabled={this.state.isDataFound}
                        ref={this.fileInputRef}
                          accept="application/pdf"
                          onChange={this.handleFileChange}
                        />
                      </div>
                    </div>
                  )}
                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Approved By <span className={Classes["error"]}>*</span>
                      </label>
                      {/* input tag  */}
                      <MultipleTagsInput
                        placeholder="Add Approval"
                        disabled={this.state.isDataFound}
                        required
                        value={this.state.selectedValues}
                        onChange={(values) =>
                          this.setState({ selectedValues: values })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className={Classes["form-group"]}>
                      <label className={Classes["labelname"]} htmlFor="name">
                        Keywords
                      </label>
                      {/* input tag  */}
                      <MultipleTagsInput
                        disabled={this.state.isDataFound}
                        placeholder="Enter Search Keywords"
                        value={this.state.selectedKeyword}
                        onChange={(values) =>
                          this.setState({ selectedKeyword: values })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    {this.state.isDataFound ? (
                      <h5 style={{marginTop:"2rem",color:"red",fontStyle:"italic"}}>Note:Please contact learnerhunt admins to edit your college. </h5>
                    ) : (
                      <CTA title="Create" />
                    )}
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
        ) : (
          <div style={{margin:"0.5rem",border: "1px solid gainsboro",
          borderRadius: "5px",
          padding: "1.5rem",
          marginBottom: "1rem" ,
          backgroundColor: "#fff"}}>
         { this.state.errorMsg}
          </div>
        )}
      </>
    );
  }
}
