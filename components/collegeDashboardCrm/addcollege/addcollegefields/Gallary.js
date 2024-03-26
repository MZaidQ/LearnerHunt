import React, { Component } from "react";
import Classes from "/styles/gernal.module.css";
import CTA from "/components/Comps/CTA";
import Swal from "sweetalert2";
import Loading from "/components/Comps/Loading";
import Button from "@mui/material/Button";
import AddClgTopbar from "@/components/Comps/AddClgTopbar";
import styles from "/styles/studentProfile.module.css";

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
      isError:false
      
    };
  }

  handleApiHit(){
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/college/my-college?tab=9`, {
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
            imageLogo: response.data.logo_img_path,
            imageSquare: response.data.square_img_path,
            imageBanner: response.data.banner_img_path,
            isDataFound: true,
          });
        }
      }
    });
  }

  componentDidMount() {
  this.handleApiHit()
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
      const { imageLogo, imageSquare, imageBanner, selectedClg } = this.state;
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
      // fd.append("college_id", selectedClg);
      fd.append("logo_img_path", this.state.imgLogo);
      fd.append("square_img_path", this.state.imgSquare);
      fd.append("banner_img_path", this.state.imgBanner);
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/college/my-college?tab=9", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("ct")}`
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
              this.handleApiHit()
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
      console.error(error);
    }
  }
})
  };

  render() {
    return (
      <>

      {!this.state.isError ? (
      <div className={Classes["add-user"]}>
        <div className={Classes["form-div"]}>
          <form action="#" onSubmit={(e) => this.handleGallaryoff(e)}>
     
      <div>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="upload-logo">
                    <Button disabled={this.state.isDataFound} variant="contained" component="span" >
                      Upload Logo Image
                    </Button>
                    <input
                      id="upload-logo"
                      disabled={this.state.isDataFound}
                      hidden
                      required
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
                    <Button disabled={this.state.isDataFound} variant="contained" component="span">
                      Upload Square Image
                    </Button>
                    <input
                      id="upload-square"
                      hidden
                      accept="image/*"
                      disabled={this.state.isDataFound}
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
                    <Button disabled={this.state.isDataFound} variant="contained" component="span">
                      Upload Banner Image
                    </Button>
                    <input
                      id="upload-banner"
                      hidden
                      disabled={this.state.isDataFound}
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
