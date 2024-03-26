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
      isError:false
    };
  }
  handleApiHit(){
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/college/my-college?tab=6`, {
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
            placementdesc: response.data.placement_description,
            placementpros: response.data.placement_process,
            highestpack: response.data.highest_package,
            averagepack: response.data.avg_package,
            jobofferd: response.data.total_job_offers,
            companyvisit: response.data.total_companies_visited,
            placementsFields: response.data.placement_year,
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

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/college/my-college?tab=6", {
method: 'POST',
headers: {
  'Authorization': `Bearer ${localStorage.getItem("ct")}`
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
      <>

      {!this.state.isError ? (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
        <form action="#" onSubmit={(e) => this.handlePlacement(e)}>
   
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
                  disabled={this.state.isDataFound}
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
                  disabled={this.state.isDataFound}
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
                  disabled={this.state.isDataFound}
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
                  disabled={this.state.isDataFound}
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
                  disabled={this.state.isDataFound}
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
                  disabled={this.state.isDataFound}
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
                  disabled={this.state.isDataFound}
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
                  disabled={this.state.isDataFound}
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
                  disabled={this.state.isDataFound}
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
              {this.state.isDataFound ? (
                      <h5 style={{marginTop:"2rem",color:"red",fontStyle:"italic"}}>Note:Please contact learnerhunt admins to edit your college. </h5>
                    ) : (
                      <CTA title="Create" />
                    )}
              </div>
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
  )
}
</>
    );
  }
}
