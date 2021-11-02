import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@mui/material/styles';

// material
import { Stack, TextField, Card, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { updateUserDisccount } from '../../../actions/userActions';
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

export default function AppDiscount({ discount, userInfo, userDisccountError }) {
  const dispatch = useDispatch();

  const discountPercentageSchema = Yup.object().shape({
    discountPercentage: Yup.number()
      .min(1)
      .max(100)
      .required('Discount percentage is required')
      .typeError('Discount percentage must be a number')
  });

  const formik = useFormik({
    initialValues: {
      discountPercentage: discount || ''
    },
    validationSchema: discountPercentageSchema,
    onSubmit: ({ discountPercentage: discount }) => {
      dispatch(updateUserDisccount(userInfo._id, { discount }));
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  let { isSubmitting } = formik;

  if (userDisccountError) {
    isSubmitting = false;
  }

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
