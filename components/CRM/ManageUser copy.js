import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import { Spinner } from "react-bootstrap";
import Switch from "@mui/material/Switch";
import Tablenav from "../Comps/Tablenav";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from "@mui/material/InputLabel";


var oldData = [];

export default class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      clgList: [],
      isDataFound: false,
      isApiHitComplete: true,
      selectedCategory: [],
      username: localStorage.getItem("username"),
      statusAnchorEl: null,
      lastrecid: "-1",
      approvalStatus: "",
      searchInput: "", // Search input
      email: "",
      password: "",
      isModalOpen: false,
      showPassword: false,
      cpassword: "",
      cshowPassword: false,
      role: 0,
      // selectedAsset: null,
    };
  }

  handleApprovalChange = (e, clg) => {
    // this.setState({ approvalStatus: e.target.value });
    // console.log(e.target.checked,e.target.value)
    const s = e.target.checked ? "1" : "0";
    this.setState({ isLoading: true });

    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/admin/crm-users-list?id=${clg._id}&s=${s}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
        method: "PUT",
      }
    ).then(async (response) => {
      var res = await response.json();
      // console.log(res);
      this.setState({ isLoading: false });
      // setIsLoading(false);
      if (response.ok) {
        Swal.fire({
          title: "Success",
          html: `${res.message}`,
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          this.getAssetList();
        });
      } else {
        Swal.fire({
          title: "error",
          html: `${res.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          this.setState({ isLoading: false });
        });
      }
    });
  };
  formatTimestamp(timestamp) {
    const dateObject = new Date(timestamp);

    const formattedTime = dateObject.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const formattedDate = dateObject.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return `${formattedTime}, ${formattedDate}`;
  }

  getAssetList() {
    this.setState({ isApiHitComplete: false, isDataFound: false });
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/crm-users-list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      // console.log(res)
      let response = await res.json();
      // console.log(response);
      if (response.data) {
        if (response.data.length > 0) {
          this.setState({ clgList: response.data, isDataFound: true });
        }
        oldData = response.data;
        this.setState({ isApiHitComplete: true });
      } else {
        Swal.fire({
          title: "error",
          html: `${response.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.reload();
        });
      }
    });
  }

  componentDidMount() {
    this.getAssetList();
  }
  handleSearchChange = (e) => {
    this.setState({ searchInput: e.target.value });
    const searchTerm = e.target.value
      .trim()
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, "i");

    if (e.target.value == "") {
      this.setState({ clgList: oldData });
      if (oldData.length > 0) {
        this.setState({ isDataFound: true });
      } else {
        this.setState({ isDataFound: false });
      }
    } else {
      const filteredData = oldData.filter((data) =>
        searchKeyword.test(data.email.toLowerCase())
      );

      if (filteredData.length > 0) {
        this.setState({ clgList: filteredData, isDataFound: true });
      } else {
        this.setState({ isDataFound: false });
      }
    }
  };

handleSubmit(e){
    e.preventDefault();
    // const { name, password } = formData;

    // // Check if email is empty
    // console.log(this.state.email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (this.state.email == "") {
      Swal.fire({
            title: "error",
            text: `Please enter email`,
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {
            this.setState({isLoading:false})
              });
    }
    else if(!emailRegex.test(this.state.email)) {
        Swal.fire({
          title: "error",
          text: `Please enter a valid email address`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          this.setState({isLoading:false})
            });
      }
      else if(!this.state.password){
        Swal.fire({
          title: "error",
          text: `Please enter your password`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          this.setState({isLoading:false})
            });
      }
      else if(!this.state.cpassword){
        Swal.fire({
          title: "error",
          text: `Please enter your confirm password`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          this.setState({isLoading:false})
            });
      }
      else if(this.state.password != this.state.cpassword){
        Swal.fire({
          title: "error",
          text: `Password not match.`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          this.setState({isLoading:false})
            });
      }
    else{
    try {
      this.setState({isLoading:true})
      const fd = new FormData();
      fd.append("email", this.state.email);
      fd.append("password", this.state.password);
      fd.append("cpass", this.state.cpassword);
      fd.append("r", this.state.role);

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/crm-users-list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
        method: "POST",
        body: fd,
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res)
        // console.log(res.message)
        if (response.ok) {
          // console.log("hello", response.data);
          Swal.fire({
            title: "Success",
            text: `${res.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            // props.onLogin(res.data.token,res.data.role,formData.name);
            this.setState({isLoading:false,isModalOpen:false,email:''})
            this.getAssetList()
          });
        } else {
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
          this.setState({isLoading:false})
        }
      });
    } catch (error) {
      // Handle network or fetch error
      console.error(error);
    }
  }
  };
  render() {
    return (
      <>
        <Tablenav
          Actions={{
            Actions: (
              <>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.searchInput}
                    placeholder="Search..."
                    onChange={(e) => this.handleSearchChange(e)}
                  />

                  <IconButton
                    style={{ margin: "0 0.5rem 0 1rem" }}
                    onClick={() => this.setState({ isModalOpen: true })}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </>
            ),
          }}
        />
        {this.state.isApiHitComplete ? (
          this.state.isDataFound ? (
            <table className={`table table-hover custom-table`}>
              <thead style={{ top: `8vh` }}>
                <tr>
                  <th
                    colSpan={2}
                    style={{
                      background: "var(--primary)",
                      textAlign: "center",
                    }}
                  >
                    Actions
                  </th>
                  <th style={{ background: "var(--primary)" }}>User Role</th>
                  <th style={{ background: "var(--primary)" }}>Login Status</th>
                  <th style={{ background: "var(--primary)" }}>
                    Email Address
                  </th>
                  <th style={{ background: "var(--primary)" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.clgList.map((clg, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <div>
                          <Switch
                            value={clg.role}
                            defaultChecked={clg.role == 0 ? true : false}
                            onChange={(e) => this.handleApprovalChange(e, clg)}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <IconButton onClick={(e) => console.log(clg._id)}>
                            {" "}
                            <EditIcon />
                          </IconButton>
                        </div>
                      </td>
                      <td>
                        {clg.role == 0 ? (
                          <span style={{ fontWeight: "500" }}>
                            <AssignmentIndIcon /> Admin
                          </span>
                        ) : (
                          <span style={{ fontWeight: "500" }}>
                            <SupportAgentIcon /> Support
                          </span>
                        )}
                      </td>
                      <td>
                        {clg.status ? (
                          <span style={{ fontWeight: "500", color: "green" }}>
                            Logged-In
                          </span>
                        ) : (
                          <span style={{ fontWeight: "500", color: "red" }}>
                            Logged-Out
                          </span>
                        )}
                      </td>
                      <td>{clg.email}</td>
                      <td>{this.formatTimestamp(clg.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "80vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: "500" }}>
                <span style={{ color: "#0d6efd", cursor: "pointer" }}>
                  {" "}
                  No Records{" "}
                </span>
              </div>
            </div>
          )
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "80vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" role="status" variant="info">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <Loading
          show={this.state.isLoading}
          onHide={() => this.setState({ isLoading: false })}
        />
        <Modal
          centered
          show={this.state.isModalOpen}
          onHide={() => this.setState({ isModalOpen: false })}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Box
              component="form"
              onSubmit={(e) => this.handleSubmit(e)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                id="email"
                name="name"
                type="email"
                fullWidth
                variant="outlined"
                label="Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />

              <FormControl
                sx={{ mt: 2, width: "100%" }}
                variant="outlined"
                required
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  fullwidth="true"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  type={this.state.showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          this.setState({
                            showPassword: !this.state.showPassword,
                          })
                        }
                        edge="end"
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl
                sx={{ my: 2, width: "100%" }}
                variant="outlined"
                required
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  fullwidth="true"
                >
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="cpassword"
                  name="cpassword"
                  onChange={(e) => this.setState({ cpassword: e.target.value })}
                  type={this.state.cshowPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          this.setState({
                            cshowPassword: !this.state.cshowPassword,
                          })
                        }
                        edge="end"
                      >
                        {this.state.cshowPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  User Role
                </FormLabel>
                <RadioGroup
                row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={this.state.role}
                  onChange={(e)=>this.setState({role:e.target.value})}
                >
                  <FormControlLabel
                    value='1'
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value='0'
                    control={<Radio />}
                    label="Support"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                disabled={this.state.isLoading}
                className="bg-blue-500"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {this.state.isLoading ? (
                  <>
                    <span>Please Wait...</span>
                    <Spinner animation="border" role="status" />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </Modal.Body>
        </Modal>

        {/* {this.state.openPreviewAsset && (
          <Previewmodal
            show={this.state.openPreviewAsset}
            onHide={() => this.setState({ openPreviewAsset: false })}
            data={this.state.selectedAsset}
            baseurl={this.state.baseurl}
          />
        )} */}
      </>
    );
  }
}
