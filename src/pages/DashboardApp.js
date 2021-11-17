import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Container, Typography, Alert, CircularProgress, Card } from '@mui/material';
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Page from '../components/Page';
import {
  AppCreditBalance,
  AppCheckCode,
  AppDiscount,
  AppActivateDiscount,
  AppTotalSeen,
  AppTotalEngagement,
  AppTotalActivation
} from '../components/_dashboard/app';
import { getUserDetails } from '../actions/userActions';

// ----------------------------------------------------------------------

const ActionsDashboardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  marginTop: theme.spacing(2),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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

  useEffect(() => {
    dispatch(getUserDetails(userInfo._id));
  }, [dispatch, userInfo, userDisccountSuccess, updateUserActiveSuccess]);

  return (
    <Page title="Zoro | Dashboard">
      <Container maxWidth="xl">
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
          <Grid item xs={12} sm={6} md={4}>
            <AppTotalSeen />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppTotalEngagement />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppTotalActivation />
          </Grid>
        </Grid>
        <ActionsDashboardStyle>
          <Grid container spacing={3}>
            {!userCheckCodeLoading && (
              <Grid item xs={12} md={4}>
                <AppCheckCode
                  userCheckCodeError={userCheckCodeError}
                  userCheckCodeSuccess={userCheckCodeSuccess}
                />
              </Grid>
            )}

            {userCheckCodeLoading && (
              <Grid
                item
                xs={12}
                md={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="262px"
              >
                <CircularProgress size={50} color="info" />
              </Grid>
            )}
            {loading && (
              <>
                <Grid
                  item
                  xs={12}
                  md={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="262px"
                >
                  <CircularProgress size={50} color="info" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="262px"
                >
                  <CircularProgress size={50} color="info" />
                </Grid>
              </>
            )}

            {userDetails && (
              <>
                <Grid item xs={12} md={4}>
                  <AppDiscount
                    discount={userDetails.discount}
                    discountExpireAt={userDetails.discountExpireAt}
                    userInfo={userInfo}
                    userDisccountError={userDisccountError}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <AppActivateDiscount
                    countdownTimestamp={userDetails.activeTimer}
                    isActive={userDetails.isActive}
                    userInfo={userInfo}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </ActionsDashboardStyle>
      </Container>
    </Page>
  );
}
