import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PlusIcon from '@iconify/icons-ant-design/plus-circle-fill';
// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Grid, CircularProgress, IconButton } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  color: theme.palette.info.main,
  border: `1px solid ${theme.palette.info.main}`,
  background: '#ffffff'
}));

// ----------------------------------------------------------------------

export default function AppCreditBalance() {
  const userDetailsStore = useSelector((state) => state.userDetails);
  const { loading, userDetails } = userDetailsStore;

  return (
    <RootStyle>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item>
          {loading && <CircularProgress size={30} color="info" />}
          {userDetails && userDetails.credits && (
            <Typography variant="h4">{userDetails.credits.balance}</Typography>
          )}
        </Grid>
        <Grid item>
          <IconButton component={Link} to="/dashboard/payment" color="info">
            <Icon icon={PlusIcon} width={38} height={38} />
          </IconButton>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
