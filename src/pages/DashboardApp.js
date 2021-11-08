import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Container, Typography, Alert, CircularProgress, Card } from '@mui/material';
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { toast } from 'material-react-toastify';
import Page from '../components/Page';
import {
  // AppCreditBalance,
  AppCheckCode,
  AppDiscount,
  AppActivateDiscount
} from '../components/_dashboard/app';
import { getUserDetails } from '../actions/userActions';
import {
  USER_DETAILS_RESET,
  USER_CHECK_CODE_RESET,
  USER_UPDATE_DISCOUNT_RESET,
  USER_UPDATE_ACTIVE_RESET
} from '../constants/userConstants';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  // padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

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
    dispatch({ type: USER_DETAILS_RESET });
  }, [dispatch, userInfo, userDisccountSuccess, updateUserActiveSuccess]);

  const showToast = (text, severity) => {
    toast[severity](text, {
      position: 'top-left',
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true
    });
  };

  if (error) showToast(error, 'error');
  if (userCheckCodeError) {
    showToast(userCheckCodeError, 'error');
    dispatch({ type: USER_CHECK_CODE_RESET });
  }
  if (userDisccountError) {
    showToast(userDisccountError, 'error');
    dispatch({ type: USER_UPDATE_DISCOUNT_RESET });
  }
  if (updateUserActiveError) {
    showToast(updateUserActiveError, 'error');
    dispatch({ type: USER_UPDATE_ACTIVE_RESET });
  }
  if (userCheckCodeSuccess) {
    showToast('Code is vaild', 'success');
    dispatch({ type: USER_CHECK_CODE_RESET });
  }
  if (updateUserActiveSuccess) {
    showToast('User status changed', 'info');
    dispatch({ type: USER_UPDATE_ACTIVE_RESET });
  }
  return (
    <Page title="Zoro | Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            Hi <strong style={{ color: green[400] }}>{userInfo.name}</strong>, Welcome back
          </Typography>
        </Box>

        <RootStyle>
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
        </RootStyle>
      </Container>
    </Page>
  );
}
