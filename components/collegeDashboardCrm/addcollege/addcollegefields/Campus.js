
import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import Loading from "/components/Comps/Loading";
import AddClgTopbar from "@/components/Comps/AddClgTopbar";

export default class Campus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      campusdesc: "",
      iscollegeListEmpty: false,
      hostalfee:"",
      selectedClg: '',
      isDataFound:false,
      isError:false
    };
  }

  handleApiHit(){
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/college/my-college?tab=3`, {
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
            campusdesc:response.data.campus_description,
            hostalfee:response.data.hostel_fees_structure,
            isDataFound: true,
          });
        }
      }
    });
  }

  componentDidMount() {
    this.handleApiHit()
  }

  handleCampus = (e) => {
    e.preventDefault();
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

    this.setState({ isLoading: true });
    var formData = new FormData();
    formData.append("college_id", this.state.selectedClg);
    formData.append("campus_description", this.state.campusdesc);
    formData.append("hostel_fees_structure", this.state.hostalfee);
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/college/my-college?tab=3", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ct")}`,
      },
      body: formData,
    })
      .then(async (response) => {
        // console.log(response);
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
            this.setState({ isLoading: false });
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    });
  };

  render() {
    const { collegeList } = this.props
    return (
      <>
      {!this.state.isError ? (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
        <form action="#" onSubmit={(e) => this.handleCampus(e)}>
     
          <div className="row">
            <div className="col-md-6">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Campus Description{" "}
                </label>
                <textarea
                  type="text"
                  rows={4}
                  disabled={this.state.isDataFound}

                  className="form-control"
                  placeholder="Enter Description"
                  value={this.state.campusdesc}
                  onChange={(e) =>
                    this.setState({ campusdesc: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                  Hostel Fees Structure{" "}
                </label>
                <textarea
                  type="text"
                  rows={4}
                  disabled={this.state.isDataFound}
                  className="form-control"
                  placeholder="Enter Description"
                  value={this.state.hostalfee}
                  onChange={(e) =>
                    this.setState({ hostalfee: e.target.value })
                  }
                />
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
        {
          <Loading
            show={this.state.isLoading}
            onHide={() => this.setState({ isLoading: false })}
          />
        }
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
