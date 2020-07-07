import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import AddProfileForm from "./AddProfileForm";
import { postProfileRequest } from "../../../functions";
//import {handleInput} from './handleInput';

const initialFormState = {
  first_name: null,
  last_name: null,
  address: null,
  city: null,
  dob: null,
  state: null,
  zip: null,
};

const AddProfile = (props) => {
  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).userid;

  const [profileBody, setprofileBody] = useState(initialFormState);

  const addHandleChange = (e) => {
    setprofileBody({ ...profileBody, [e.target.name]: e.target.value });
  };
  // handleInput( profileBody,setprofileBody);

  const handleSubmit = (e) => {
    e.preventDefault();
    setprofileBody(userId)
    postProfileRequest(profileBody, userId)
    .then(() => window.location.reload())
  };
  return (
    <AddProfileForm
      profileBody={profileBody}
      handleSubmit={handleSubmit}
      addHandleChange={addHandleChange}
    />
  )

  
};

export default AddProfile;
