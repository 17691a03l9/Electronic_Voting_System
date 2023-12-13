import {
  AppBar,
  Box,
  Button,
  Grid,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import Conformation from "../Pop_up/Conformation";
import axios from "axios";
import logo2 from "../Assests/images 23.jpg";
import logo3 from "../Assests/logo1-removebg-preview.png"

const VottingPage = () => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [electionData, setElectionData] = useState([]);
  const [partyData, setPartyData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const [voterClick, setVoterClick] = useState();
  useEffect(() => {
    axios.get(`http://localhost:8060/api/party`).then((res) => {
      setPartyData(res.data);
    });
    axios.get(`http://localhost:8060/api/election`).then((res) => {
      setElectionData(res.data);
    });
    axios.get(`http://localhost:8060/api/users`).then((res) => {
      setCandidateData(res.data);
    });
  }, []);
  const rows1 = [
    {
      id: 1,
      election_id: 2,
      candidate_id: 2,
      party_id: 2,
    },
    {
      id: 2,
      election_id: 2,
      candidate_id: 2,
      party_id: 1,
    },

    {
      id: 3,
      election_id: 4,
      candidate_id: 3,
      party_id: 4,
    },
  ];
  // console.log(electionData, partyData, candidateData, rows1);
  const handleOpenConfirmation = (r) => {
    setVoterClick(r - 1);
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const mappedData = rows1.map((row) => {
    const candidate = candidateData.find((c) => c.id === row.candidate_id);
    const party = partyData.find((p) => p.id === row.party_id);

    return {
      id: row.id,
      partySymbol: party?.party_symbol,
      partyName: party?.party_name,
      candidateName: candidate?.username,
      action: (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenConfirmation(row.id)}
        >
          Vote
        </Button>
      ),
    };
  });

  const childClick = () => {
    let r = voterClick;
    let a = rows1[r];
    
    a.voter_id = rows1[r].id;
    axios.post(`http://localhost:8060/api/votings/insert`,a)
    console.log(a)
    
  };
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar
              style={{
                display: "flex",
                gap: "20%",
                backgroundColor: "#FF671F",
              }}
            >
              <Box>
                <img
                  src={logo3}
                  alt="Logo"
                  style={{
                    height: "70px",
                    marginRight: "10px",
                    borderRadius: "80px",
                  }}
                />
              </Box>
              <Typography
                variant="h4"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Election Commission Of India
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: "70px" }}>
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bold" }}
                    >
                      Candidate Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bold" }}
                    >
                      Party
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bold" }}
                    >
                      Party Symbol
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bold" }}
                    >
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mappedData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.candidateName}</TableCell>
                    <TableCell>{row.partyName}</TableCell>
                    <TableCell>{row.partySymbol}</TableCell>

                    <TableCell>{row.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <AppBar
            position="static"
            style={{ backgroundColor: "#046A38", marginTop: "20%" }}
          >
            <Toolbar style={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h5" style={{ color: "white" }}>
                Thank You For Voting
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
      {/* {rows1?.map((i, k) =>
        candidateData?.map((e, k) => {
          if (i.candidate_id == e.id) {
            return (
              <>
                <h1> {e.username}</h1>
              </>
            );
          }
        })
      )}
      ;
      {rows1?.map((i, k) =>
        partyData?.map((e, k) => {
          if (i.party_id == e.id) {
            return (
              <>
                <h1> {e.party_name}</h1>
              </>
            );
          }
        })
      )}
      ;
      {rows1?.map((i, k) =>
        partyData?.map((e, k) => {
          if (i.party_id == e.id) {
            return (
              <>
                <h1> {e.party_symbol}</h1>
              </>
            );
          }
        })
      )}
      ; */}
      <Conformation
        open={confirmationOpen}
        onClose={handleCloseConfirmation}
        childClick={childClick}
      />
    </Box>
  );
};

export default VottingPage;
