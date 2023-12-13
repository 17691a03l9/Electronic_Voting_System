/* eslint-disable jsx-a11y/alt-text */

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import logo from "../Assests/Logo4.png";

const HomePage = () => {
  useEffect(() => {
    sessionStorage.removeItem("LoginID");
  }, []);
  return (
    <div
      style={{
        // background: "linear-gradient(0.92turn, #155017 40%, #ebf8e1 50% , #FEA41C 60% )",
        backgroundImage:
          "linear-gradient(0.95turn, #155017 20%, white 60%, #FEA41C)",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
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
                  marginRight: "20%",
                  marginLeft: "20%",
                  height: "130%",
                  borderRadius: "50px",
                }}
              >
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      variant="h4"
                      style={{
                        color: "orange",
                        position: "relative",
                        top: "30%",
                        left: "10%",
                      }}
                    >
                      E - Voting
                    </Typography>
                    <Typography
                      variant="p"
                      style={{
                        color: "#618715",
                        position: "relative",
                        top: "38%",
                        left: "10%",
                      }}
                    >
                      Online voting refers to online elections or online voting
                      on resolutions/motions. With an online ballot you can vote
                      for people or on questions and open decisions.
                    </Typography>
                    <Button
                      style={{
                        background: "#155017",
                        width: "35%",
                        fontSize: "15px",
                        position: "relative",
                        top: "52%",
                        left: "10%",
                        color: "white",

                        borderRadius: "20px",
                      }}
                      component={Link}
                      to="/Home"
                    >
                      Login
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
                      src={logo}
                      style={{
                        height: "50vh",
                        width: "80%",
                        position: "relative",
                        top: "25%",
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomePage;
