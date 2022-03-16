import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@mui/material/styles';
import { Stack, TextField, Card, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { addPlan, getPlans } from '../../../actions/userActions';
import { USER_CREATE_PLAN_RESET } from '../../../constants/userConstants';

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

export default function AppName() {
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const userDetailsStore = useSelector((state) => state.userDetails);
  const { loading, userDetails } = userDetailsStore;

  const dispatch = useDispatch();

  const CheckNameSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      uid: userDetails._id
    },
    validationSchema: CheckNameSchema,
    onSubmit: ({ name, uid }, actions) => {
      dispatch(addPlan({ name, uid: userDetails._id }));
      actions.resetForm({
        values: {
          name: '',
          uid: ''
        }
      });

      setTimeout(() => {
        dispatch(getPlans(userInfo._id));
      }, 250);
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const { isSubmitting } = formik;
  /* if (userCheckNameError || userCheckNameSuccess) {
    isSubmitting = false;
  } */

  return (
    <RootStyle>
      <Typography variant="h6" sx={{ opacity: 0.72, mb: '20px' }}>
        Add Name
      </Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} height="48px">
            <TextField
              sx={{ width: '80%', mx: 'auto' }}
              size="small"
              type="text"
              label="Name"
              {...getFieldProps('name')}
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
