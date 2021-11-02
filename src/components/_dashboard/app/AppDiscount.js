import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@mui/material/styles';

// material
import { Stack, TextField, Card, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const LoadingButtonStyled = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.warning.lighter,
  backgroundColor: theme.palette.warning.darker,
  'box-shadow': 'none',
  '&:hover': {
    opacity: 0.9,
    color: theme.palette.warning.lighter,
    backgroundColor: theme.palette.warning.darker
  }
}));

// ----------------------------------------------------------------------

export default function AppDiscount() {
  const discountPercentageSchema = Yup.object().shape({
    discountPercentage: Yup.number()
      .min(0)
      .max(100)
      .required('Discount percentage is required')
      .typeError('Discount percentage must be a number')
  });

  const formik = useFormik({
    initialValues: {
      discountPercentage: ''
    },
    validationSchema: discountPercentageSchema,
    onSubmit: () => {
      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <RootStyle>
      <Typography variant="h6" sx={{ opacity: 0.72, mb: '20px' }}>
        Discount
      </Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} height="74px">
            <TextField
              sx={{ width: '80%', mx: 'auto' }}
              size="small"
              type="text"
              label="Discount percentage"
              {...getFieldProps('discountPercentage')}
              error={Boolean(touched.discountPercentage && errors.discountPercentage)}
              helperText={touched.discountPercentage && errors.discountPercentage}
              color="warning"
            />
          </Stack>

          <LoadingButtonStyled
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Chnage
          </LoadingButtonStyled>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
