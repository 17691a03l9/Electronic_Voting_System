/* eslint-disable jsx-a11y/alt-text */

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import image from "../Assests/politics image.jpg";
import logo1 from "../Assests/logo1.jpg";

const NominationsPage = () => {
  const [election, setElection] = useState("");
  const [partyName, setPartyName] = useState("");
  const [partySymbol, setPartySymbol] = useState("");
  const [partySymbolData, setPartySymbolData] = useState([]);
  const [electionData, setElectionData] = useState([]);
  const [candidateNameData, setCandidateNameData] = useState([]);
  const [storeCandidateID, setStoreCandidateID] = useState(
    sessionStorage.getItem("LoginID")
  );
  const [storeCandidateData, setStoreCandidateData] = useState([]);

  useEffect(() => {
    // if(sessionStorage.getItem("LoginID")){
    //   setStoreCandidateID(sessionStorage.getItem("LoginID"))
    // }
    axios.get(`http://localhost:8060/api/party`).then((res) => {
      setPartySymbolData(res.data);
    });
    axios.get(`http://localhost:8060/api/election`).then((res) => {
      setElectionData(res.data);
    });
    axios.get(`http://localhost:8060/api/users`).then((res) => {
      var a = res.data;

      a.forEach((x) => {
        if (x.id == storeCandidateID) {
          setStoreCandidateData([x]);
        }
      });
      setCandidateNameData(a);
      // setCandidateNameData(res.data)
    });
  }, []);
  console.log(candidateNameData);
  console.log(partySymbolData);
  console.log(electionData);
  // console.log(candidateNameData);
  // console.log(storeCandidateID,"id");
  const submitHandler = (e) => {
    e.preventDefault();
    var electionId = "";
    electionData.forEach((r) => {
      if (r.election_name == election) {
        electionId = r.id;
      }
    });
    var partId = "";
    partySymbolData.forEach((r) => {
      if (r.party_name == partyName) {
        partId = r.id;
      }
    });
    let a = {
      candidate_id: storeCandidateID,
      election_id: electionId,
      party_id: partId,
    };
    axios.post(`http://localhost:8060/api/nominations/insert`, a);
  };
  const partyChangeHandle = (e) => {
    setPartyName(e.target.value);
  };
  useEffect(() => {
    if (partyName) {
      partySymbolData.forEach((x) => {
        if (x.party_name == partyName) {
          setPartySymbol(x.party_symbol);
        }
      });
    }
  }, [partyName]);
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <img src={image} style={{ height: "70vh", width: "100%" }} />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            style={{
              textAlign: "center",
              color: "black",
            }}
          >
            <Typography
              variant="h3"
              style={{ fontWeight: "bold", margin: "5% 0% 3% 0%",     color: "rgb(227 117 147)" }}
            >
              Nomination and Party List
            </Typography>
            <Typography
              variant="p"
              style={{ fontSize: "16px", lineHeight: "1.6", color: "grey" }}
            >
              A nomination is an official suggestion of someone as a candidate
              in an election or for a job. ...his candidacy for the Republican
              presidential nomination. ...a list of nominations for senior
              lectureships. A political party is an organization that
              coordinates candidates to compete in a particular country's
              elections. It is common for the members of a party to hold similar
              ideas about politics, and parties may promote specific ideological
              or policy goals.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "5% 0% 2% 0%",
            }}
          >
            <img src={logo1} width="20%" />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            style={{
              textAlign: "center",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "30%",
              marginRight: "30%",
              marginTop: "10px",
            }}
          >
            <TextField
              // label="Enter Candidate Name"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={storeCandidateData[0]?.username}
              disabled
            />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="party-label">Select Election</InputLabel>
              <Select
                value={election}
                onChange={(e) => setElection(e.target.value)}
                label="Select Party"
              >
                {electionData.map((e) => (
                  <MenuItem key={e.election_name} value={e.election_name}>
                    {e.election_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="party-label">Select Party Name</InputLabel>
              <Select
                value={partyName}
                onChange={partyChangeHandle}
                label="Select Party"
              >
                {partySymbolData.map((e) => (
                  <MenuItem key={e.party_name} value={e.party_name}>
                    {e.party_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="party-label">Select Party Symbol</InputLabel>
              <Select
                value={partySymbol}
l                label="Select Party"
              >
                {partySymbolData.map((e) => (
                  <MenuItem key={e.party_symbol} value={e.party_symbol}>
                    {e.party_symbol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              style={{
                color: "black",
                background: "black",
                width: "100%",
                padding:"10px",
                marginTop: "20px",
                color: "white",
                fontSize:"20px"
              }}
              onClick={submitHandler}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box></Box>
      <Grid container>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            px={2}
            style={{
              minHeight: "10vh",
              marginTop: "90px",
              backgroundImage: "linear-gradient(to left, #4157A1 , #41ADCE)",
            }}
          >
            <Typography
              variant="h5"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Candidate should also vote after nomination
            </Typography>
          </Box>
        </Grid>
        <Grid container>
          <Grid
            container
            spacing={2}
            style={{ minHeight: "50vh", marginTop: "4%" }}
          >
            <Grid item xs={12}>
              <Paper
                elevation={3}
                style={{
                  padding: "10px",
                  marginRight: "10%",
                  marginLeft: "10%",
                  height: "90%",
                }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Paper
                      elevation={3}
                      style={{
                        padding: "20px",
                        width: "70%",
                        marginTop: "10%",
                        boxShadow:
                          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                      }}
                    >
                      <Typography variant="h5" >
                        Candidate voting
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          color: "black",
                          background:
                            "linear-gradient(to left, #4157A1 , #41ADCE)",
                          width: "100%",
                          marginTop: "20px",
                          color: "white",
                          fontSize: "15px",
                        }}
                        component={Link}
                        to="/Voting"
                      >
                        Vote
                      </Button>
                    </Paper>
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
                    <img src={logo1} width="70%" />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NominationsPage;
