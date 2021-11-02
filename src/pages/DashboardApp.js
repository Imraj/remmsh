import { useSelector } from 'react-redux';
import { Box, Grid, Container, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import Page from '../components/Page';
import {
  // AppCreditBalance,
  AppCheckCode,
  AppDiscount,
  AppActivateDiscount
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            Hi <strong style={{ color: green[400] }}>{userInfo.name}</strong>, Welcome back
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AppCheckCode />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppDiscount />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppActivateDiscount />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
