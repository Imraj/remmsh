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

  const updateUserDisccountStore = useSelector((state) => state.updateUserDisccount);
  const { error: userDisccountError, success: userDisccountSuccess } = updateUserDisccountStore;

  const updateUserActiveStore = useSelector((state) => state.updateUserActive);
  const { error: updateUserActiveError, success: updateUserActiveSuccess } = updateUserActiveStore;

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
        {error && (
          <Grid item xs={12} sx={{ my: '16px' }}>
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          </Grid>
        )}
        {userDisccountError && (
          <Grid item xs={12} sx={{ my: '16px' }}>
            <Alert variant="outlined" severity="error">
              {userDisccountError}
            </Alert>
          </Grid>
        )}
        {updateUserActiveError && (
          <Grid item xs={12} sx={{ my: '16px' }}>
            <Alert variant="outlined" severity="error">
              {updateUserActiveError}
            </Alert>
          </Grid>
        )}
        {userCheckCodeError && (
          <Grid item xs={12} sx={{ my: '16px' }}>
            <Alert variant="outlined" severity="error">
              {userCheckCodeError}
            </Alert>
          </Grid>
        )}
        {userCheckCodeSuccess && (
          <Grid item xs={12} sx={{ my: '16px' }}>
            <Alert variant="outlined" severity="success">
              Code is vaild
            </Alert>
          </Grid>
        )}

        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            Hi <strong style={{ color: green[400] }}>{userInfo.name}</strong>, Welcome back
          </Typography>
        </Box>
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
                <AppDiscount
                  discount={userDetails.discount}
                  userInfo={userInfo}
                  userDisccountError={userDisccountError}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AppActivateDiscount isActive={userDetails.isActive} userInfo={userInfo} />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
