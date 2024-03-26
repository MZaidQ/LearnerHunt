import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import Loading from "/components/Comps/Loading";
import YearList from "@/components/Comps/YearList";
import Badge from '@mui/material/Badge';
// const baseurl = sessionStorage.getItem("apipathurl");
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { coursenameList } from "@/components/Comps/type";
import { coursefulleligibiltyCriteria } from "@/components/Comps/type";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddClgTopbar from "@/components/Comps/AddClgTopbar";

const courseFullname = coursenameList.map(course => course.fullName);
const eligibilityLabels = coursefulleligibiltyCriteria.map(course => course.label);
export default class Admission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      admissiondesc: "",
      selectedClg: '',
      iscollegeListEmpty: false,
      admissionFields: [],
    };
  }

  onFieldChange(index, field, value, curFields, box) {
    const updatedFields = [...curFields];
    updatedFields[index][field] = value;

    if (box === '1') {
      this.setState({
        admissionFields: updatedFields
      })
    }
  }
  addNewField = (box) => {
    if (box === '1') {
      this.setState((prevState) => ({
        admissionFields: [
          ...prevState.admissionFields,
          {  course_name: '', eligibility: '' }
        ]
      }));
    }

  }
  deleteField(i, curFields, box) {
    const fields = [...curFields];
    fields.splice(i, 1);
    if (box === '1') {
      this.setState({
        admissionFields: fields
      })
    }
  }

  handleAdmission =(e)=>{
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to save the data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

    this.setState({isLoading:true})
    var formData = new FormData();
    formData.append("college_id", this.state.selectedClg);
    formData.append("admission_process", this.state.admissiondesc);
    formData.append("admission_eligibility_criteria", JSON.stringify(this.state.admissionFields));
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/add-college-admission", {
method: 'POST',
headers: {
  'Authorization': `Bearer ${localStorage.getItem("pt")}`
},
body: formData
})
.then (async response => {
  // console.log(response)
  this.setState({  isLoading: false})

if (response.ok) {
  var res = await response.json();
  Swal.fire({
    title: "Success",
    text: `${res.message}`,
    icon: "success",
    confirmButtonText: "Ok",
  }).then(() => {
    this.setState({  admissiondesc: "",
    selectedClg: '',
    admissionFields: []},()=>this.props.onSuccess())

  });
} else {
  var res = await response.json();
  Swal.fire({
    title: "error",
    text: `${res.error}`,
    icon: "error",
    confirmButtonText: "Ok",
  }).then(() => {
    this.setState({isLoading:false})
  });
}
})
.catch(error => {
console.error('Error:', error);
});
      }
    });
  }
  render() {
    // const { collegeList } = this.props
    return (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
        <form action="#" onSubmit={(e) => this.handleAdmission(e)}>
        <AddClgTopbar
        selectedClg={this.state.selectedClg}

              onclgchange={(id) => this.setState({ selectedClg: id })}
              iscollegeListEmpty={(x) =>
                this.setState({ iscollegeListEmpty: x })
              }
            />
            <hr />
            {!this.state.iscollegeListEmpty ? (
              this.state.selectedClg != "" ? (
          <div className="row">
            <div className="col-md-12">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Admission Process{" "}
                </label>
                <textarea
                  type="text"
                  rows={4}
                  className="form-control"
                  placeholder="Enter Admission Process"
                  value={this.state.admissiondesc}
                  onChange={(e) =>
                    this.setState({ admissiondesc: e.target.value })
                  }
                />
              </div>
            </div>
        
            <div
              className="col-md-12 border mb-3"
              style={{ backgroundColor: "#ededed" }}
            >
              <h3 style={{ padding: "0.5rem 0rem" }}>
                Admissions{" "}
                <Badge
                  badgeContent={this.state.admissionFields.length}
                  color="primary"
                >
                  <ApartmentIcon color="action" />
                </Badge>
              </h3>
              {this.state.admissionFields.map((field, i) => {
                return (
                  <div className="row">
                    <div className="col-md-5">
                      <div className={Classes["form-group"]}>
                        <label className={Classes["labelname"]} htmlFor="name">
                          Course Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter coursename"
                          required
                          value={field.course_name}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "course_name",
                              e.target.value,
                              this.state.admissionFields,
                              "1"
                            )
                          }
                        />
                                                {/* <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={courseFullname}
  size="small"
  onChange={(event, newValue) =>
    this.onFieldChange(
      i,
      "course_name",
      newValue,
      this.state.admissionFields,
      "1"
    )
  }
  style={{ background: "white" }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Enter Course Full Name"
    />
  )}
/> */}
                      </div>
                    </div>

                    <div className="col-md-5">
                      <div className={Classes["form-group"]}>
                        <label className={Classes["labelname"]} htmlFor="name">
                        Eligibility 
                        </label>
                        {/* <input
                          type="text"
                          className="form-control"
                          placeholder="Enter eligibility"
                          required
                          value={field.eligibility}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "eligibility",
                              e.target.value,
                              this.state.admissionFields,
                              "1"
                            )
                          }
                        /> */}
                                   <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={eligibilityLabels}
  size="small"
  onChange={(event, newValue) =>
    this.onFieldChange(
      i,
      "eligibility",
      newValue,
      this.state.admissionFields,
      "1"
    )
  }
  style={{ background: "white" }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Enter Eligibility Criteria"
    />
  )}
/>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className={Classes.dltIcon}>
                        <Tooltip
                          title="Delete"
                          onClick={() =>
                            this.deleteField(
                              i,
                              this.state.admissionFields,
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
                + Add More
              </span>
            </div>

            <div className="row">
              <div className="col-md-12">
                <CTA title="Create"  />
              </div>
            </div>
          </div>
           ) : (
            <div className={Classes["select-clg"]}>
              <p>Please Select a College</p>
            </div>
          )
        ) : (
          <div className={Classes["select-clg"]}>
            <p>Create a College from General Info</p>
          </div>
        )}
          </form>
        </div>
        {
          <Loading
            show={this.state.isLoading}
            onHide={() => this.setState({ isLoading: false })}
          />
        }
      </div>
    );
  }
}
