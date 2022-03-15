import react, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { Blink } from '@bdchauvette/react-blink';

import { getImageBinaries } from '../actions/userActions';

function MyCarousel({ images, discount }) {
  console.log('MyCarousel', images);

  return (
    <Carousel navButtonsAlwaysVisible>
      {images
        ? images.map((image) => (
            <div style={{ position: 'relative' }}>
              <Paper>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${image}`}
                  width="600"
                  height="300"
                  alt={image}
                />
              </Paper>
              <div
                style={{
                  position: 'absolute',
                  color: 'white',
                  top: 10,
                  left: '95%',
                  transform: 'translateX(-50%)'
                }}
              >
                {' '}
                <Button variant="contained">20% Off</Button>
              </div>
            </div>
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
    console.log('navTo::navTotres');
  };

  const [showElement, setShowElement] = useState(true);

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia children={<MyCarousel images={images} discount={discount} />} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography gutterBottom align="center" variant="h3" component="div">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Blink>
              <CircleIcon size="small" color="success" />
            </Blink>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography gutterBottom variant="h6" color="text.secondary">
              {notes}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography gutterBottom variant="h6" color="text.secondary">
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
            <IconButton variant="outlined">
              <LocationOnIcon />
            </IconButton>
            {distance} mi
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
