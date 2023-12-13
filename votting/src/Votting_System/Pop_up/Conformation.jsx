import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import Success_popup from "./Success_popup";
import warning from "../Assests/warning.jpg";
import warning1 from "../Assests/Warning 1.svg"

const Conformation = ({ open, onClose,childClick }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const SuccessOpen = (e) => {
    
    if (isChecked) {
      setSuccess(true);
      childClick()
    } else {
      alert("PLease agree the conditions");
    }
    onClose(false)
  };
  const SuccessClose = (e) => {
    setSuccess(false);
    sessionStorage.removeItem("LoginID")
  };

  return (
    <Box>
      <Dialog className="logout__wrapper" open={open} onClose={onClose}>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={warning1} width="40%" alt="Warning" />
          <Typography variant="h5" style={{fontWeight:"bold"}}>Are you sure</Typography>
          <Typography
            variant="div"
            component="div"
            className="agree-section"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
           
          >
            <Typography variant="p" > Sure you want to publish the vote</Typography>
            <Typography className="agree-statement" >
              {" "}
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              Yes, I agree
            </Typography>
          </Typography>
        </DialogContent>
        <DialogActions className="justify-content-center">
          <Stack direction="row" gap={2}>
            <Button
              className="primary-outline-btn"
              component="button"
              variant="outlined"

              onClick={onClose}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              className="primary-btn"
              component="button"
              variant="contained"
              onClick={SuccessOpen}
              autoFocus
            >
              Save
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <Success_popup open={success} onClose={SuccessClose} />
    </Box>
  );
};

export default Conformation;
