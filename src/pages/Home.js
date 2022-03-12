import react, { useState, useEffect, useRef, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Tabs,
  List,
  ListItem,
  Grid,
  Button,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  ButtonGroup
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { useDispatch, useSelector } from 'react-redux';
import { usePosition } from 'use-position';
import ResItem from '../components/ResItem';
import Header from '../components/home/Header';

import { getRestaurants } from '../actions/userActions';

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  };
}

/* const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
}; */

const green = {
  50: '#f6fff0',
  100: '#f1fff0',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#00AB55',
  500: '#00AB55',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75'
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${green[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${green[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${green[50]};
    color: ${green[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${green[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default function Home() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getRestaurantsStore = useSelector((state) => state.getRestaurants);
  let { restaurants } = getRestaurantsStore;

  const restaurantsContainer = restaurants;

  const [search, setSearch] = useState('');

  const watch = true;
  const { latitude, longitude, speed, timestamp, accuracy, heading, error } = usePosition(watch, {
    enableHighAccuracy: true
  });

  const toRad = (degree) => (degree * Math.PI) / 180;

  const calculateDistance = (lon1, lat1, lon2, lat2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = toRad(lat2 - lat1); // Javascript functions in radians
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  const filter = (num) => {
    if (restaurants !== undefined) {
      if (num === 1) {
        restaurants = restaurants.filter((restaurant) => restaurant.publicFigures.discount >= 70);
      } else if (num === 2) {
        restaurants = restaurants.filter(
          (restaurant) =>
            restaurant.publicFigures.discount >= 50 && restaurant.publicFigures.discount < 70
        );
      } else if (num === 3) {
        restaurants = restaurants.filter((restaurant) => restaurant.publicFigures.discount <= 20);
      }
    }
  };

  const getClosest = () => {
    restaurants = restaurants.filter((res) => res.distance < 0.5);
  };

  const allRestaurants = () => {
    restaurants = restaurantsContainer;
  };

  const onlyRestaurants = () => {
    restaurants = restaurants.filter((res) => res.type === 'resturant');
    console.log('OnlyRestaurants::', restaurants);
  };

  const onlyLounges = () => {
    restaurants = restaurants.filter((res) => res.type === 'lounge');
    console.log('OnlyLounges::', restaurants);
  };

  const onlyCoffee = () => {
    restaurants = restaurants.filter((res) => res.type === 'coffee');
    console.log('OnlyCoffee::', restaurants);
  };

  const longitude0 = 0;
  const latitude0 = 0;
  calculateDistance(longitude0, latitude0, longitude, latitude);

  return (
    <>
      <Header />
      <br />
      <Container>
        <Box>
          <Button variant="outlined" onClick={handleClick} startIcon={<FilterListIcon />}>
            Filter
          </Button>
        </Box>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={filter(1)}>
            <IconButton>
              <MonetizationOnIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={filter(2)}>
            <IconButton>
              <MonetizationOnIcon />
              <MonetizationOnIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={filter(3)}>
            <IconButton>
              <MonetizationOnIcon />
              <MonetizationOnIcon />
              <MonetizationOnIcon />
            </IconButton>
          </MenuItem>
        </Menu>
        <br />

        <Box>
          <IconButton variant="outlined" onClick={handleClick}>
            <LocationOnIcon />
          </IconButton>
        </Box>
        <>
          <ButtonGroup fullWidth variant="outlined" size="large" aria-label="outlined button group">
            <Button onClick={allRestaurants}>All</Button>
            <Button onClick={onlyRestaurants}>Restaurant</Button>
            <Button onClick={onlyCoffee}>Coffee</Button>
            <Button onClick={onlyLounges}>Lounge</Button>
          </ButtonGroup>
          <br />
          <br />

          <TextField fullWidth value={search} placeholder="What are you looking for?" />
          <br />
          <br />

          <Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {restaurants
                ? restaurants.map((res) => (
                    <Grid key={res._id} item xs={12} md={6}>
                      <ResItem
                        name={res.name}
                        expirationDate={res.createdAt}
                        id={res._id}
                        distance="0.4"
                        notes={res.notes}
                        district={res.district}
                        discount="0.4"
                        images={[
                          'https://picsum.photos/id/237/900/900',
                          'https://picsum.photos/id/237/200/300'
                        ]}
                      />
                    </Grid>
                  ))
                : ''}
            </Grid>
          </Box>
        </>
      </Container>
    </>
  );
}
