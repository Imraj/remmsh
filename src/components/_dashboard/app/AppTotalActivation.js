import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import checkCircleFilled from '@iconify/icons-ant-design/check-circle-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Grid, CircularProgress } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(3, 3),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppTotalActivation() {
  const userDetailsStore = useSelector((state) => state.userDetails);
  const { loading, userDetails } = userDetailsStore;

  return (
    <RootStyle>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item>
          <IconWrapperStyle>
            <Icon icon={checkCircleFilled} width={24} height={24} />
          </IconWrapperStyle>
        </Grid>
        <Grid item>
          {loading && <CircularProgress size={35} color="error" />}
          {userDetails && <Typography variant="h3">{userDetails.totalActivation}</Typography>}
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Total activation
          </Typography>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
