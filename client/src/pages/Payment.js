import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import LeftIcon from '@iconify/icons-ant-design/left';
import Page from '../components/Page';
import { PaymentInfo } from '../components/_dashboard/payment';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(0)
  }
}));

export default function Payment() {
  return (
    <Page title="Zoro | Payment">
      <StyledContainer maxWidth="xl">
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
      </StyledContainer>
    </Page>
  );
}
