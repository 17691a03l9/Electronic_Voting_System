/* eslint-disable jsx-a11y/alt-text */

import "react-toastify/dist/ReactToastify.css";

import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import logo from "../Assests/logo.webp";
import vote from "../Assests/vote.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    sessionStorage.removeItem('LoginID')
    axios.get(`http://localhost:8060/api/users`).then((res) => {
      setUserData(res.data);
    });
  }, []);
  console.log(userData);
  const page = useNavigate();
  const showToast = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const SubmitHandler = (e) => {
    e.preventDefault();

    let isValidUser = false;

    userData?.forEach((user) => {
      if (
        user?.email_id === email &&
        user?.password === password &&
        user?.user_type === 2
      ) {
        isValidUser = true;
        showToast("success", "success");
        axios.post(`http://localhost:8060/api/users/otp`, { id: user?.id });
        sessionStorage.setItem("LoginID", user?.id);

        setTimeout(() => {
          page("/OTP");
        }, 5000);
      } else if (
        user?.email_id === email &&
        user?.password === password &&
        user?.candidate === 1
      ) {
        isValidUser = true;
        showToast("success", "success");
        sessionStorage.setItem("LoginID", user?.id);
        setTimeout(() => {
          axios.post(`http://localhost:8060/api/users/otp`, { id: user?.id });
          page("/OTP");
        }, 5000);
      }
    });

    if (!isValidUser) {
      showToast("Invalid username or password", "error");
    }
  };
  // sessionStorage.setItem("LoginID", "qqqqqqqqqqqqqqq");

  return (
    <Grid container>
      <Grid item xs={6}>
        <Paper>
          <img
            src={vote}
            style={{ height: "100vh", width: "100%" }}
            alt="User"
          />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
          >
            <img
              src={logo}
              width="300px"
              style={{ borderRadius: "20px", marginBottom: "50px" }}
            />

            <Box width="60%">
              <TextField
                label="Enter Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Enter Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                  marginLeft:"85%",
                }}
                component={Link}
                to="/User"
              >
                <Button>User</Button>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "5px",
                  marginLeft:"80%",
                  
                }}
                component={Link}
                to="/Candidate"
              >
                <Button>Candidate</Button>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "30px",
                  gap: "40%",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    background:
                    "linear-gradient(to left, #4157A1 , #41ADCE)",
                    width: "40%",
                    color: "white",
                    borderRadius: "20px",
                    marginLeft: "30%",
                  }}
                  onClick={SubmitHandler}
                >
                  Login
                </Button>
              </Grid>
              <ToastContainer />
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
