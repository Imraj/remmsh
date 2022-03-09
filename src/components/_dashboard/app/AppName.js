import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@mui/material/styles';
import { Stack, TextField, Card, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { addPlan } from '../../../actions/userActions';
import { USER_CHECK_CODE_RESET } from '../../../constants/userConstants';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const LoadingButtonStyled = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.info.lighter,
  backgroundColor: theme.palette.info.darker,
  'box-shadow': 'none',
  '&:hover': {
    opacity: 0.9,
    color: theme.palette.info.lighter,
    backgroundColor: theme.palette.info.darker
  }
}));

// ----------------------------------------------------------------------

export default function AppName({ userCheckCodeError, userCheckCodeSuccess }) {
  const userDetailsStore = useSelector((state) => state.userDetails);
  const { loading, userDetails } = userDetailsStore;

  console.log('AppName User Details', userDetails);

  const dispatch = useDispatch();

  const CheckNameSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
  });

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: CheckNameSchema,
    onSubmit: ({ name }, actions) => {
      dispatch(addPlan({ name }));
      actions.resetForm({
        values: {
          name: ''
        }
      });
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  let { isSubmitting } = formik;

  if (userCheckCodeError || userCheckCodeSuccess) {
    isSubmitting = false;
  }

  return (
    <RootStyle>
      <Typography variant="h6" sx={{ opacity: 0.72, mb: '20px' }}>
        Add Name
      </Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} height="74px">
            <TextField
              sx={{ width: '80%', mx: 'auto' }}
              size="small"
              type="text"
              label="Name"
              {...getFieldProps('code')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              color="info"
            />
          </Stack>

          <LoadingButtonStyled
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add
          </LoadingButtonStyled>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
