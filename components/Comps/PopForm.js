import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import axios from "axios";
const PopForm = () => {
  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    course: "",
    qualification: "",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    mobileError: "",
    emailError: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const  resp = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/miscellaneous/testeligibility`)
    // const data = await resp.json()
    // console.log(data)
    fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/miscellaneous/testeligibility`
    ).then(async (res) => {
      setData(await res.json());
    });

    const timer = setTimeout(() => {
      setShowModal(true);

    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name,value)
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [`${name}Error`]: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const { name, mobile, email } = formData;
    // Validate name
    if (name.trim() === "") {
      setErrors({
        ...errors,
        nameError: "Name cannot be empty",
      });
      valid = false;
    }

    // Validate mobile number
    if (mobile.trim() === "" || mobile.length !== 10 || isNaN(mobile)) {
      setErrors({
        ...errors,
        mobileError: "Enter a valid 10-digit mobile number",
      });
      valid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({
        ...errors,
        emailError: "Enter a valid email address",
      });
      valid = false;
    }

    return valid;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const { name, mobile, email, course, qualification } = formData;
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("mobile", mobile);
      fd.append("course", course);
      fd.append("qualification", qualification);
  
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/student/save-modal-leads",
          {
            method: "POST",
            body: fd,
          }
        );
  
        if (!response.ok) {
          // Handle non-OK responses here
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || "Server responded with an error.");
          } else {
            // Handle non-JSON error responses (possibly HTML)
            throw new Error("Server responded with a non-JSON error.");
          }
        }
      
        const res = await response.json();
        // console.log(res); // Log the response data
        // Handle successful response here
        alert(res.message);
        closeModal()
      } catch (error) {
        alert(error.message || "An error occurred while processing the request.");
        setIsLoading(false);

      }
    }
  };
  
  const checkValue = (value) => {
    return value != undefined && value != null && value != "";
  };
  return (
    <div>
      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        centered ='true'
        
        
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            // boxShadow: 24,
            p: 3,
          }}
        >
          <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: 'absolute',
            top: "1rem",
            right: "1rem",
          }}
        >
          <CloseIcon />
        </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Scholarship upto 75%*
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Get Admission in Your Dream College/University
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Check Your Eligibility
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              sx={{ mt: 2 }}
              className="form-input"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={Boolean(errors.nameError)}
              helperText={errors.nameError}
            />
            <TextField
              label="Mobile No."
              fullWidth
              className="form-input"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              sx={{ mt: 2 }}
              error={Boolean(errors.mobileError)}
              helperText={errors.mobileError}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 10,
              }}
            />
            <TextField
              label="Email ID"
              fullWidth
              className="form-input"
              name="email"
              value={formData.email}
              sx={{ mt: 2 }}
              onChange={handleInputChange}
              error={Boolean(errors.emailError)}
              helperText={errors.emailError}
            />

            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel>Courses</InputLabel>
              <Select
                value={formData.course}
                onChange={handleInputChange}
                name="course"
                label="Course"
              >
                <MenuItem value="" disabled>
                  <em>Select</em>
                </MenuItem>
                {checkValue(data.courses) && data.courses.map((c, i) => (
                  <MenuItem key={i} value={c.course}>
                    {c.course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formData.course != "" &&
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel>Qualification</InputLabel>
              <Select
                value={formData.qualification}
                onChange={handleInputChange}
                label="Qualification"
                name="qualification"

              >
                <MenuItem value="" disabled>
                  <em>Select</em>
                </MenuItem>
                {checkValue(data.courses) && data.courses
                    .find((c) =>c.course == formData.course)
                    .qualification.map((q, i) => {
                      return (
                        <MenuItem key={i} value={q}>
                          {q}
                        </MenuItem>
                      );
                    })
                    }
              </Select>
            </FormControl>
            }

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              type="submit"
              className="submit-button"
              disabled={isLoading?true:false}
            >
              {isLoading ? "Wait..." : "Submit"}
            </Button>
          </form>
        </Box>
      </Modal>
      {/* Rest of your website content */}
    </div>
  );
};

export default PopForm;
