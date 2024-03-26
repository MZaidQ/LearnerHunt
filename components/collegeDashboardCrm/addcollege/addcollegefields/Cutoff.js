

import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import Loading from "/components/Comps/Loading";
import YearList from "@/components/Comps/YearList";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import AddClgTopbar from "@/components/Comps/AddClgTopbar";

export default class Cutoff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cutoffFields: [],
      selectedClg: '',
      iscollegeListEmpty: false,
      isError:false

    };
  }

  handleApiHit() {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/college/my-college?tab=7`, {
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
            cutoffFields:response.data.yearwise_description,
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
        cutoffFields: updatedFields,
      });
    }
  }
  addNewField = (box) => {
    if (box === "1") {
      this.setState((prevState) => ({
        cutoffFields: [
          ...prevState.cutoffFields,
          { year: "", description: "" },
        ],
      }));
    }
  };
  deleteField(i, curFields, box) {
    const fields = [...curFields];
    fields.splice(i, 1);
    if (box === "1") {
      this.setState({
        cutoffFields: fields,
      });
    }
  }

  handleCutoff =(e)=>{
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
    formData.append("yearwise_description", JSON.stringify(this.state.cutoffFields));
 

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/college/my-college?tab=7", {
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
    const { collegeList } = this.props
    // console.log(collegeList)
    return (
      <>

      {!this.state.isError ? (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
        <form action="#" onSubmit={(e) => this.handleCutoff(e)}>
                <div>
                            <div className="row">
            <div
              className="col-md-12 border mb-3"
              style={{ backgroundColor: "#ededed" }}
            >
              <h3 style={{ padding: "0.5rem 0rem" }}>
                CutOffs{" "}
                <Badge
                  badgeContent={this.state.cutoffFields.length}
                  color="primary"
                >
                  <LeaderboardIcon color="action" />
                </Badge>
              </h3>
              {this.state.cutoffFields.map((field, i) => {
                return (
                  
                  <div className="row">
                    <div className="col-md-5">
                      <YearList
                        label="Year"
                        required
                  disabled={this.state.isDataFound}
                  selectedYear={field.year}
                        onChange={(year) =>
                          this.onFieldChange(
                            i,
                            "year",
                            year,
                            this.state.cutoffFields,
                            "1"
                          )
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <div className={Classes["form-group"]}>
                        <label className={Classes["labelname"]} htmlFor="name">
                          Description{" "}
                        </label>
                        <textarea
                          type="text"
                  disabled={this.state.isDataFound}
                  rows={2}
                          className="form-control"
                          placeholder="Enter Description"
                          required
                          value={field.description}
                          onChange={(e) =>
                            this.onFieldChange(
                              i,
                              "description",
                              e.target.value,
                              this.state.cutoffFields,
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
                            this.deleteField(i, this.state.cutoffFields, "1")
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
