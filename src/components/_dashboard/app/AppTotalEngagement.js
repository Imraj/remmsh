import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import likeilled from '@iconify/icons-ant-design/like-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Grid, CircularProgress } from '@mui/material';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(3, 3),
  color: theme.palette.secondary.dark,
  border: `1px solid ${theme.palette.secondary.dark}`,
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
  background: theme.palette.secondary.dark
}));

// ----------------------------------------------------------------------

export default function AppTotalEngagement() {
  const userDetailsStore = useSelector((state) => state.userDetails);
  const { loading, userDetails } = userDetailsStore;

  return (
    <RootStyle>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item>
          <IconWrapperStyle>
            <Icon icon={likeilled} width={24} height={24} />
          </IconWrapperStyle>
        </Grid>
        <Grid item>
          {loading && <CircularProgress size={35} color="secondary" />}
          {userDetails && (
            <Typography variant="h3">
              {userDetails.totalEngagement && userDetails.totalEngagement > 0
                ? userDetails.totalEngagement
                : 0}
            </Typography>
          )}
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Total engagement
          </Typography>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
