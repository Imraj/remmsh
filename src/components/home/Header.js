import React from 'react';

import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1 }}>
            Remmsh
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
