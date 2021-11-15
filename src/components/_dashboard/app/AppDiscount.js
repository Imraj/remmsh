import moment from 'moment';
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
  paddingTop: theme.spacing(2),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const LoadingButtonStyled = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.info.lighter,
  width: '30%',
  margin: 'auto',
  backgroundColor: theme.palette.info.darker,
  'box-shadow': 'none',
  '&:hover': {
    opacity: 0.9,
    color: theme.palette.info.lighter,
    backgroundColor: theme.palette.info.darker
  }
}));

// ----------------------------------------------------------------------

export default function AppDiscount({ discountExpireAt, discount, userInfo, userDisccountError }) {
  const dispatch = useDispatch();

  const discountPercentageSchema = Yup.object().shape({
    discountPercentage: Yup.number()
      .min(1)
      .max(100)
      .required('Discount percentage is required')
      .typeError('Discount percentage must be a number'),
    discountExpireAt: Yup.date().required('Expiry date is required')
  });

  const formik = useFormik({
    initialValues: {
      discountPercentage: discount || '',
      discountExpireAt: moment(discountExpireAt).format('YYYY-MM-DDTHH:mm') || ''
    },
    validationSchema: discountPercentageSchema,
    onSubmit: ({ discountPercentage: discount, discountExpireAt }) => {
      dispatch(updateUserDisccount(userInfo._id, { discount, discountExpireAt }));
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
        <Form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <TextField
            sx={{ width: '80%', mx: 'auto' }}
            size="small"
            type="text"
            label="Discount percentage"
            {...getFieldProps('discountPercentage')}
            error={Boolean(touched.discountPercentage && errors.discountPercentage)}
            helperText={touched.discountPercentage && errors.discountPercentage}
            color="info"
          />

          <TextField
            id="discountExpireAt"
            size="small"
            label="Expire at"
            type="datetime-local"
            sx={{ width: '80%', mx: 'auto', my: '20px' }}
            InputLabelProps={{
              shrink: true
            }}
            {...getFieldProps('discountExpireAt')}
            error={Boolean(touched.discountExpireAt && errors.discountExpireAt)}
            helperText={touched.discountExpireAt && errors.discountExpireAt}
            color="info"
          />
          <LoadingButtonStyled
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save
          </LoadingButtonStyled>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
