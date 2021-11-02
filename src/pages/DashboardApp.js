import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Container, Typography, Alert, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import Page from '../components/Page';
import {
  // AppCreditBalance,
  AppCheckCode,
  AppDiscount,
  AppActivateDiscount
} from '../components/_dashboard/app';
import { getUserDetails } from '../actions/userActions';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const userDetailsStore = useSelector((state) => state.userDetails);

  const { loading, error, userDetails } = userDetailsStore;

  useEffect(() => {
    dispatch(getUserDetails(userInfo._id));
  }, [dispatch]);
  return (
    <Page title="Zoro | Dashboard">
      <Container maxWidth="xl">
        {error && (
          <Grid item xs={12} sx={{ my: '16px' }}>
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          </Grid>
        )}
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            Hi <strong style={{ color: green[400] }}>{userInfo.name}</strong>, Welcome back
          </Typography>
        </Box>
        <Grid container spacing={3}>
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
                <CircularProgress size={50} color="warning" />
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
                <CircularProgress size={50} color="error" />
              </Grid>
            </>
          )}

          {userDetails && (
            <>
              <Grid item xs={12} md={4}>
                <AppCheckCode code={userDetails.code} />
              </Grid>
              <Grid item xs={12} md={4}>
                <AppDiscount discount={userDetails.discount} />
              </Grid>
              <Grid item xs={12} md={4}>
                <AppActivateDiscount isActive={userDetails.isActive} />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
