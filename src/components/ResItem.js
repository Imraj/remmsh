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
  Grid,
  AppBar,
  Toolbar
} from '@mui/material';

import Carousel from 'react-material-ui-carousel';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircleIcon from '@mui/icons-material/Circle';

import { green } from '@mui/material/colors';
import Countdown from 'react-countdown';

import { Blink } from '@bdchauvette/react-blink';

import { getImageBinaries } from '../actions/userActions';

import LineLoader from './home/LineLoader';

function MyCarousel({ images, discount }) {
  return (
    <Carousel navButtonsAlwaysVisible indicators={false}>
      {images
        ? images.map((image) => (
            <div style={{ position: 'relative' }}>
              <Paper>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/api/uploads/${image}`}
                  width="600"
                  height="300"
                  alt={image}
                  style={{ objectFit: 'cover' }}
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
                <Button style={{ backgroundColor: '#992731' }} variant="contained">
                  {discount}% Off
                </Button>
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
      <CardContent style={{ marginTop: '0px' }}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Typography gutterBottom align="center" variant="h3" component="div">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <LineLoader />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography gutterBottom variant="h6" color="text.secondary">
              {notes}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography gutterBottom variant="h6" color="text.secondary">
              {district}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography gutterBottom variant="subtitle2" color="text.secondary">
              {new Date(expirationDate).getTime() - Date.now() > 60 * 60 * 24 * 1000 ? (
                <>Ends {expirationDate}</>
              ) : (
                <Countdown date={Date.now() + (new Date(expirationDate).getTime() - Date.now())} />
              )}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <LocationOnIcon sx={{ fontSize: '15px', margin: '0px' }} />
            <span sx={{ fontSize: '60px' }}>{distance} mi</span>
          </Grid>
        </Grid>
      </CardContent>
      <Box>
        <Button variant="contained" fullWidth onClick={navTo(id)} size="large">
          Get Code
        </Button>
      </Box>
    </Card>
  );
}
