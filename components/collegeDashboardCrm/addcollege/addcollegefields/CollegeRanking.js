

import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { TypeofCategory } from "/components/Comps/type";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import AddClgTopbar from "@/components/Comps/AddClgTopbar";



const numberKeys = ["rank"]
export default class CollegeRankings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      iscollegeListEmpty: false,
      selectedClg: '',
      rankingFields:[]
    };
  }

  onFieldChange(index, field, value, curFields, box) {
    const updatedFields = [...curFields];
    if(numberKeys.includes(field)){
      updatedFields[index][field] = value.replace(/\D/g, "");
    }else{
    updatedFields[index][field] = value;
    }

    if (box === "1") {
      this.setState({
        rankingFields: updatedFields,
      });
    }
  }
  addNewField = (box) => {
    if (box === "1") {
      this.setState((prevState) => ({
        rankingFields: [
          ...prevState.rankingFields,
          { category: "", rank: "" },
        ],
      }));
    }
  };
  deleteField(i, curFields, box) {
    const fields = [...curFields];
    fields.splice(i, 1);
    if (box === "1") {
      this.setState({
        rankingFields: fields,
      });
    }
  }

  handleRanking =(e)=>{
    e.preventDefault()
    this.setState({isLoading:true})
    var formData = new FormData();
    formData.append("college_id", this.state.selectedClg);
    formData.append("ranking", JSON.stringify(this.state.rankingFields));
 

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/add-college-ranking", {
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
    this.setState({selectedClg:"",rankingFields:[]},()=>this.props.onSuccess())

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

  render() {
    const { collegeList } = this.props
    // console.log(collegeList)
    return (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
        <form action="#" onSubmit={(e) => this.handleRanking(e)}>
        <AddClgTopbar
              onclgchange={(id) => this.setState({ selectedClg: id })}
        selectedClg={this.state.selectedClg}
        iscollegeListEmpty={(x) =>
                this.setState({ iscollegeListEmpty: x })
              }
            />
            <hr />
            {!this.state.iscollegeListEmpty ? (
              this.state.selectedClg != "" ? (
            <div>
            <div className="row">
            <div
              className="col-md-12 border mb-3"
              style={{ backgroundColor: "#ededed" }}
            >
              <h3 style={{ padding: "0.5rem 0rem" }}>
                Ranking{" "}
                <Badge
                  badgeContent={this.state.rankingFields.length}
                  color="primary"
                >
                  <LeaderboardIcon color="action" />
                </Badge>
              </h3>
              {this.state.rankingFields.map((field, i) => {
                return (
                  
                  <div className="row">
                    <div className="col-md-5">
                    <div className="form-group">
                  <label className={Classes["labelname"]} htmlFor="categorytype">Category Type <span className={Classes["error"]}>*</span></label>
                  <select
                    name="categorytype"
                    id="categorytype"
                    className="form-select"
                    required
                    value={field.category}
                    onChange={(e) =>
                      this.onFieldChange(
                        i,
                        "category",
                        e.target.value,
                        this.state.rankingFields,
                        "1"
                      )
                    }
                 
                  >
                    <option disabled value="">Select a Category Type</option>
                    {TypeofCategory.map((d, i) => {
                      return (
                        <option key={i} value={d.name}
                        
                        disabled={this.state.rankingFields.some(
                          (field) => field.category === d.name
                        )}>
                          {d.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                    </div>
                    <div className="col-md-6">
                    <div className={Classes["form-group"]}>
                  <label className={Classes["labelname"]} htmlFor="name">
                    Rank{" "}<span className={Classes["error"]}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="eg: 5"
                    minLength={0}
                    maxLength={7}
                    required
                    value={field.rank}
                    onChange={(e) =>
                      this.onFieldChange(
                        i,
                        "rank",
                        e.target.value,
                        this.state.rankingFields,
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
                            this.deleteField(i, this.state.rankingFields, "1")
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
                <CTA title="Create"/>
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
      </div>
    );
  }
}
