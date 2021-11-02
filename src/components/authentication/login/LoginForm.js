import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Stack, TextField, IconButton, InputAdornment, Grid, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { login } from '../../../actions/userActions';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard', { replace: true });
    }
  }, [userInfo, navigate]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: ({ email, password }) => {
      dispatch(login(email, password));
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  let { isSubmitting } = formik;

  if (error) {
    isSubmitting = false;
  }
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      {error && (
        <Grid item xs={12} style={{ marginBottom: '16px' }}>
          <Alert variant="outlined" severity="error">
            {error}
          </Alert>
        </Grid>
      )}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
