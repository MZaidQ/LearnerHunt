import Classes from '/styles/gernal.module.css'
import React, { Component } from 'react'
import CTA from "/components/Comps/CTA";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MultipleTagsInput from '@/components/Comps/MultipleTagsInput';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import Swal from "sweetalert2";
import Loading from "/components/Comps/Loading";
import AddClgTopbar from "@/components/Comps/AddClgTopbar";

export default class Scholorship extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedClg: '',
      scholarshipdesc:"",
      iscollegeListEmpty: false,

      scholarshipScheme: [], sportsScholorship: [], meritCumMeansScholorship: []
    }
  }
  onFieldChange(index, field, value, curFields, box) {
    const updatedFields = [...curFields];
    updatedFields[index][field] = value;

    if (box === '1') {
      this.setState({
        scholarshipScheme: updatedFields
      })
    } else if (box === '2') {
      this.setState({
        sportsScholorship: updatedFields
      })
    } else if (box === '3') {
      this.setState({
        meritCumMeansScholorship: updatedFields
      })
    }
  }
  addNewField = (box) => {
    if (box === '1') {
      this.setState((prevState) => ({
        scholarshipScheme: [
          ...prevState.scholarshipScheme,
          { category: '', eligibility_criteria: '', scholorship: '' }
        ]
      }));
    } else if (box === '2') {
      this.setState((prevState) => ({
        sportsScholorship: [
          ...prevState.sportsScholorship,
          { level: [], scholorship: '' }
        ]
      }));
    } else if (box === '3') {
      this.setState((prevState) => ({
        meritCumMeansScholorship: [
          ...prevState.meritCumMeansScholorship,
          { annual_income: '', scholorship: '' }
        ]
      }));
    }
  }
  deleteField(i, curFields, box) {
    const fields = [...curFields];
    fields.splice(i, 1);
    if (box === '1') {
      this.setState({
        scholarshipScheme: fields
      })
    } else if (box === '2') {
      this.setState({
        sportsScholorship: fields
      })
    } else if (box === '3') {
      this.setState({
        meritCumMeansScholorship: fields
      })
    }
  }

  handleSubmit =(e)=>{
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
    formData.append("scholorship_description", this.state.scholarshipdesc);
    formData.append("scholorship_scheme", JSON.stringify(this.state.scholarshipScheme));
    let sports = this.state.sportsScholorship.map((obj)=>{
      let newobj =  {
      level:obj.level.join(","),
      scholorship:obj.scholorship
      }
      return newobj
    })
    formData.append("sports_scholorship", JSON.stringify(sports));
    formData.append("merit_cum_means_scholorship", JSON.stringify(this.state.meritCumMeansScholorship));

    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/add-college-scholorship", {
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
    this.setState({   
      selectedClg:"",
    scholarshipdesc:"",
    scholarshipScheme: [], sportsScholorship: [], meritCumMeansScholorship: []},()=>this.props.onSuccess())

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
    const { collegeList } = this.props
    return (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
          <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
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
                  ScholarShip Description{" "}
                  <span className={Classes["error"]}>*</span>
                </label>
                <textarea
                  type="text"
                  rows={4}
                  className="form-control"
                  placeholder="Enter Description"
                  required
                  value={this.state.scholarshipdesc}
                  onChange={(e) =>
                    this.setState({ scholarshipdesc: e.target.value })
                  }
                />
              </div>
            </div>
              <div className="col-md-12 border mb-3" style={{ backgroundColor: "#ededed" }}>
                <h3 style={{ padding: "0.5rem 0rem" }}>Scholarship scheme{" "}
                  <Badge badgeContent={this.state.scholarshipScheme.length} color="primary">
                    <ReceiptLongIcon color="action" />
                  </Badge>
                </h3>
                {
                  this.state.scholarshipScheme.map((s, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-3">
                          <div className={Classes["form-group"]}>
                            <label className={Classes["labelname"]} htmlFor="name">Category <span className={Classes["error"]}>*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: A"
                              required
                              value={s.category}
                              onChange={(e) => this.onFieldChange(i, 'category', e.target.value, this.state.scholarshipScheme, '1')}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className={Classes["form-group"]}>
                            <label className={Classes["labelname"]} htmlFor="name">Eligibility Criteria <span className={Classes["error"]}>*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: >=95%"
                              required
                              value={s.eligibility_criteria}
                              onChange={(e) => this.onFieldChange(i, 'eligibility_criteria', e.target.value, this.state.scholarshipScheme, '1')}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className={Classes["form-group"]}>
                            <label className={Classes["labelname"]} htmlFor="name">Scholorship <span className={Classes["error"]}>*</span></label>
                            <textarea
                              type="text"
                              rows={2}
                              required
                              className="form-control"
                              placeholder="ex: 100% Scholarship on Tuition Fees"
                              value={s.scholorship}
                              onChange={(e) => this.onFieldChange(i, 'scholorship', e.target.value, this.state.scholarshipScheme, '1')}
                            />
                          </div>
                        </div>
                        <div className="col-md-1">
                          <div className={Classes.dltIcon}>
                            <Tooltip title="Delete" onClick={() => this.deleteField(i, this.state.scholarshipScheme, '1')}>
                              <IconButton>
                                <DeleteIcon style={{ color: "red" }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                <span className="add-more-btn" onClick={() => this.addNewField('1')}>+ Add more</span>
              </div>
              <div className="col-md-12 border mb-3" style={{ backgroundColor: "#ededed" }}>
                <h3 style={{ padding: "0.5rem 0rem" }}>Sports scholarship{" "}
                  <Badge badgeContent={this.state.sportsScholorship.length} color="primary">
                    <SportsScoreIcon color="action" />
                  </Badge>
                </h3>
                {
                  this.state.sportsScholorship.map((s, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-5">
                          <div className={Classes["form-group"]}>
                            <label className={Classes["labelname"]} htmlFor="name">Level (Tags) <span className={Classes["error"]}>*</span></label>
                            <MultipleTagsInput
                              placeholder="Add level"
                              required
                              value={s.level}
                              onChange={(value) => this.onFieldChange(i, 'level', value, this.state.sportsScholorship, '2')}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className={Classes["form-group"]}>
                            <label className={Classes["labelname"]} htmlFor="name">Scholorship <span className={Classes["error"]}>*</span></label>
                            <textarea
                              type="text"
                              rows={2}
                              required
                              className="form-control"
                              placeholder="ex: 20% Scholarship on Tuition Fees for only the First Year"
                              value={s.scholorship}
                              onChange={(e) => this.onFieldChange(i, 'scholorship', e.target.value, this.state.sportsScholorship, '2')}
                            />
                          </div>
                        </div>
                        <div className="col-md-1">
                          <div className={Classes.dltIcon}>
                            <Tooltip title="Delete" onClick={() => this.deleteField(i, this.state.sportsScholorship, '2')}>
                              <IconButton>
                                <DeleteIcon style={{ color: "red" }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                <span className="add-more-btn" onClick={() => this.addNewField('2')}>+ Add more</span>
              </div>
              <div className="col-md-12 border mb-3" style={{ backgroundColor: "#ededed" }}>
                <h3 style={{ padding: "0.5rem 0rem" }}>Financial need scholarships{" "}
                  <Badge badgeContent={this.state.meritCumMeansScholorship.length} color="primary">
                    <MilitaryTechIcon color="action" />
                  </Badge>
                </h3>
                {
                  this.state.meritCumMeansScholorship.map((s, i) => {
                    return (
                      <div className="row">
                        <div className="col-md-5">
                          <div className={Classes["form-group"]}>
                            <label className={Classes["labelname"]} htmlFor="name">Annual income <span className={Classes["error"]}>*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ex: A"
                              required
                              value={s.annual_income}
                              onChange={(e) => this.onFieldChange(i, 'annual_income', e.target.value, this.state.meritCumMeansScholorship, '3')}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className={Classes["form-group"]}>
                            <label className={Classes["labelname"]} htmlFor="name">Scholorship <span className={Classes["error"]}>*</span></label>
                            <textarea
                              type="text"
                              rows={2}
                              required
                              className="form-control"
                              placeholder="ex: 100% Scholarship on Tuition Fees"
                              value={s.scholorship}
                              onChange={(e) => this.onFieldChange(i, 'scholorship', e.target.value, this.state.meritCumMeansScholorship, '3')}
                            />
                          </div>
                        </div>
                        <div className="col-md-1">
                          <div className={Classes.dltIcon}>
                            <Tooltip title="Delete" onClick={() => this.deleteField(i, this.state.meritCumMeansScholorship, '3')}>
                              <IconButton>
                                <DeleteIcon style={{ color: "red" }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                <span className="add-more-btn" onClick={() => this.addNewField('3')}>+ Add more</span>
              </div>
              <div className="col-md-12">
                <CTA title="Create" />
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
    )
  }
}