import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import eyeOutline from '@iconify/icons-ant-design/eye-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Grid, CircularProgress } from '@mui/material';
// utils
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(3, 3),
  color: theme.palette.lightWarning.main,
  border: `1px solid ${theme.palette.lightWarning.main}`,
  background: '#ffffff'
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  color: '#ffffff',
  background: theme.palette.lightWarning.main
}));

// ----------------------------------------------------------------------

export default function AppTotalSeen() {
  const userDetailsStore = useSelector((state) => state.userDetails);
  const { loading, userDetails } = userDetailsStore;

  return (
    <RootStyle>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item>
          <IconWrapperStyle>
            <Icon icon={eyeOutline} width={24} height={24} />
          </IconWrapperStyle>
        </Grid>
        <Grid item>
          {loading && <CircularProgress size={35} color="error" />}
          {userDetails && (
            <Typography variant="h3">
              {userDetails.totalSeen && userDetails.totalSeen > 0 ? userDetails.totalSeen : 0}
            </Typography>
          )}

          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Total seen
          </Typography>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
