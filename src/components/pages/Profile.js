import React, { useEffect, useState,useContext } from "react";
import NavBar from "../Navbar.js";
import ProfileInfo from "./ProfileInfo";
import AddUser from "./AddProfile.js";
import EditUser from "./EditUser";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import ProfileContext from "../../contexts/ProfileContext";
import { createProfileContext } from "../../functions";
import EditProfileInputs from "./profileStyles/EditProfileInputs.js";



export default function Profile(props) {

  // const initialFormState = {
  //   first_name: "",
  //   last_name: "",
  //   address: "",
  //   city: "",
  //   dob: null,
  //   state: "",
  //   zip: null,
  // };

  console.log("props users ====>", props)

  const [editing, setEditing] = useState(false)
  const { setProfileData } = useContext(ProfileContext);
  useEffect(() => {
    createProfileContext().then((res) => setProfileData(res));

  }, [setEditing]);


  const [currentUser, setCurrentUser] = useState({})
  console.log("props users ====>", currentUser)

  const toggleEditing = () => {
    setEditing(true)
  }

  const editRow = user => {
    setEditing(true)

    setCurrentUser({ first_name: user.first_name, last_name: user.last_name, address: user.address, city: user.city, dob: user.dob, state: user.state, zip: user.zip })
  }
  return (
    <section>
      <NavBar {...props} />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ProfileInfo toggleEditing={toggleEditing} />
          </Grid>
          <Grid item xs={8}>
            {editing ? (
              <div>
                <h2>Edit User</h2>
                <EditUser users={currentUser} editRow={editRow} />
              </div>
            ) : (
                <div>
                  <AddUser {...props} />
                </div>

              )}
          </Grid>
          {/*<Grid item xs={8}>
            <AddUser {...props} />
            </Grid>*/}
        </Grid>
      </Container>
    </section>
  );
}
