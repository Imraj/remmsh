import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Card,
  Switch,
  Paper,
  Button,
  TextField
} from '@mui/material';
import { green, pink } from '@mui/material/colors';

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import { getUserDetails } from '../actions/userActions';
import {
  AppCreditBalance,
  AppCheckCode,
  AppDiscount,
  AppActivateDiscount,
  AppTotalSeen,
  AppTotalEngagement,
  AppTotalActivation,
  AppName
} from '../components/_dashboard/app';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ActionsDashboardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  marginTop: theme.spacing(2),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(0)
  }
}));

export default function DashboardApp() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const userDetailsStore = useSelector((state) => state.userDetails);
  const { loading, userDetails } = userDetailsStore;

  const updateUserDisccountStore = useSelector((state) => state.updateUserDisccount);
  const { error: userDisccountError, success: userDisccountSuccess } = updateUserDisccountStore;

  const updateUserActiveStore = useSelector((state) => state.updateUserActive);
  const { success: updateUserActiveSuccess } = updateUserActiveStore;

  const userCheckCode = useSelector((state) => state.userCheckCode);
  const {
    loading: userCheckCodeLoading,
    error: userCheckCodeError,
    success: userCheckCodeSuccess
  } = userCheckCode;

  const [timeValue, setTimeValue] = useState(new Date());

  useEffect(() => {
    dispatch(getUserDetails(userInfo._id));
  }, [dispatch, userInfo, userDisccountSuccess, updateUserActiveSuccess]);

  return (
    <Page title="Zoro | Dashboard">
      <StyledContainer maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          sx={{ pb: 5 }}
        >
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <Box>
              <Typography variant="h4">
                Hi <strong style={{ color: green[400] }}>{userInfo.name}</strong>, Welcome back
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <AppCreditBalance />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {!userCheckCodeLoading && (
              <AppCheckCode
                userCheckCodeError={userCheckCodeError}
                userCheckCodeSuccess={userCheckCodeSuccess}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            {userDetails && (
              <>
                <AppName
                  discount={userDetails.discount}
                  discountExpireAt={userDetails.discountExpireAt}
                  userInfo={userInfo}
                  userDisccountError={userDisccountError}
                />
              </>
            )}
          </Grid>
        </Grid>

        <>
          <Box component="span">
            <Button>Sample</Button>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Total Seen</TableCell>
                  <TableCell>Total Engagement</TableCell>
                  <TableCell>Total activation</TableCell>
                  <TableCell>% Rate</TableCell>
                  <TableCell>Exp. Date</TableCell>
                  <TableCell>Copy Link</TableCell>
                  <TableCell>Offline</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    88
                  </TableCell>
                  <TableCell>56</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>
                    <TextField value="%20" />
                  </TableCell>
                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Expiration date"
                        value={timeValue}
                        onChange={(newValue) => {
                          setTimeValue(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell>
                    <Button>
                      <FileCopyIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
        <br />

        <>
          <Box component="span">
            <Button>Student</Button>
            <Button variant="danger">
              <DeleteIcon sx={{ color: pink[500] }} />
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Total Engagement</TableCell>
                  <TableCell>Total activation</TableCell>
                  <TableCell>% Rate</TableCell>
                  <TableCell>Exp. Date</TableCell>
                  <TableCell>Copy Link</TableCell>
                  <TableCell>Offline</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>56</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>
                    <TextField value="%20" />
                  </TableCell>
                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Expiration date"
                        value={timeValue}
                        onChange={(newValue) => {
                          setTimeValue(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell>
                    <Button>
                      <FileCopyIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
        <br />

        <>
          <Box component="span" sx={{ p: 1, border: '1px solid grey' }}>
            <Button>Executive</Button>
            <Button variant="danger">
              <DeleteIcon sx={{ color: pink[500] }} />
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Total Engagement</TableCell>
                  <TableCell>Total activation</TableCell>
                  <TableCell>% Rate</TableCell>
                  <TableCell>Exp. Date</TableCell>
                  <TableCell>Copy Link</TableCell>
                  <TableCell>Offline</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>56</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>
                    <TextField value="%20" />
                  </TableCell>
                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Expiration date"
                        value={timeValue}
                        onChange={(newValue) => {
                          setTimeValue(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell>
                    <Button>
                      <FileCopyIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>

        <ActionsDashboardStyle />
      </StyledContainer>
    </Page>
  );
}
