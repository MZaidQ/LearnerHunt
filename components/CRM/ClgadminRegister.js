import React,{useState,useEffect} from 'react'
import { Form, Button, Modal, Row, Col, Spinner } from "react-bootstrap";
import Classes from "/styles/searchmodal.module.css";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import CTA from "/components/Comps/CTA";

export default function ClgadminRegister() {
      // college signup
  const [clgname, setClgName] = useState(""); // Add state for name
  const [adminname, setAdminName] = useState(""); // Add state for name
  const [signupemail, setSignupEmail] = useState("");
  const [clgmobile, setClgMobile] = useState(""); // Add state for mobile
  const [designation, setDesignation] = useState(""); // Add state for mobile
  const [referrer, setReferrer] = useState(""); // Add state for mobile
  const [linkedIn, setLinkedIn] = useState(""); // Add state for mobile

//   search modal
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isApiHitComplete, setIsApiHitComplete] = useState(true);
  const [results, setResults] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const handleClgMobileChange = (event) => {
    const input = event.target.value;

    // Remove any non-numeric characters
    const numericInput = input.replace(/\D/g, "");

    // Limit to 10 characters
    const limitedInput = numericInput.slice(0, 10);

    setClgMobile(limitedInput);
  };
  useEffect(() => {
    let timeoutId;
    const fetchSearchResults = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT +
          "/miscellaneous/global-search?term=" +
          searchTerm
      );
      const data = await response.json();
      var rs = data.data.filter((s) => s.type == "college");
      // console.log(data);
    //   if(role == 1){
        if (rs.length == 0) {
          rs = [{ title: "+ Add New", slug: "", type: "-1" }];
        }
    //   }
      
      setResults(rs);
      setIsApiHitComplete(true);
    };

    if (searchTerm.trim().length > 2) {
      setIsApiHitComplete(false);
      timeoutId = setTimeout(fetchSearchResults, 500);
    } else {
      setResults([]);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);
  const onClgselect = (clg) => {
    if (clg.type == "-1") {
      setClgName(searchTerm);
    } else setClgName(clg.title);
    setIsSearchModalOpen(false);
  };
  const handleStudentSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
  fd.append("college_name", clgname); 
  fd.append("name", adminname);
  fd.append("email", signupemail); 
  fd.append("mobile", clgmobile); 
  fd.append("designation", designation);
  fd.append("linked_in_link", linkedIn); 
  fd.append("referrer", referrer);
  setIsloading(true)
  fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/create-clg-admin",
    {
      
      method: "POST",
      body: fd,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      }
    }
  ).then(async (response) => {
    var res = await response.json();
    // console.log(res.message)
    if (response.ok) {
      // console.log("hello", response.data);
      Swal.fire({
        title: "Success",
        html: `${res.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        setClgName('')
        setSignupEmail('')
       setAdminName('')
        setClgMobile('')
        setDesignation('')
        setReferrer('')
        setLinkedIn('')
        setSearchTerm('')
      });
    }else{
        Swal.fire({
            title: "Error",
            html: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          })
    }
  setIsloading(false)

})
  }
  return (
    <div className='container pt-5'>

          <Form
                onSubmit={handleStudentSubmit}
              >
    <div className='row'>

                <div className='col-md-6'>
           <Form.Group controlId="clgname">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            College Name <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) =>  (
          <TextField
            {...params}
            placeholder="Enter a College Name"
            size='small' margin="dense" 
            value={clgname}
            onChange={(e) => setClgName(e.target.value)}
            required
            style={{ marginBottom: "15px" }}
          />
        )}
      /> */}
                          <Form.Control
                            type="text"
                            placeholder="Enter your College Name"
                            value={clgname}
                            onChange={(e) => setClgName(e.target.value)}
                            onClick={() => setIsSearchModalOpen(true)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        </div>
                <div className='col-md-6'>
                        <Form.Group controlId="adminname">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Admin Name <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your Admin Name"
                            value={adminname}
                            onChange={(e) => setAdminName(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        </div>
                        <div className='col-md-6'>
                        <Form.Group controlId="clgemail">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Email <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={signupemail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        </div>
                        <div className='col-md-6'>
                        <Form.Group controlId="mobile">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Mobile <span style={{color:'red'}}>*</span>
                          </Form.Label> 
                          <Form.Control
                            type="number"
                            placeholder="Enter your mobile number"
                            value={clgmobile}
                            onChange={handleClgMobileChange}
                            required
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group>
                        </div>
                        {/* <Form.Group controlId="Landline Number">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Landline Number
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter your Landline number"
                            value={clgLandline}
                            onChange={handleClgLandlineChange}
                            required
                            style={{ marginBottom: "15px" }}
                            min="0"
                          />
                        </Form.Group> */}
                        <div className='col-md-6'>
                        <Form.Group controlId="designation">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Designation <span style={{color:'red'}}>*</span>
                          </Form.Label>
                          <Form.Control
                            as="select" // Use select element for dropdown
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            style={{ marginBottom: "15px" }}
                          >
                            <option value="">Select Designation</option>
                            <option value="Chairman">Chairman</option>
                            <option value="Director">Director</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Other">Other</option>
                          </Form.Control>
                        </Form.Group>
                        </div>
                        <div className='col-md-6'>
                        <Form.Group controlId="referrer">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Referrer
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Referrer"
                            value={referrer}
                            onChange={(e) => setReferrer(e.target.value)}
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        </div>
                        <div className='col-md-6'>
                        <Form.Group controlId="LinkedIn">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            LinkedIn Link
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your LinkedIn Link"
                            value={linkedIn}
                            onChange={(e) => setLinkedIn(e.target.value)}
                            style={{ marginBottom: "15px" }}
                          />
                        </Form.Group>
                        </div>
                        <div className="col-md-12">
                <CTA title="Create" />
              </div>
                        {/* <div className='col-md-6'></div>
                        <div className='col-md-5'></div>

                        <div className='col-md-2'>
                        <Button
                    // className="w-100"
                    style={{ background: "#0151c1" }}
                    type="submit"
                    disabled={isloading}
                  >
                    {isloading?
                    <>Please Wait...
                          <CircularProgress
                            style={{ marginLeft: "1rem" }}
                            color="inherit"
                          />
                          </>:"Submit"}
                  </Button>
                        </div>
                        <div className='col-md-5'></div> */}
                        
                        </div>

                        </Form>
                        <Modal
        className={Classes["custom-search-modal"]}
        size="md"
        style={{ background: "rgba(0,0,0,0.6)" }}
        centered
        show={isSearchModalOpen}
        onHide={() => setIsSearchModalOpen(false)}
      >
        <Modal.Header closeButton>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search colleges"
            className="form-control"
          />
        </Modal.Header>
        <Modal.Body style={{ padding: "0" }}>
          <div className={Classes["results"]}>
            {searchTerm.trim().length > 2 ? (
              isApiHitComplete ? (
                results.length > 0 ? (
                  results.map((el) => {
                    return (
                      <div
                        className={Classes["college"]}
                        onClick={() => onClgselect(el)}
                      >
                        <span>{el.title}</span>
                      </div>
                    );
                  })
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "100%", height: "inherit" }}
                  >
                    <span>No record</span>
                  </div>
                )
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "100%", height: "inherit", padding: "1rem" }}
                >
                  <Spinner variant="outlined" />
                </div>
              )
            ) : (
              <div className={Classes["trending-searches"]}>
                <br />
                <br />
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
