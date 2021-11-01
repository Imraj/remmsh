// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppCreditBalance,
  AppCheckCode,
  AppDiscount,
  AppActivateDiscount
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
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
