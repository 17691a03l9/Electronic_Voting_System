/* eslint-disable jsx-a11y/alt-text */

import "react-toastify/dist/ReactToastify.css";

import { Box, Button, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import checkmarkWarning from "../Assests/warning_icon.svg"
import enterOTP from "../Assests/Enter OTP.png"
import otp1 from "../Assests/OTP1.png";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [otpData, setOtpData] = useState([]);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [candidateNameData, setCandidateNameData] = useState([]);
  const [storeCandidateID, setStoreCandidateID] = useState(
    sessionStorage.getItem("LoginID")
  );
    
  useEffect(() => {
    axios.get(`http://localhost:8060/api/users`).then((res) => {
      setOtpData(res.data);
      let a=res.data
      a.forEach((x)=>{
        if(x.id==storeCandidateID){
          setOtp(x.otp)
        }
      })
    });
  }, []);
  const page = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-lone-blocks
    {
      otpData.forEach((e) => {
        if (e.otp == otp && e.id == storeCandidateID) {
          if (e.user_type === 2) {
            page("/Voting");
            // alert("2");
          } else if (e.candidate === 1) {
            page("/Nomination");
            // alert("1");
          }
        } else{
          setShowErrorPopup(true)
        }
      });
    }
  };
  const handleCloseErrorpopup = () =>{
    setShowErrorPopup(false)
  }
  console.log(otpData);
  console.log(storeCandidateID);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
      px={2}
    >
      <Grid container>
        <Grid
          container
          spacing={2}
          style={{ minHeight: "50vh", marginTop: "1px" }}
        >
          <Grid item xs={12}>
            <Paper
              elevation={3}
              style={{
                padding: "10px",
                marginRight: "15%",
                marginLeft: "15%",
                marginTop: "20px",
                borderRadius: "40px",
                height: "130%",
                border: "1px solid black",
                background: "#252525",
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    variant="h5"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: "30%",
                    }}
                  >
                    OTP Authentication
                  </Typography>
                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "25%",
                      width:"80%"
                    }}
                  >
                    <TextField
                      label="Enter OTP"
                      type="text"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      InputProps={{
                        style: {
                          borderColor: "white",
                          border: "1px solid white",
                          color: "white",
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "white",
                        },
                      }}
                    />
                  </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      color: "black",
                      fontSize: "15px",
                      fontWeight: "bold",
                      background: "white",
                      border: "1px solid white",
                      width: "50%",
                      marginTop: "20px",
                      marginLeft: "25%",
                    }}
                    onClick={submitHandler}
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
                  <img
                    src={enterOTP}
                    style={{
                      height: "55vh",
                      position: "relative",
                      top: "20%",
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {showErrorPopup && (
        <Modal
          open={showErrorPopup}
          onClose={handleCloseErrorpopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkWarning} className="successImg modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h2">
            Invalid OTP
          </Typography>
            <Typography id="modal-modal-description" className="modal-modal-description">
              Please Enter valid otp
            </Typography>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleCloseErrorpopup}>
              Okay
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default OtpPage;
