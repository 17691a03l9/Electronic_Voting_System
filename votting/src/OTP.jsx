import React, { useState } from 'react';

import axios from 'axios';

function OTP() {
  const [mobileNumber, setMobileNumber] = useState('');

  const sendOTP = () => {
    axios.post('http://localhost:3001/send-otp', { mobileNumber })
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., show a message to the user
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <button onClick={sendOTP}>Send OTP</button>
    </div>
  );
}

export default OTP;
