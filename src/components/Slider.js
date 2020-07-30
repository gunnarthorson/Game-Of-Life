import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});


export default function Sliders(props) {

  const [speed,setSpeed] = useState(100);
  const classes = useStyles();

  const updateSpeed = (speed) => {
    setSpeed(200-speed)
  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Speed (ms)
      </Typography>
      <Grid container spacing={2}>
        <Grid item>Faster</Grid>
        <Grid item xs>
        <Slider
                    defaultValue={100}
                    getAriaValueText={updateSpeed}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    speed={speed}
                    marks={false}
                    min={100}
                    max={1000}/>
                  
        </Grid>
        <Grid item>Slower</Grid>
      </Grid>
    </div>
  );
}