import React, { Component } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import Classes from  "/styles/portaldashboard.module.css";
import PersonIcon from '@mui/icons-material/Person';
import Avatar from "@mui/material/Avatar";
import SidebarItem from "./SidebarItem";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import {Spinner} from 'react-bootstrap'
import { Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";

// import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
// import SsidChartIcon from '@mui/icons-material/SsidChart';
// import TimelineIcon from '@mui/icons-material/Timeline';
// import InsightsIcon from '@mui/icons-material/Insights';
// import AddRoadIcon from '@mui/icons-material/AddRoad';
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// const sidebarList = [
//   {
//     name: "Dashboard",
//     icon: 'Home',
//     path: "/adminportal/dashboard",
//   },
//   {
//     name: "Colleges",
//     icon: 'Group',
//     children: [
//       {
//         name: "Add College",
//         icon: 'PersonAdd',
//         path: "/adminportal/addcollege",
//       },
//       {
//         name: "All Colleges",
//         icon: 'Contacts',
//         path: "/adminportal/allcollege",
//       },
      
//     ],
//   },
 
  
//   // {
//   //   name: "ApiIntegration",
//   //   icon: <ApiIcon/>,
//   //   path: "/adminportal/api",
//   // },
// {
//   name: "ApiIntegration",
//   icon: 'Api',
//   children: [
//     {
//       name: "Imarticus",
//       icon: 'Timeline',
//       path: "/adminportal/imarticus",
//     },
//     {
//       name: "Others",
//       icon: 'SsidChart',
//       path: "/adminportal/api",
//     }
//   ]
// },
//   {
//     name: "Leads",
//     icon: 'Leaderboard',
//     children: [
//       {
//         name: "Test Eligibility",
//         icon: 'Timeline',
//         path: "/adminportal/testeligibility",
//       },
//       {
//         name: "Applied Colleges",
//         icon: 'SsidChart',
//         path: "/adminportal/appliedcollege",
//       },
//       {
//         name: "Student's Registered",
//         icon: 'Insights',
//         path: "/adminportal/studentregister",
//       },
//       {
//         name: "Ad Leads",
//         icon: 'AddRoad',
//         path: "/adminportal/adleads",
//       },
//       {
//         name: "PopUp Leads",
//         icon: 'SsidChart',
//         path: "/adminportal/popupregister",
//       },
//       {
//         name: "Colleges Admin",
//         icon: 'SupervisorAccount',
//         path: "/adminportal/collegeadmins",
//       }
      
//     ],
//   },
//   {
//     name: "Trash",
//     icon: 'DeleteForever',
//     children:[{
//       name: "Colleges",
//       icon: 'Apartment',
//     path: "/adminportal/trashcolleges",
//     }
//     ],
//   },
//   // {
//   //   name: "Import Export",
//   //   icon: <HomeIcon />,
//   //   path: "/adminportal/importexport",
//   // },
// ];
export default class PortalLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: true,
      // selectedLi: "",
      // selectedItem: "",
      selectedPage: '',
      anchorEl: null,
      sidebarList:[],
      isLoading:true,
      email:'',
      password:'',
      cpassword:'',
      showPassword:false,
      cshowPassword:false,
      isModalOpen:false
    };

    this.assignAppName = this.assignAppName.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
  }

  componentDidMount() {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/get-sidebar", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (response) => {
      var res = await response.json();
      // console.log(res)
      if (sessionStorage.getItem("selectedPage")) {
        this.setState({ selectedPage: sessionStorage.getItem("selectedPage") });
      }else{
        this.setState({ selectedPage: res.data[0].name})
      }
      this.setState({sidebarList:res.data,isLoading:false})

    });
  }

  assignAppName(role=localStorage.getItem('crmrole')){
    if(role==0){
      return 'Learnerhunt-Admin'
    }else if(role==4){
      return 'Learnerhunt-Support'
    }
    return 'Learnerhunt'
  }

  handleOpenModal(){
    // console.log('hello')
    this.setState({isModalOpen:true,email:localStorage.getItem("admincrmemail")})
  }
 handleSubmit = (e) => {
    e.preventDefault();
      // console.log(email);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (this.state.email == "") {
        Swal.fire({
          title: "error",
          text: `Please enter email`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          this.setState({isLoading:false});
        });
      } else if (!emailRegex.test(this.state.email)) {
        Swal.fire({
          title: "error",
          text: `Please enter a valid email address`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          this.setState({isLoading:false});
        });
      } else if (this.state.password == "") {
        Swal.fire({
          title: "error",
          text: `Please enter your password`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          this.setState({isLoading:false});
        });
      } else if (this.state.cpassword == "") {
        Swal.fire({
          title: "error",
          text: `Please enter your confirm password`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          this.setState({isLoading:false});
        });
      } else if (this.state.password != this.state.cpassword) {
        Swal.fire({
          title: "error",
          text: `Password not match.`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          this.setState({isLoading:false});
        });
      } else {
        try {
          this.setState({isLoading:true})

          const fd = new FormData();
          fd.append("email",this.state.email);
          fd.append("password", this.state.password);
          fd.append("cpass", this.state.cpassword);
          fetch(
            process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/update-profile",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("pt")}`,
              },
              method: "POST",
              body: fd,
            }
          ).then(async (response) => {
            var res = await response.json();
            // console.log(res);
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
    this.setState({isModalOpen:false,isLoading:false,password:'',cpassword:''},()=>{localStorage.setItem('admincrmemail',this.state.email)})
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
      {!this.state.isLoading?
      <div className={Classes.dashboard}>
        <div className={Classes.navbar}>
          <div className={Classes["left-div"]}>
            <IconButton
              onClick={() =>
                this.setState({ isSidebarOpen: !this.state.isSidebarOpen })
              }
            >
              <MenuIcon />
            </IconButton>
            <span className={Classes["project-name"]}>{this.assignAppName()}</span>
            {/* <span className="project-name">Asset Management System</span> */}
            <div className={Classes["page-desc"]}>
              {/* <Tooltip title="Go Back">
                <IconButton onClick={() => window.history.back(-1)}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip> */}
              <span className={Classes.heading}>{this.state.selectedPage}</span>
            </div>
          </div>
          <div className={Classes["right-div"]}>
            <Tooltip title="Profile">
              <IconButton
                onClick={(e) => this.setState({ anchorEl: e.currentTarget })}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={
                  Boolean(this.state.anchorEl) ? "account-menu" : undefined
                }
                aria-haspopup="true"
                aria-expanded={
                  Boolean(this.state.anchorEl) ? "true" : undefined
                }
              >
                <Avatar sx={{ width: 32, height: 32 }}></Avatar>
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={Classes["bottom-section"]}>
          <div className={`${Classes.sidebar} ${this.state.isSidebarOpen ? "" : Classes.hide} `}>
            <div className={Classes["list-div"]}>
              {this.state.sidebarList.map((item, index) => (
                <SidebarItem
                  key={index}
                  item={item}
                  setSelectedItem={(page) =>
                    this.setState({ selectedPage: page })
                  }
                  selected={this.state.selectedPage}
                />
              ))}
            </div>
          </div>
          <div
            className={`${Classes["content-div"]} ${this.state.isSidebarOpen ? "" : Classes.full}`}
          >
      {this.props.children}
          </div>
        </div>

        <React.Fragment>
          <Menu
            anchorEl={this.state.anchorEl}
            id="account-menu"
            open={Boolean(this.state.anchorEl)}
            onClose={() => this.setState({ anchorEl: null })}
            onClick={() => this.setState({ anchorEl: null })}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={this.handleOpenModal}>
            <ListItemIcon>
              <PersonIcon fontSize="small"/>
              </ListItemIcon>
              {localStorage.getItem('admincrmemail')}
            </MenuItem>
            <Divider />
            {/* <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem> */}
            <MenuItem onClick={()=>this.props.onLogout()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
        <Modal
        centered
        show={this.state.isModalOpen}
        onHide={() => {
          this.setState({isModalOpen:false,email:'',password:'',cpassword:''})
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            component="form"
            onSubmit={this.handleSubmit}
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
              onChange={(e) =>this.setState({email:e.target.value})}
              required
            />
              <>
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
                    value={this.state.password}
                    onChange={(e) =>this.setState({password:e.target.value})}
                    type={this.state.showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => this.setState({showPassword:!this.state.showPassword})}
                          edge="end"
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl
                  sx={{ mt: 2, width: "100%" }}
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
                    value={this.state.cpassword}
                    name="cpassword"
                    onChange={(e) =>this.setState({cpassword:e.target.value})}
                    type={this.state.cshowPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => this.setState({cshowPassword:!this.state.cshowPassword})}
                          edge="end"
                        >
                          {this.state.cshowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
              </>
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
      </div>
      :
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Spinner animation="border" variant="dark" />
  </div>
      }
      </>
    );
  }
}
