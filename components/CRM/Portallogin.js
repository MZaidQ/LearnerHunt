/* eslint-disable prettier/prettier */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";

const theme = createTheme();

export default function SignIn(props) {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, password } = formData;

    // Check if email is empty
    if (!name) {
      setErrorMsg("Please enter your email.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(name)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    // Check if password is empty
    if (!password) {
      setErrorMsg("Please enter your password.");
      return;
    }
    try {
      setIsLoading(true);
      const fd = new FormData();
      fd.append("email", formData.name);
      fd.append("password", formData.password);
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/login", {
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
            props.onLogin(res.data.token,res.data.role,formData.name);
            setIsLoading(true);
          });
        } else {
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
          setIsLoading(false);
        }
      });
    } catch (error) {
      // Handle network or fetch error
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              label="Email"
              id="email"
              name="name"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <FormControl
              sx={{ my: 2, width: "100%" }}
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
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button
              disabled={isLoading}
              className="bg-blue-500"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? (
                <>
                <span>Please Wait...</span><Spinner animation="border" role="status"/></>
              ) : (
                "Sign In"
              )}
            </Button>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
