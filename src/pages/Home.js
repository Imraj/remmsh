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

import { getRestaurants, search } from '../actions/userActions';

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
  const [searchQuery, setSearchQuery] = useState('');

  const [allRes, setAllRes] = useState(true);
  const [onlyRes, setOnlyRes] = useState(false);
  const [onlyCof, setOnlyCoffee] = useState(false);
  const [onlyLou, setOnlyLounge] = useState(false);
  const [fOne, setFone] = useState(false);
  const [fTwo, setFtwo] = useState(false);
  const [fThree, setFthree] = useState(false);
  const [fLoc, setFloc] = useState(false);
  const [fsearch, setFsearch] = useState(false);

  const dispatch = useDispatch();
  const getRestaurantsStore = useSelector((state) => {
    if (allRes === true) {
      return state.getRestaurants;
    }
    if (onlyRes === true) {
      if (state.getRestaurants) {
        return Object.values(state.getRestaurants).filter((res) => res.type === 'resturant');
      }
    }
    if (onlyCof === true) {
      return Object.values(state.getRestaurants).filter((res) => res.type === 'coffee');
    }
    if (onlyLou === true) {
      return Object.values(state.getRestaurants).filter((res) => res.type === 'lounge');
    }
  });

  let { restaurants } = getRestaurantsStore;

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

  const restaurantsContainer = restaurants;

  console.log('R:::R:::R', restaurants);

  const watch = true;
  const { latitude, longitude, speed, timestamp, accuracy, heading, error } = usePosition(watch, {
    enableHighAccuracy: true
  });

  const [arestaurants, setRestaurants] = useState(restaurants);

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
    const KM_TO_MILES = 0.621371;
    return parseInt(d * KM_TO_MILES, 10);
  };

  useEffect(() => {
    dispatch(getRestaurants());
    setRestaurants(restaurants);
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

  const fetchDistance = (url) => {
    if (url.includes('@')) {
      const urlSplit = url.split('@');
      const ll = urlSplit[1].split(',');
      const latitude0 = ll[0];
      const longitude0 = ll[1];
      const distance = calculateDistance(longitude, latitude, longitude0, latitude0);
      console.log('distance::', distance);
      return distance;
    }
  };

  const filterByLocation = () => {
    restaurants = restaurants.filter((restaurant) => fetchDistance(restaurant.location) < 0.5);
    console.log('filterByLocation:::', restaurants);
  };

  const search = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      restaurants = restaurants.filter(
        (restaurant) =>
          restaurant.name === searchQuery ||
          restaurant.nameAr === searchQuery ||
          restaurant.notes === searchQuery ||
          restaurant.district === searchQuery ||
          restaurant.districtAr === searchQuery
      );

      console.log('restaurants:::', restaurants);
    }
  };

  const getClosest = () => {
    restaurants = restaurants.filter((res) => res.distance < 0.5);
  };

  const allRestaurants = () => {
    // restaurants = restaurantsContainer;
    setAllRes(true);
  };

  const onlyRestaurants = () => {
    setAllRes(false);
    setOnlyRes(true);
    setOnlyCoffee(false);
    setOnlyLounge(false);
    console.log('OnlyRestaurants::onlyRestaurants', restaurants);
  };

  const onlyLounges = () => {
    setOnlyLounge(true);
    setAllRes(false);
    setOnlyRes(false);
    setOnlyCoffee(false);
    console.log('OnlyLounges::', restaurants);
  };

  const onlyCoffee = () => {
    setOnlyCoffee(true);
	setOnlyLounge(false);
    setAllRes(false);
    setOnlyRes(false);
    
    console.log('OnlyCoffee::', restaurants);
  };

  console.log('LatLong::', longitude, latitude);

  return (
    <>
      <Header />
      <br />
      <Container>
        <Box>
          <Button variant="outlined" onClick={() => handleClick} startIcon={<FilterListIcon />}>
            Filter
          </Button>
        </Box>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={() => filter(1)}>
            <IconButton>
              <MonetizationOnIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={() => filter(2)}>
            <IconButton>
              <MonetizationOnIcon />
              <MonetizationOnIcon />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={() => filter(3)}>
            <IconButton>
              <MonetizationOnIcon />
              <MonetizationOnIcon />
              <MonetizationOnIcon />
            </IconButton>
          </MenuItem>
        </Menu>
        <br />

        <Box>
          <IconButton variant="outlined" onClick={() => filterByLocation()}>
            <LocationOnIcon />
          </IconButton>
        </Box>
        <>
          <ButtonGroup fullWidth variant="outlined" size="large" aria-label="outlined button group">
            <Button onClick={() => allRestaurants()}>All</Button>
            <Button onClick={() => onlyRestaurants()}>Restaurant</Button>
            <Button onClick={() => onlyCoffee()}>Coffee</Button>
            <Button onClick={() => onlyLounges()}>Lounge</Button>
          </ButtonGroup>
          <br />
          <br />

          <TextField
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={search}
            placeholder="What are you looking for?"
          />
          <br />
          <br />

          <Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {restaurants
                ? restaurants.map((res) => (
                    <Grid key={res._id} item xs={12} md={6}>
                      <ResItem
                        name={res.name}
                        expirationDate={res.publicFigures ? res.publicFigures.discountExpireAt : ''}
                        id={res._id}
                        distance={fetchDistance(res.location)}
                        notes={res.notes}
                        district={res.district}
                        discount={res.publicFigures.discount}
                        images={
                          res.images
                            ? res.images
                            : ['622de86f25809aec5bfff7db', '622de86f25809aec5bfff7dc']
                        }
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
