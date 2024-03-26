import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import { IndianStates } from "/components/Comps/StatesIndia";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const tabs = {
  0: "generalinfo",
  1: "overview",
  2: "course",
  3: "campus",
  4: "admission",
  5: "scholorship",
  6: "placement",
  7: "cutoff",
  8: "clgrank",
  9: "gallery",
};
export default class AddClgTopbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: "",
      collegeList: [],
      isapihitting:false
    };
  }

  GetCollegeData(selectedCountry){
    this.setState({isapihitting:true})
    fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          `/GetCollegeList?country=${selectedCountry}&tab=${
            tabs[sessionStorage.getItem("st")]
          }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
        }
      ).then(async (res) => {
        let response = await res.json();
        // console.log(response);
        var data = []
        if (response.data.length > 0) {
            data = response.data.map((s) => {
            let obj = {
              _id: s._id,
              college_name: s.college_name,
              disabled: false,
            };
  
            if (response.disabled_colleges.includes(s._id)) {
              obj.disabled = true;
            }
  
            return obj;
          });
          
        }
        this.setState({ collegeList: data });

        // console.log(response.data.length == 0)
        this.props.iscollegeListEmpty(response.data.length == 0);
    this.setState({isapihitting:false})

      });
  }

  handleCountryChange(e) {
    this.setState({
      selectedCountry: e.target.value,
      
    });
    this.GetCollegeData(e.target.value)
    this.props.onclgchange("")
  }
  componentDidUpdate(prevProps){
    if(this.props.selectedClg !=  prevProps.selectedClg && this.state.selectedCountry == ""){
        this.GetCollegeData(this.state.selectedCountry)
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className={Classes["labelname"]} htmlFor="countries">
                Countries<span className={Classes["error"]}>*</span>
              </label>
              <select
                name="countries"
                id="countries"
                className="form-select"
                required
                value={this.state.selectedCountry}
                onChange={(e) => this.handleCountryChange(e)}
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
          {
            this.state.isapihitting?
            <div className="col-md-1 gx-0 d-flex align-items-end" ><img src="/assets/images/loader.gif" width={50} height={50} alt="loader"></img></div>
            :
            <div className="col-md-4">
            <div className="form-group">
              <label className={Classes["labelname"]} htmlFor="colleges">
                Colleges <span className={Classes["error"]}>*</span>
              </label>
              <select
                name="colleges"
                id="colleges"
                className="form-select"
                required
                value={this.props.selectedClg}
                onChange={(e) =>this.props.onclgchange(e.target.value)}
              >
                <option disabled value="">
                  Select a college
                </option>
                {this.state.collegeList.map((c, i) => {
                  return (
                    <option disabled={c.disabled} key={i} value={c._id}>
                      {c.college_name}
                    </option>
                  );
                })}
              </select>
               {/* <Autocomplete
//   disablePortal
  id="combo-box-demo"
  options={this.state.collegeList.map(s=>s.college_name)}
  size="small"
  onChange={(e,newValue) =>{
    console.log(e.target.value,newValue)
    this.props.onclgchange(newValue)
  }}
  value={this.props.selectedClg}
  style={{ background: "white" }}
//   getOptionLabel={(option) => option.college_name}
//   getOptionSelected = {(e)=>{  }}
required
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Enter College Name"
    />
  )}
/> */}
            
            </div>
          </div>
          }
       
        </div>
      </div>
    );
  }
}
