import { BrowserRouter, Route, Routes } from "react-router-dom";

import CandidateRegistration from "../Votting_System/Components/CandidateRegistration";
import HomePage from "../Votting_System/Pages/HomePage";
import Login from "../Votting_System/Pages/Login";
import NominationsPage from "../Votting_System/Pages/NominationsPage";
import OtpPage from "../Votting_System/Pages/OtpPage";
import { Privateroute } from "./PrivateRoute";
import React from "react";
import ResultPag from "../Votting_System/Pages/ResultPag";
import ThankPop_up from "../Votting_System/Pages/ThankPop_up";
import UserList from "../Votting_System/Components/UserList";
import UserRegistration from "../Votting_System/Components/UserRegistration";
import VottingPage from "../Votting_System/Pages/VottingPage";

// import Privateroute from "./PrivateRoute";








const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<Login />} />
        <Route path="/Candidate" element={<CandidateRegistration/>}/>
        <Route path="/User" element={<UserRegistration />} />
        <Route element={<Privateroute />}>
        <Route path="/OTP" element={<OtpPage />} />
        <Route path="/Voting" element={<VottingPage />} />
        <Route path="/Result" element={<ResultPag />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/Nomination"  element={<NominationsPage />} />
        <Route path="/Popup" element={<ThankPop_up/>} />
       </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
