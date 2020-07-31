import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}


export default function Sliders(props) {

  const {handleChange} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Speed (ms)
      </Typography>
      <Grid container spacing={2}>
        <Grid item>Slower</Grid>
        <Grid item xs>
        <Slider
                    defaultValue={100}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={100}
                    marks={false}
                    min={100}
                    max={1000}
                    onChange={handleChange}
                    />
                  
        </Grid>
        <Grid item>Faster</Grid>
      </Grid>
    </div>
  );
}