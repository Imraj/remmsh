import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Icon } from '@iconify/react';
import LeftIcon from '@iconify/icons-ant-design/left';
import Page from '../components/Page';
import { PaymentInfo } from '../components/_dashboard/payment';

export default function Payment() {
  return (
    <Page title="Zoro | Payment">
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Box>
          <Button
            variant="contained"
            component={Link}
            to="/dashboard"
            startIcon={<Icon icon={LeftIcon} />}
          >
            Back
          </Button>
        </Box>
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={12} md={10}>
            <PaymentInfo />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
