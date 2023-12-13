import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";
import correct from "../Assests/Correct.jpg";

const Success_popup = ({ open, onClose }) => {
  return (
    <Box>
      <Dialog open={open} onClose={onClose}>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "419px",
          }}
        >
          <img src={correct} alt="Correct" width="40%" />
          <Typography
            variant="h6"
            style={{ marginTop: "20px", fontWeight: "bold" }}
          >
            Thank You For Voting 
          </Typography>
          <Typography
            variant="h6"
         style={{textAlign:"center"}}
          >
         details saved successfully  and we are navigating to home page 
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "30px" }}
            onClick={onClose}
            component={Link}
            to="/Home"
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Success_popup;
