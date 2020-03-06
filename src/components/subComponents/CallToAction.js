import React from "react";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const CallToAction = props => {
  return (
    <Grid container style={{ padding: '3% 10%', width: 1100, margin: '0 auto'}}>
      <Grid item sm={6}>
      </Grid>
      <Grid item style={{ width: '100%', display: 'flex', flexDirection:'column'}}>
      <Link to="/signin" style={{margin: '0 auto'}}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#8BC34A",
              color: 'white',
              width: 180
          }}>
            Sign Up
          </Button>
        </Link>
        <Typography
          variant="p"
          align="center"
          style={{
            width: '100%',
          fontWeight: 500,
          fontSize: 18
        }}>
          Join now and see what the locals love and hate about the city you're
          interested in 
        </Typography>
        
      </Grid>
    </Grid>
  );
};
export default CallToAction;
