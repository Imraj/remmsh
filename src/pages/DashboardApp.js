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

import { getUserDetails, getPlans } from '../actions/userActions';
import {
  AppCreditBalance,
  AppCheckCode,
  AppDiscount,
  AppActivateDiscount,
  AppTotalSeen,
  AppTotalEngagement,
  AppTotalActivation,
  AppName,
  AppDashboardTable
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
    dispatch(getPlans(userInfo._id));
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
                <AppName />
              </>
            )}
          </Grid>
        </Grid>

        <AppDashboardTable />

        <ActionsDashboardStyle />
      </StyledContainer>
    </Page>
  );
}
