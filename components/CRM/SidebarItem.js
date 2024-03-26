import React, { Component } from "react";
import Link from "next/link";
import Classes from "/styles/portaldashboard.module.css";
import * as MuiIcon from "@mui/icons-material";

class SidebarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleItemClick = (e, item) => {
    e.stopPropagation();
    const { setSelectedItem } = this.props;

    if (!item.children) {
      setSelectedItem(item.name);
      sessionStorage.setItem("selectedPage", item.name);
      sessionStorage.setItem("selectedPath", item.path);
      this.setState({ open: false });
    } else {
      this.setState((prevState) => ({ open: !prevState.open }));
    }
  };

  render() {
    const { item, setSelectedItem, selected } = this.props;
    const { open } = this.state;

    if (item.children) {
      return (
        <div
          className={`${Classes["sidebar-item"]} ${open ? Classes.open : ""}`}
          onClick={(e) => this.handleItemClick(e, item)}
        >
          <div className={Classes["sidebar-title"]}>
            <span>
            {React.createElement(MuiIcon[item.icon])}
              <span style={{ paddingLeft: "0.3rem" }}>{item.name} </span>
            </span>
            <i className={`bi-chevron-down ${Classes["toggle-btn"]}`}></i>
          </div>
          <div className={Classes["sidebar-content"]}>
            {item.children.map((child, index) => (
              <SidebarItem
                key={index}
                item={child}
                setSelectedItem={setSelectedItem}
                selected={selected}
              />
            ))}
          </div>
        </div>
      );
    } else {
      // var ico = MuiIcon[item.icon]
      return (
        <React.Fragment key={item.icon}>
          <Link
            href={item.path || "#"}
            onClick={(e) => this.handleItemClick(e, item)}
            className={`${Classes["sidebar-item"]} ${Classes.plain} ${
              selected === item.name ? Classes.selected : ""
            }`}
          >
            {React.createElement(MuiIcon[item.icon])}
            {/* {<MuiIcon.Home/>} */}
            
             {/* {ico} */}
            {/* <ico/> */}
{/* {item.icon} */}
            <span style={{ paddingLeft: "0.3rem" }}>{item.name} </span>
          </Link>
        </React.Fragment>
      );
    }
  }
}

export default SidebarItem;
