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

import { green, pink } from '@mui/material/colors';

function MyCarousel({ images, discount }) {
  return (
    <Carousel navButtonsAlwaysVisible>
      <div style={{ position: 'relative' }}>
        {images
          ? images.map((image) => (
              <>
                <Paper variant="outlined">
                  <Box
                    component="img"
                    sx={{
                      width: 750
                    }}
                    alt="remmsh restaurant images"
                    src={image}
                  />
                </Paper>
              </>
            ))
          : ''}
      </div>
      }
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
  useEffect(() => {
    setTimeout(() => {
      setShowElement(false);
    }, 2000);
  }, []);

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia children={<MyCarousel images={images} />} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography gutterBottom align="center" variant="h3" component="div">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {showElement === true ? (
              <IconButton>
                <CircleIcon size="small" color="success" />
              </IconButton>
            ) : (
              <></>
            )}
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
              Ends {expirationDate}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined" align="right" startIcon={<LocationOnIcon />}>
              {distance}
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
