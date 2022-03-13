import react, { useState, useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
  Grid
} from '@mui/material';

import Carousel from 'react-material-ui-carousel';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircleIcon from '@mui/icons-material/Circle';

import { green } from '@mui/material/colors';
import Countdown from 'react-countdown';

// import Blink from 'react-blink';
import { Blink } from '@bdchauvette/react-blink';

function MyCarousel({ images, discount }) {
  return (
    <Carousel navButtonsAlwaysVisible>
      {images
        ? images.map((image) => (
            <Paper>
              <img src={image} width="600" height="300" alt="remmsh" />
            </Paper>
          ))
        : ''}
    </Carousel>
  );
}

export default function ResItem({
  name,
  expirationDate,
  distance,
  id,
  images,
  district,
  notes,
  discount
}) {
  const navTo = (id) => {
    console.log('navTo::navTo');
  };

  const [showElement, setShowElement] = useState(true);
  /* useEffect(() => {
    setTimeout(() => {
      setShowElement(false);
    }, 2000);
  }); */

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia children={<MyCarousel images={images} discount={discount} />} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography gutterBottom align="center" variant="h3" component="div">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Blink>
              <CircleIcon size="small" color="success" />
            </Blink>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h6" color="text.secondary">
              {notes}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom align="right" variant="h6" color="text.secondary">
              {district}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography gutterBottom variant="subtitle2" color="text.secondary">
              {new Date(expirationDate).getTime() - Date.now() > 60 * 60 * 24 * 1000 ? (
                <>Ends {expirationDate}</>
              ) : (
                <Countdown date={Date.now() + (new Date(expirationDate).getTime() - Date.now())} />
              )}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined" align="right" startIcon={<LocationOnIcon />}>
              {distance} mi
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Box>
        <Button variant="contained" fullWidth onClick={navTo(id)} size="large">
          Click here
        </Button>
      </Box>
    </Card>
  );
}
