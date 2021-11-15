import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import LeftIcon from '@iconify/icons-ant-design/left';
import Page from '../components/Page';

export default function Payment() {
  return (
    <Page title="Zoro | Payment">
      <Container maxWidth="xl">
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
      </Container>
    </Page>
  );
}
