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
    <Carousel
      indicatorContainerProps={{
        style: {
          marginTop: '-15px',
          textAlign: 'center',
          zIndex: 1
        }
      }}
    >
      {images
        ? images.map((image) => (
            <div style={{ position: 'relative' }}>
              <Paper>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/api/uploads/${image}`}
                  width="600"
                  height="200"
                  alt={image}
                  style={{ objectFit: 'cover' }}
                />
              </Paper>
              <div
                style={{
                  position: 'absolute',
                  color: 'white',
                  top: 75,
                  right: '68%',
                  transform: 'translateX(-50%)'
                }}
                sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}
              >
                {' '}
                <Button style={{ backgroundColor: '#ffff', color: '#00AB55' }} variant="contained">
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
      <CardContent style={{ marginTop: '0px', paddingTop: '0px', paddingBottom: '0px' }}>
        <Grid container>
          <Grid item xs={4}>
            <Typography gutterBottom align="left" variant="h3" component="div">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={2}>
            <Blink>
              <CircleIcon size="small" color="success" />
            </Blink>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
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

        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography gutterBottom variant="subtitle2" color="text.secondary">
              {new Date(expirationDate).getTime() - Date.now() > 60 * 60 * 24 * 1000 ? (
                <>Ends {expirationDate}</>
              ) : (
                <>
                  Ends{' '}
                  <Countdown
                    daysInHours
                    date={Date.now() + (new Date(expirationDate).getTime() - Date.now())}
                  />
                </>
              )}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography gutterBottom color="text.secondary">
              {distance}mi
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Box>
        <Button
          variant="contained"
          style={{ borderRadius: '35px' }}
          fullWidth
          onClick={navTo(id)}
          size="large"
        >
          Get Code
        </Button>
      </Box>
    </Card>
  );
}
