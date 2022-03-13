import * as Yup from 'yup';
import { useState, useEffect, useCallback } from 'react';
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
  FormControlLabel,
  Checkbox,
  Select,
  FormHelperText,
  Grid,
  Alert,
  Box
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { register } from '../../../actions/userActions';
import Uploader from './Uploader';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;
  const [afiles, setAFiles] = useState(['hello']);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard', { replace: true });
    }
  }, [userInfo, navigate]);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('English name is required'),
    nameAr: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Arabic name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    type: Yup.string().required('Type is required'),
    location: Yup.string().required('Location is required'),
    district: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('English district is required'),
    districtAr: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Arabic district is required'),
    instagram: Yup.string(),
    snapchat: Yup.string(),
    twitter: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      nameAr: '',
      type: '',
      email: '',
      password: '',
      location: '',
      district: '',
      districtAr: '',
      ShowSocialMediaLinkes: false,
      instagram: '',
      snapchat: '',
      twitter: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: ({
      name,
      nameAr,
      email,
      password,
      type,
      location,
      district,
      districtAr,
      instagram,
      snapchat,
      twitter
    }) => {
      const config = {
        headers: {
          'Content-Type': `multipart/form-data`
        }
      };
      const formData = new FormData();

      formData.append('name', name);
      formData.append('nameAr', nameAr);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('type', type);
      formData.append('location', location);
      formData.append('district', district);
      formData.append('districtAr', districtAr);
      formData.append('instagram', instagram);
      formData.append('snapchat', snapchat);
      formData.append('twitter', twitter);
      for (let i = 0; i < afiles.length; i += 1) {
        formData.append('image[]', afiles[i]);
      }

      dispatch(register(formData));

      // upload file
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;
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
      <Form autoComplete="on" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="English name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              dir="rtl"
              fullWidth
              label="Arabic name"
              {...getFieldProps('nameAr')}
              error={Boolean(touched.nameAr && errors.nameAr)}
              helperText={touched.nameAr && errors.nameAr}
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
          <TextField
            fullWidth
            label="Location URL"
            placeholder="https://www.google.com/maps/@6.5306624,3.3783808,12z"
            {...getFieldProps('location')}
            error={Boolean(touched.location && errors.location)}
            helperText={touched.location && errors.location}
          />

          <FormControl fullWidth error={Boolean(touched.type && errors.type)}>
            <InputLabel>Type</InputLabel>
            <Select label="Type" {...getFieldProps('type')}>
              <MenuItem value="resturant">Resturant</MenuItem>
              <MenuItem value="coffee">Coffee</MenuItem>
              <MenuItem value="lounge">Lounge</MenuItem>
            </Select>
            <FormHelperText>{touched.type && errors.type}</FormHelperText>
          </FormControl>

          <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
            <Uploader afiles={afiles} setAFiles={setAFiles} />
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="English district"
              {...getFieldProps('district')}
              error={Boolean(touched.district && errors.district)}
              helperText={touched.district && errors.district}
            />
            <TextField
              dir="rtl"
              fullWidth
              label="Arabic district"
              {...getFieldProps('districtAr')}
              error={Boolean(touched.districtAr && errors.districtAr)}
              helperText={touched.districtAr && errors.districtAr}
            />
          </Stack>
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps('ShowSocialMediaLinkes')}
                checked={values.ShowSocialMediaLinkes}
              />
            }
            label="Show social media linkes"
          />

          {values.ShowSocialMediaLinkes && (
            <>
              <TextField
                fullWidth
                label="Instagram"
                {...getFieldProps('instagram')}
                error={Boolean(touched.instagram && errors.instagram)}
                helperText={touched.instagram && errors.instagram}
              />

              <TextField
                fullWidth
                label="Snapchat"
                {...getFieldProps('snapchat')}
                error={Boolean(touched.snapchat && errors.snapchat)}
                helperText={touched.snapchat && errors.snapchat}
              />

              <TextField
                fullWidth
                label="Twitter"
                {...getFieldProps('twitter')}
                error={Boolean(touched.twitter && errors.twitter)}
                helperText={touched.twitter && errors.twitter}
              />
            </>
          )}

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
