import React, { useState } from 'react';
import { Box, Card, Typography, Button, Grid, Tooltip } from '@mui/material';

export default function PaymentInfo() {
  const [showTooltip, setShowTooltip] = useState({ account: false, IBN: false });

  const copyToClipboard = (newClipText) => {
    navigator.clipboard.writeText(newClipText);
  };
  const handlecopy = (newClipText, tooltip) => {
    copyToClipboard(newClipText);
    setShowTooltip({ ...showTooltip, [tooltip]: true });

    setTimeout(() => {
      setShowTooltip({ ...showTooltip, [tooltip]: false });
    }, 2000);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        Payment Information
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Bank transfer
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', mt: 3 }} color="primary">
        Remmsh est | مؤسسة رمش لتقنية المعلومات
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          mt: 3
        }}
      >
        <Grid item xs={12} md={6}>
          Account Number at SNB | رقم الحساب في البنك الأهلي
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
          <Box
            sx={{
              py: 1,
              px: 2,
              borderRadius: 1,
              backgroundColor: '#E0E0E0'
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={10} sx={{ textAlign: 'left' }}>
                75300000176007
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'right' }}>
                <Tooltip open={showTooltip.account} title="Copied!" placement="left">
                  <Button onClick={() => handlecopy('75300000176007', 'account')}>Copy</Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          International Account Number | (IBAN) رقم الحساب الدولي
        </Grid>
        <Grid item xs={12} md={6} sx={{ mb: 2, textAlign: 'right' }}>
          <Box
            sx={{
              py: 1,
              px: 2,
              borderRadius: 1,
              backgroundColor: '#E0E0E0'
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={10} sx={{ textAlign: 'left' }}>
                SA7210000075300000176007
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'right' }}>
                <Tooltip open={showTooltip.IBN} title="Copied!" placement="left">
                  <Button onClick={() => handlecopy('SA7210000075300000176007', 'IBN')}>
                    Copy
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2">
            * After transfer send the receipt to <strong>0576808059</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ textAlign: 'right' }}>
            بعد التحويل الرجاء ارسال الفاتورة الى <strong>0576808059</strong> *
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
