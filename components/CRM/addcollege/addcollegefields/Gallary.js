import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import Loading from "/components/Comps/Loading";
import YearList from "@/components/Comps/YearList";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import AddClgTopbar from "@/components/Comps/AddClgTopbar";

export default class Gallary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedClg: "",
      imageLogo: null,
      imageSquare: null,
      imageBanner: null,
      imgLogo:"",
      imgSquare:"",
      imgBanner:"",
      iscollegeListEmpty: false,
      
    };
  }

  handleFileUpload = (event, imageType) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({ [imageType]: reader.result});
    };

    reader.readAsDataURL(file);
  };

  handleGallaryoff = (e) => {
    e.preventDefault();
      // Now you can access the image data in this.state.imageLogo, this.state.imageSquare, and this.state.imageBanner
      const { imageLogo, imageSquare, imageBanner, selectedClg } = this.state;
    //   console.log(imageLogo, imageBanner, imageSquare, selectedClg);
      // Add your logic to handle the uploaded images and selected college here
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
    try {
      const fd = new FormData();
      fd.append("college_id", selectedClg);
      fd.append("logo_img_path", this.state.imgLogo);
      fd.append("square_img_path", this.state.imgSquare);
      fd.append("banner_img_path", this.state.imgBanner);
    



      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/add-college-gallery", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("pt")}`
        },
        method: "POST",
        body: fd,
      }).then(async (response) => {
        var res = await response.json()
        // console.log(res)
        // console.log(res.message)
        // console.log(res.error)
        this.setState({isLoading:false})
        
     
        if (response.ok) {
           
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              this.setState({selectedClg:"",imgLogo:"",imgSquare:"",imgBanner:""},()=>this.props.onSuccess())
          
            });
          } else {
           
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            }).then(() => {
              this.setState({isLoading:false})
            });
          }
      });

    } catch (error) {
      // Handle network or fetch error
      console.error(error);
    }
  }
})

  };

  render() {
    const { collegeList } = this.props;

    return (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
          <form action="#" onSubmit={(e) => this.handleGallaryoff(e)}>
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
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="upload-logo">
                    <Button variant="contained" component="span" >
                      Upload Logo Image
                    </Button>
                    <input
                      id="upload-logo"
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => this.setState({imgLogo:e.target.files[0]},()=> this.handleFileUpload(e, "imageLogo"))}
                    />
                  </label>
                  {this.state.imageLogo && (
                    <div
                      style={{
                        height: "250px",
                        width: "100%",
                        display: "flex",
                        border: "1px solid lightgray",
                        margin: "2rem 0",
                      }}
                    >
                      <img
                        src={this.state.imageLogo}
                        alt="Uploaded Logo"
                        style={{ objectFit: "contain", width: "100%" }}
                      />
                    </div>
                  )}
                </div>
                <div className="col-md-4">
                  <label htmlFor="upload-square">
                    <Button variant="contained" component="span">
                      Upload Square Image
                    </Button>
                    <input
                      id="upload-square"
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => this.setState({imgSquare:e.target.files[0]},()=> this.handleFileUpload(e, "imageSquare"))}
                    />
                  </label>
                  {this.state.imageSquare && (
                    <div
                      style={{
                        height: "250px",
                        width: "100%",
                        display: "flex",
                        border: "1px solid lightgray",
                        margin: "2rem 0",
                      }}
                    >
                      <img
                        src={this.state.imageSquare}
                        alt="Uploaded Square Image"
                        style={{ objectFit: "contain", width: "100%" }}
                      />
                    </div>
                  )}
                </div>
                <div className="col-md-4">
                  <label htmlFor="upload-banner">
                    <Button variant="contained" component="span">
                      Upload Banner Image
                    </Button>
                    <input
                      id="upload-banner"
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => this.setState({imgBanner:e.target.files[0]},()=> this.handleFileUpload(e, "imageBanner"))}
                    />
                  </label>
                  {this.state.imageBanner && (
                    <div
                      style={{
                        height: "250px",
                        width: "100%",
                        display: "flex",
                        border: "1px solid lightgray",
                        margin: "2rem 0",
                      }}
                    >
                      <img
                        src={this.state.imageBanner}
                        alt="Uploaded Banner Image"
                        style={{ objectFit: "contain", width: "100%" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <CTA title="Create" />
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
        {
          <Loading
            show={this.state.isLoading}
            onHide={() => this.setState({ isLoading: false })}
          />
        }
      </div>
    );
  }
}
