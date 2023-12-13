/* eslint-disable jsx-a11y/alt-text */

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import DateRangeIcon from "@mui/icons-material/DateRange";
import EmailIcon from "@mui/icons-material/Email";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Person2Icon from "@mui/icons-material/Person2";
import axios from "axios";
import candidate from "../Assests/Political Candidate Registration 1.svg";
import candidates from "../Assests/candidate.jpg";
import { useNavigate } from "react-router-dom";

const CandidateRegistration = () => {
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email_id, setEmail_id] = useState("");
  const [voter_id, setVoter_id] = useState("");
  const [dob, setDob] = useState("");
  const [dobchange, setDobChange] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [voterIdError, setVoterIdError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [ageError, setAgeError] = useState("");
  // const [candidate, setCandidate] = useState("");

  const page = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    let isFormValid = true;

    // Validate username
    if (username.length < 6) {
      setUsernameError("Username must be at least 6 characters long");
      isFormValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setUsernameError("Username should only contain alphanumeric characters");
      isFormValid = false;
    } else {
      setUsernameError("");
    }

    // Validate password
    if (password.length < 8) {
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
    if (!email_id.match(emailPattern)) {
      setEmailError("Invalid email");
      isFormValid = false;
    } else {
      setEmailError("");
    }

    // Validate Voter ID
    const voterIdPattern = /^[A-Z]{3}\d{7}$/;
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

    // If the form is valid, send the data to the server
    if (isFormValid) {
      axios.post(`http://localhost:8060/api/users`, {
        username,
        password,
        fullname,
        voter_id,
        email_id,
        dob,
        candidate: 1,
      });
      page("/Home");
    } else {
      console.error("Error submitting form:");
    }
    // var segment_str = window.location.href;
    //  var segment_array = segment_str.split( '/' );
    //  var last_segment = segment_array.pop();
    //  document.write(last_segment);
    //   console.log(last_segment,"nikhil")
  };
  
    // Function to calculate age based on date of birth
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
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      px={2}
    >
      <Grid container>
        <Grid
          container
          spacing={2}
          className="candidate_reg"
        >
          <Grid item xs={12}>
            <Paper
              elevation={3}
              className="candidate_paper"
              // style={{ padding: "30px", marginRight: "10%", marginLeft: "10%" }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    variant="h5"
                    className="candidate_header"
                  >
                    Candidate Registration
                  </Typography>
                  <Grid
                    item
                    xs={12}
                    className="candidate_name"
                  >
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person2Icon />
                          </InputAdornment>
                        ),
                      }}
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PermIdentityIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                  </Grid>

                  <Grid
                    item
                    xs={12}
                    className="candidate_mail"
                  >
                    <TextField
                      label="Enter Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={email_id}
                      onChange={(e) => setEmail_id(e.target.value)}
                      error={emailError !== ""}
                      helperText={emailError}
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
                      error={passwordError !== ""}
                      helperText={passwordError}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EnhancedEncryptionIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <TextField
                    label="Enter Date Of Birth"
                      type="date"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={dob}
                      helperText={dobError}
                      error={dobError !== ""}
                      // eslint-disable-next-line no-unused-expressions
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
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    className="candidate_voterId"
                  >
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HowToVoteIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* <TextField name="candidate" hidden /> */}
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    // className="candidate_subbutton"
                    style={{
                      color: "black",
                      background: "linear-gradient(to left, #4157A1 , #41ADCE)",
                      width: "40%",
                      marginTop: "20px",
                      marginLeft: "60%",
                      color: "white",
                      borderRadius: "20px",
                    }}
                    onClick={submitHandler}
                    disabled={age<18}
                  >
                    submit
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={candidate} style={{ height: "60vh" }} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateRegistration;
