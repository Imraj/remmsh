import react, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Paper,
  Box
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';

function MyCarousel() {
  return (
    <Carousel navButtonsAlwaysVisible>
      <div style={{ position: 'relative' }}>
        <Paper variant="outlined">
          <Box
            component="img"
            sx={{
              height: 233,
              width: 750
            }}
            alt="The house from the offer."
            src="https://picsum.photos/id/1/200/300"
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
      <Paper variant="outlined">
        <Box
          component="img"
          sx={{
            height: 150,
            width: 750
          }}
          alt="The house from the offer."
          src="https://picsum.photos/id/51/200/300"
        />
      </Paper>
    </Carousel>
  );
}

export default function ResItem(props) {
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia children={<MyCarousel />} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Epic Coffee
        </Typography>
        <Typography gutterBottom variant="h6" color="text.secondary">
          Ends 12/12/2023
        </Typography>
        <Typography variant="body2" color="text.secondary">
          10:00PM - 11:00 PM . 0.4 mil
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="medium">
          Click here
        </Button>
      </CardActions>
    </Card>
  );
}
