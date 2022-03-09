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
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';

import { Wrapper, Status } from '@googlemaps/react-wrapper';

import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { useDispatch, useSelector } from 'react-redux';
import ResItem from '../components/ResItem';
import Header from '../components/home/Header';

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  };
}

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MyMapComponent({ center, zoom }) {
  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom
    });
  });

  return <div ref={ref} id="map" />;
}

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

  const filter = () => {};

  const getRestaurantsStore = useSelector((state) => state.getRestaurants);
  const {
    restaurants,
    error: userDisccountError,
    success: userDisccountSuccess
  } = getRestaurantsStore;

  const [search, setSearch] = useState('');

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
          <MenuItem onClick={filter(1)}>Cheap</MenuItem>
          <MenuItem onClick={filter(2)}>Expensive</MenuItem>
        </Menu>
        <br />

        <TextField fullWidth value={search} placeholder="What are you looking for?" />
        <br />
        <br />

        <TabsUnstyled defaultValue={0}>
          <TabsList>
            <Tab label="List">List</Tab>
            <Tab label="Map">Map</Tab>
          </TabsList>

          <TabPanel value={value} index={0}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} md={6}>
                {restaurants
                  ? restaurants.map((res) => (
                      <ResItem
                        name={res.name}
                        expirationDate={res.expirationDate}
                        timeOpen={res.name}
                        id={res._id}
                        distance={res.name}
                        images={['https://picsum.photos/id/1']}
                      />
                    ))
                  : ''}
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Wrapper apiKey="AIzaSyABDZYSETDwM7NShfxPh-8rsOUsBvxpdCQ" render={render}>
              <MyMapComponent center={center} zoom={zoom} />
            </Wrapper>
          </TabPanel>
        </TabsUnstyled>
      </Container>
    </>
  );
}
