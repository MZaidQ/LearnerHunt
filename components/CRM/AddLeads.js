import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import { Spinner } from "react-bootstrap";
import AddClgTopbar from "@/components/Comps/AddClgTopbar";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Input } from "@mui/material";
import Tablenav from "../Comps/Tablenav";

const convertDate = time =>{
  // Get the year, month, and day
const year = time.getFullYear();
const month = String(time.getMonth() + 1).padStart(2, '0'); // Month is zero-based
const day = String(time.getDate()).padStart(2, '0');

// Format the date as "yyyy-mm-dd"
const formattedDate = `${year}-${month}-${day}`;
return formattedDate
}
export default class AddLeads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      clgList: [],
      collegeList:[],
      isDataFound: false,
      isApiHitComplete: true,
      selectedCategory: [],
      username: localStorage.getItem("username"),
      statusAnchorEl: null,
      lastrecid:"-1",
      selectedClg: '',
      iscollegeListEmpty: false,
      from:convertDate(new Date()),
      to:convertDate(new Date()),
      cid:""

      // selectedAsset: null,
    };
  }


 formatTimestamp(timestamp) {
    const dateObject = new Date(timestamp);
  
    const formattedTime = dateObject.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  
    return `${formattedTime}, ${formattedDate}`;
  }

  getAssetList() {
    this.setState({ isApiHitComplete: false, isDataFound: false });
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/landing-page-leads?cid=${this.state.cid}&from=${this.state.from}&to=${this.state.to}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      // console.log(response.data);
      if (response.data?.length > 0) {
        this.setState({ clgList: response.data, isDataFound: true });
      }
      this.setState({ isApiHitComplete: true });
    });
  }

  componentDidMount() {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/get-initial-data`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      let response = await res.json();
      // console.log(response.data);
      if (response.data.colleges?.length > 0) {
        this.setState({ collegeList: response.data.colleges});
      }
    });;
  }

  render() {
    // console.log(this.state)
    return (
      <>
         
              {/* <select
                name="colleges"
                id="colleges"
                className="form-select"
                required
                value={this.state.selectedClg}
                onChange={(e)=>this.getAssetList(e)}
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
              </select> */}
              <div style={{display:"flex"}}>
              <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={this.state.collegeList}
      sx={{ width: 300 ,margin:"0.5rem"  }}
      onChange={(event, newValue) => {
        // console.log(newValue)
        if(newValue){
          this.setState({cid:newValue._id},()=>{
          this.getAssetList()

          })
        }else{
          this.setState({isDataFound:false})
        }
      }}
      getOptionLabel={(option) => option.college_name}
renderInput={(params) => <TextField {...params} label="College List" />}
    />
      
      <TextField type="date" 
      sx={{ width: 300 ,margin:"0.5rem"  }}
      label="From"
      id="outlined-basic"  variant="outlined" 
      inputProps={{ max: convertDate(new Date()) }}
      value={this.state.from}
      onChange={(e)=>{
        this.setState({from:e.target.value},()=>this.getAssetList())
        
      }}/>
      <TextField type="date" 
      label="To"
      sx={{ width: 300 ,margin:"0.5rem"  }}
      value={this.state.to}
      id="outlined-basic"  variant="outlined" 
      inputProps={{ max: convertDate(new Date()),min:this.state.from }}
      onChange={(e)=>{
        this.setState({to:e.target.value},()=>this.getAssetList())
        
      }}/>

      </div>
            <hr />
      
        {this.state.isApiHitComplete ? (
          this.state.isDataFound ? (
            <table className={`table table-hover custom-table`}>
              <thead>
                <tr>
                  <th style={{ background: "var(--primary)" }}>Student Name</th>
                  <th style={{ background: "var(--primary)" }}>Mobile Number</th>
                  <th style={{ background: "var(--primary)" }}>Course</th>
                  <th style={{ background: "var(--primary)" }}>Email</th>
                  <th style={{ background: "var(--primary)" }}>State</th>
                  <th style={{ background: "var(--primary)" }}>City</th>
                  <th style={{ background: "var(--primary)" }}>Date</th>
                  <th style={{ background: "var(--primary)" }}>IP Address</th>




                </tr>
              </thead>
              <tbody>
                {this.state.clgList.map((clg, i) => {
                  return (
                    
                      <tr key={i}>
                        <td>{clg.name}</td>
                        <td>{clg.mobile}</td>
                        <td>{clg.course}</td>
                        <td>{clg.email}</td>
                        <td>{clg.state}</td>
                        <td>{clg.city}</td>
                        <td>{this.formatTimestamp(clg.createdAt)}</td>
                        <td>{clg.ipv4?clg.ipv4:"-"}</td>

                  



                      </tr>
                    
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ display: "flex", width: "100%", height: '68vh', justifyContent: "center", alignItems: 'center' }}>
            <div style={{ fontWeight: "500" }}>
              <span style={{ color: "#0d6efd", cursor: 'pointer' }}> No Records </span>
            </div>
          </div>
          )
        ) : (
             <div style={{ display: "flex", width: "100%", height: '68vh', justifyContent: "center", alignItems: 'center' }}>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
        )}
        <Loading
          show={this.state.isLoading}
          onHide={() => this.setState({ isLoading: false })}
        />
       
      </>
    );
  }
}
