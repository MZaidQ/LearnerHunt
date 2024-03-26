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
import AddClgTopbar from "@/components/Comps/AddClgTopbar";

export default class Gernal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      placementdesc: "",
      placementpros: "",
      highestpack: "",
      averagepack: "",
      jobofferd: "",
      companyvisit: "",
      placementsFields: [],
      selectedClg: '',
      iscollegeListEmpty: false,

    };
  }

  onFieldChange(index, field, value, curFields, box) {
    const updatedFields = [...curFields];
    updatedFields[index][field] = value;

    if (box === '1') {
      this.setState({
        placementsFields: updatedFields
      })
    }
  }
  addNewField = (box) => {
    if (box === '1') {
      this.setState((prevState) => ({
        placementsFields: [
          ...prevState.placementsFields,
          { year: '', particular: '', statistics: '' }
        ]
      }));
    }

  }
  deleteField(i, curFields, box) {
    const fields = [...curFields];
    fields.splice(i, 1);
    if (box === '1') {
      this.setState({
        placementsFields: fields
      })
    }
  }
  handlePlacement =(e)=>{
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
    formData.append("placement_description", this.state.placementdesc);
    formData.append("highest_package", this.state.highestpack);
    formData.append("avg_package", this.state.averagepack);
    formData.append("total_job_offers", this.state.jobofferd);
    formData.append("total_companies_visited", this.state.companyvisit);
    formData.append("placement_year", JSON.stringify(this.state.placementsFields));
    formData.append("placement_process", this.state.placementpros);

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/add-college-placement", {
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
    this.setState({    placementdesc: "",
    placementpros: "",
      selectedClg:"",
      highestpack: "",
    averagepack: "",
    jobofferd: "",
    companyvisit: "",
    placementsFields: []},()=>this.props.onSuccess())

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
})
  }
  render() {
    // const { collegeList } = this.props
    return (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
        <form action="#" onSubmit={(e) => this.handlePlacement(e)}>
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
            <div className="col-md-6">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Placement Description{" "}
                  <span className={Classes["error"]}>*</span>
                </label>
                <textarea
                  type="text"
                  rows={4}
                  className="form-control"
                  placeholder="Enter Description"
                  required
                  value={this.state.placementdesc}
                  onChange={(e) =>
                    this.setState({ placementdesc: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Placement Process 
                </label>
                <textarea
                  type="text"
                  rows={4}
                  className="form-control"
                  placeholder="Enter Description"
                  value={this.state.placementpros}
                  onChange={(e) =>
                    this.setState({ placementpros: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Highest Package <span className={Classes["error"]}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Highest Package"
                  required
                  value={this.state.highestpack}
                  onChange={(e) =>
                    this.setState({ highestpack: e.target.value.replace(/\D/g, "") })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Average Package <span className={Classes["error"]}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Average Package"
                  required
                  value={this.state.averagepack}
                  onChange={(e) =>
                    this.setState({ averagepack:e.target.value.replace(/\D/g, "") })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Total Number Of Job Offered
                  <span className={Classes["error"]}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="No of Job Offered"
                  required
                  value={this.state.jobofferd}
                  onChange={(e) => this.setState({ jobofferd:e.target.value.replace(/\D/g, "")})}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Total No Of Companies Visited
                  <span className={Classes["error"]}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="No of Companies Visited"
                  required
                  value={this.state.companyvisit}
                  onChange={(e) =>
                    this.setState({ companyvisit:e.target.value.replace(/\D/g, "") })
                  }
                />
              </div>
            </div>

          
            <div
              className="col-md-12 border mb-3"
              style={{ backgroundColor: "#ededed" }}
            >
              <h3 style={{ padding: "0.5rem 0rem" }}>
                Placements{" "}
                <Badge
                  badgeContent={this.state.placementsFields.length}
                  color="primary"
                >
                  <ApartmentIcon color="action" />
                </Badge>
              </h3>
              {this.state.placementsFields.map((field, i) => {
                return (
                  <div className="row">
                    <div className="col-md-4">
                      <YearList
                        label="Year"
                        selectedYear={field.year}
                        onChange={(year) =>
                          this.onFieldChange(
                            i,
                            "year",
                            year,
                            this.state.placementsFields,
                            "1"
                          )
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <div className={Classes["form-group"]}>
                        <label className={Classes["labelname"]} htmlFor="name">
                          Particular <span className={Classes["error"]}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter particular"
                          required
                          value={field.particular}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "particular",
                              e.target.value,
                              this.state.placementsFields,
                              "1"
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className={Classes["form-group"]}>
                        <label className={Classes["labelname"]} htmlFor="name">
                          Statistics <span className={Classes["error"]}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter statistics"
                          required
                          value={field.statistics}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "statistics",
                              e.target.value,
                              this.state.placementsFields,
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
                              this.state.placementsFields,
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
