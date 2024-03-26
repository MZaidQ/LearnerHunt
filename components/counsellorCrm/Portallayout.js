import React, { Component } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Classes from  "/styles/portaldashboard.module.css";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import Avatar from "@mui/material/Avatar";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BusinessIcon from '@mui/icons-material/Business';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import GroupIcon from "@mui/icons-material/Group";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactsIcon from "@mui/icons-material/Contacts";
import QuizIcon from '@mui/icons-material/Quiz';
import BadgeIcon from "@mui/icons-material/Badge";
import CategoryIcon from "@mui/icons-material/Category";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DatasetIcon from "@mui/icons-material/Dataset";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RecyclingIcon from "@mui/icons-material/Recycling";
import SidebarItem from "./SidebarItem";
import ApiIcon from '@mui/icons-material/Api';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Tooltip from "@mui/material/Tooltip";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import SsidChartIcon from '@mui/icons-material/SsidChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import InsightsIcon from '@mui/icons-material/Insights';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const sidebarList = [
  {
    name: "My Profile",
    icon: <AccountBoxIcon />,
    path: "/counsellorportal/my-profile",
  },
  {
    name: "Interested Student",
    icon: <AddReactionIcon />,
    path: "/counsellorportal/interested-student",
  },

  
];
export default class PortalLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: true,
      // selectedLi: "",
      // selectedItem: "",
      selectedPage: sidebarList[0].name,
      anchorEl: null,
    };
  }

  // componentDidMount() {
  //   if (sessionStorage.getItem("selectedPage")) {
  //     this.setState({ selectedPage: sessionStorage.getItem("selectedPage") });
  //   }
  //   // console.log(this.props)
  // }

  

  render() {
    return (
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
            <span className={Classes["project-name"]}>Learnerhunt</span>
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
              {sidebarList.map((item, index) => (
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
            {/* <MenuItem>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
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
      </div>
    );
  }
}
