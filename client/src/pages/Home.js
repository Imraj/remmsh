import react, { useState, useEffect, useRef, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// material

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
  ButtonGroup,
  AppBar,
  Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { useDispatch, useSelector, connect, shallowEqual } from 'react-redux';
import { usePosition } from 'use-position';
import { createSelector } from 'reselect';
import { styled } from '@mui/material/styles';
import ResItem from '../components/ResItem';
import Header from '../components/home/Header';

import { getRestaurants, search } from '../actions/userActions';

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  };
}

/* const mapStateToProps = (state) => ({
  todos: state
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (obj) => dispatch(addTodos(obj))
}); */

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

  const watch = true;
  const { latitude, longitude, speed, timestamp, accuracy, heading, error } = usePosition(watch, {
    enableHighAccuracy: true
  });

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

  const dispatch = useDispatch();
  let restaurants = useSelector((state) => {
    if (allRes === true) {
      return state.getRestaurants.restaurants;
    }
    if (onlyRes === true && state.getRestaurants && state.getRestaurants.restaurants) {
      if (state.getRestaurants) {
        return state.getRestaurants.restaurants.filter((res) => res.type === 'resturant');
      }
    }
    if (onlyCof === true && state.getRestaurants && state.getRestaurants.restaurants) {
      return state.getRestaurants.restaurants.filter((res) => res.type === 'coffee');
    }
    if (onlyLou === true && state.getRestaurants && state.getRestaurants.restaurants) {
      return state.getRestaurants.restaurants.filter((res) => res.type === 'lounge');
    }
    if (fOne === true && state.getRestaurants && state.getRestaurants.restaurants) {
      return state.getRestaurants.restaurants.filter(
        (restaurant) => restaurant.publicFigures.discount >= 70
      );
    }
    if (fTwo === true && state.getRestaurants && state.getRestaurants.restaurants) {
      return state.getRestaurants.restaurants.filter(
        (restaurant) =>
          restaurant.publicFigures.discount >= 50 && restaurant.publicFigures.discount < 70
      );
    }
    if (fThree === true && state.getRestaurants && state.getRestaurants.restaurants) {
      return state.getRestaurants.restaurants.filter(
        (restaurant) => restaurant.publicFigures.discount <= 20
      );
    }
    if (fLoc === true && state.getRestaurants && state.getRestaurants.restaurants) {
      return state.getRestaurants.restaurants.filter(
        (restaurant) => fetchDistance(restaurant.location) < 50
      );
    }
    if (fsearch === true && state.getRestaurants && state.getRestaurants.restaurants) {
      return state.getRestaurants.restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.districtAr.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });

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

  console.log('R:::R:::R', typeof restaurants);

  const [arestaurants, setRestaurants] = useState([]);

  const toRad = (degree) => (degree * Math.PI) / 180;

  useEffect(() => {
    // setInterval(() => {
    dispatch(getRestaurants());
    setRestaurants(restaurants);
    // }, 60000);
  }, []);

  const filter = (num) => {
    console.log('filter::::num:::', num);
    if (num === 1) {
      setFone(true);
      setFtwo(false);
      setFthree(false);
      setFloc(false);
      setFsearch(false);
      setAllRes(false);
      setOnlyRes(false);
      setOnlyCoffee(false);
      setOnlyLounge(false);
    } else if (num === 2) {
      setFtwo(true);
      setFone(false);
      setFthree(false);
      setFloc(false);
      setFsearch(false);
      setAllRes(false);
      setOnlyRes(false);
      setOnlyCoffee(false);
      setOnlyLounge(false);
    } else if (num === 3) {
      setFthree(true);
      setFone(false);
      setFthree(false);
      setFloc(false);
      setFsearch(false);
      setAllRes(false);
      setOnlyRes(false);
      setOnlyCoffee(false);
      setOnlyLounge(false);
    }
  };

  const filterByLocation = () => {
    /* setFloc(true);
    setFsearch(false);
    setAllRes(false);
    setOnlyRes(false);
    setOnlyCoffee(false);
    setOnlyLounge(false); */
    console.log('filterByLocation:::', restaurants);
  };

  const search = (e) => {
    setSearchQuery(e.target.value);
    setFsearch(true);
    setAllRes(false);
    setOnlyRes(false);
    setOnlyCoffee(false);
    setOnlyLounge(false);
  };

  const getClosest = () => {
    restaurants = restaurants.filter((res) => res.distance < 0.5);
  };

  const allRestaurants = () => {
    setAllRes(true);
    setOnlyRes(false);
    setOnlyCoffee(false);
    setOnlyLounge(false);
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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ background: '#fff' }} position="static">
          <Toolbar>
            <Typography
              variant="h6"
              color="danger"
              align="center"
              component="div"
              style={{ color: '#992731' }}
              sx={{ flexGrow: 1 }}
            >
              Remmsh
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
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
        <>
          <Grid container spacing={2}>
            <Grid item xs={9} md={11}>
              <TextField
                fullWidth
                value={searchQuery}
                onChange={() => search}
                style={{ borderRadius: '35px' }}
                placeholder="What restaurant are you searching for?"
                InputProps={{
                  startAdornment: <SearchIcon />
                }}
              />
            </Grid>
            <Grid item md={1} xs={1}>
              <Button
                variant="contained"
                size="large"
                edge="start"
                color="primary"
                fontSize="large"
                onClick={handleClick}
              >
                <FilterAltIcon />
              </Button>
            </Grid>
          </Grid>
          <br />

          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Button
                variant={allRes ? 'contained' : 'outlined'}
                fullWidth
                size="large"
                onClick={() => allRestaurants()}
                style={{ borderRadius: '35px' }}
              >
                All
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant={onlyRes ? 'contained' : 'outlined'}
                fullWidth
                size="large"
                onClick={() => onlyRestaurants()}
                style={{ borderRadius: '35px' }}
              >
                Restaurant
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant={onlyCof ? 'contained' : 'outlined'}
                fullWidth
                size="large"
                onClick={() => onlyCoffee()}
                style={{ borderRadius: '35px' }}
              >
                Coffee
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant={onlyLou ? 'contained' : 'outlined'}
                fullWidth
                size="large"
                onClick={() => onlyLounges()}
                style={{ borderRadius: '35px' }}
              >
                Lounge
              </Button>
            </Grid>
          </Grid>
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
