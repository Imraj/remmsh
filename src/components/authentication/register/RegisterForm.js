import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  Grid,
  Alert
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { register } from '../../../actions/userActions';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard', { replace: true });
    }
  }, [userInfo, navigate]);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    type: Yup.string().required('Type is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: ({ name, email, password, type }) => {
      dispatch(register(name, email, password, type));
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  let { isSubmitting } = formik;

  if (error) {
    isSubmitting = false;
  }

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
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
          </Stack>

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
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <FormControl fullWidth error={Boolean(touched.type && errors.type)}>
            <InputLabel>Type</InputLabel>
            <Select label="Type" {...getFieldProps('type')}>
              <MenuItem value="resturant">Resturant</MenuItem>
              <MenuItem value="coffee">Coffee</MenuItem>
            </Select>
            <FormHelperText>{touched.type && errors.type}</FormHelperText>
          </FormControl>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
