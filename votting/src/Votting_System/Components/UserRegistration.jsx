import { Box, Button, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import DateRangeIcon from "@mui/icons-material/DateRange";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import axios from "axios";
import register from "../Assests/reister.png"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userImg from "../Assests/userImage.jpg";

const UserRegistration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email_id, setEmail] = useState("");
  const [voter_id, setVoter_id] = useState("");
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [voterIdError, setVoterIdError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [age, setAge] = useState();
  const [dobError, setDobError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [dobchange, setDobChange] = useState(false);
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Update age when date of birth changes
  const handleDateOfBirthChange = (e) => {
    const dobValue = e.target.value;
    setDob(dobValue);
    setDobChange(true);

    // Calculate age and update state
    const ageValue = calculateAge(dobValue);
    setAge(ageValue);

    // Validate age
    if (ageValue < 18) {
      setAgeError("The age should be above 18");
    } else {
      setAgeError("");
    }
  };
  const page = useNavigate();
  const SubmitHandler = (e) => {
    e.preventDefault();
    let isFormValid = true;

    // Validate username
    if (username.length === 0) {
      setUsernameError("*Username is required");
      isFormValid = false;
    }  if (username.length < 6) {
      setUsernameError("Username must be at least 6 characters long");
      isFormValid = false;
    }  else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setUsernameError("Username should only contain alphanumeric characters");
      isFormValid = false;
    } else {
      setUsernameError("");
    }

    // Validate password
    if(password.length === 0){
      setPasswordError("*Password is required");
      isFormValid = false;
    }
    else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isFormValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
        password
      )
    ) {
      setPasswordError(
        "Password should include at least one lowercase letter, one uppercase letter, one number, and one special character"
      );
      isFormValid = false;
    } else {
      setPasswordError("");
    }
    // Email validate
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email_id.length === 0) {
      setEmailError("*Email is required");
      isFormValid = false;
    }
    else if (!email_id.match(emailPattern)) {
      setEmailError("Invalid email");
      isFormValid = false;
    } else {
      setEmailError("");
    }
    if (!age) {
      setAgeError("Age is required");
      isFormValid = false;
    } else {
      setAgeError("");
    }
    if (!dobchange) {
      setDobError("Date Of Birth is required");
      isFormValid = false;
    } else {
      setDobError("");
    }
    // Validate Voter ID
    const voterIdPattern = /^[A-Z]{3}\d{7}$/;
    if (voter_id.length===0) {
      setVoterIdError("*Voter ID is Required");
      isFormValid = false;
    } 
    if (!voter_id.match(voterIdPattern)) {
      setVoterIdError("Voter ID should have the format: ABC1234567");
      isFormValid = false;
    } else {
      setVoterIdError("");
    }
    // Validate Fullname
    if (fullname.trim() === "") {
      setFullnameError("Fullname is required");
      isFormValid = false;
    } else {
      setFullnameError("");
    }
    // If the form is valid, send the data to the server
    if (isFormValid) {
      // axios.post(`http://localhost:8060/api/users`, {
      //   username,
      //   password,
      //   fullname,
      //   voter_id,
      //   email_id,
      //   dob,
      // });
      page("/Home");
    } else {
      console.error("Error submitting form:");
    }
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Paper>
          <img
            src={register}
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
            <Grid item xs={12}>
              <Paper
                elevation={3}
                style={{
                  padding: "20px",
                  marginLeft: "20%",
                  marginRight: "10%",

                }}
              >
                <Typography
                  variant="h5"
                  style={{ marginBottom: "20px", fontWeight: "bold" }}
                >
                  User Registration
                </Typography>
                <Box width="80%">
                  <TextField
                    label="Enter Username"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={usernameError !== ""}
                    helperText={usernameError}
                  />
                  <TextField
                    label="Enter Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email_id}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError !== ""}
                    helperText={emailError}
                  />
                  <TextField
                    label="Enter fulName"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    error={fullnameError !== ""}
                    helperText={fullnameError}
                  />
                  <TextField
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={dob}
                    helperText={dobError}
                    error={dobError !== ""}
                    onChange={(e) => handleDateOfBirthChange(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                    />
                           <TextField
                      label="Enter Age"
                      type="number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={age}
                      error={ageError !== ""}
                      helperText={ageError}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PermIdentityIcon />
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
                    error={passwordError !== ""}
                    helperText={passwordError}
                  />
                  <TextField
                    label="Enter VoterId"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={voter_id}
                    onChange={(e) => setVoter_id(e.target.value)}
                    error={voterIdError !== ""}
                    helperText={voterIdError}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      background:
                      "linear-gradient(to left, #4157A1 , #41ADCE)",
                      width: "100%",
                      marginTop: "20px",
                      color: "white",
                      borderRadius: "20px",
                    }}
                    onClick={SubmitHandler}
                  >
                    Submit
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserRegistration;
