import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import { Spinner } from "react-bootstrap";
import Switch from "@mui/material/Switch";
import Tablenav from "../Comps/Tablenav";


var oldData = []
export default class CollegeAdmins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      clgList: [],
      isDataFound: false,
      isApiHitComplete: false,
      selectedCategory: [],
      username: localStorage.getItem("username"),
      statusAnchorEl: null,
      lastrecid: "-1",
      searchInput: "", // Search input
      approvalStatus: "",
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
        `/admin/verify-clg-admin?id=${clg._id}&s=${s}`,
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
    const urlData = window.location.search;
    const params = new URLSearchParams(urlData);
    this.setState({ isApiHitComplete: false, isDataFound: false });
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
        `/admin/leads?lid=${this.state.lastrecid}&type=5`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
      }
    ).then(async (res) => {
      // console.log(res)
      let response = await res.json();
      // console.log(response.data);
      if (response.data.length > 0) {
        this.setState({
          clgList: response.data.filter(
            (el) => params.get("ca") == el.verified
          ),
          isDataFound: true,
        });
      oldData=response.data.filter(
        (el) => params.get("ca") == el.verified
      )
      }
      this.setState({ isApiHitComplete: true });
    });
  }

  componentDidMount() {
    this.getAssetList();
  }
  handleSearchChange = (e) => {
    this.setState({searchInput:e.target.value})
    const searchTerm = e.target.value.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, 'i');

    if (e.target.value == '') {
      this.setState({ clgList: oldData })
      if (oldData.length > 0) {
          this.setState({ isDataFound: true })
      } else {
          this.setState({ isDataFound: false })
      }
  } else {
    const filteredData = oldData.filter(data =>
      searchKeyword.test(data.college_name.toLowerCase())||
      searchKeyword.test(data.name.toLowerCase())||
      searchKeyword.test(data.designation.toLowerCase())||
      searchKeyword.test(data.mobile.toLowerCase())||
      searchKeyword.test(data.email.toLowerCase())
  );

  if (filteredData.length > 0) {
      this.setState({ clgList: filteredData, isDataFound: true });
  } else {
      this.setState({ isDataFound: false });
  }
  }
  };
  render() {
    return (
      <>
      <Tablenav
          Actions={{
            Actions: (
              <input
            type="text"
            className="form-control"
            value={this.state.searchInput}
            placeholder="Search..."
            onChange={this.handleSearchChange}
          />
            ),
          }}
        />
        {this.state.isApiHitComplete ? (
          this.state.isDataFound ? (
            <table className={`table table-hover custom-table`}>
              <thead>
                <tr>
                <th style={{ background: "var(--primary)" }}>Verified</th>
                  <th style={{ background: "var(--primary)" }}>College name</th>
                  <th style={{ background: "var(--primary)" }}>Admin Name</th>
                  <th style={{ background: "var(--primary)" }}>Designation</th>
                  <th style={{ background: "var(--primary)" }}>Referrer</th>
                  <th style={{ background: "var(--primary)" }}>
                    Mobile Number
                  </th>
                  <th style={{ background: "var(--primary)" }}>
                    Email Address
                  </th>
                  <th style={{ background: "var(--primary)" }}>Date</th>

                </tr>
              </thead>
              <tbody>
                {this.state.clgList.reverse().map((clg, i) => {
                  return (
                    <tr key={i}>
                       <td>
                        <div>
              <img src={clg.verified?"/assets/images/verified.png":"/assets/images/notverified.png"} alt="img" width={35} height={35}/>
                          
                        </div>
                      </td>
                      <td>{clg.college_name}</td>
                      <td>{clg.name}</td>
                      <td>{clg.designation}</td>
                      <td>{clg.referrer}</td>
                      <td>{clg.mobile}</td>
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
