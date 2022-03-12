import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useFormik, Form, FormikProvider } from 'formik';

import {
  Container,
  Paper,
  Switch,
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
  Menu,
  MenuItem,
  Alert,
  Grid,
  TextField,
  Checkbox,
  Stack,
  Select,
  FormControl,
  FormControlLabel,
  InputLabel,
  FormHelperText,
  InputAdornment
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
  getRestaurants,
  adminEditRestaurant,
  adminUpdateRestaurant,
  adminUpdateRestaurantStatus,
  adminDeleteRestaurant
} from '../actions/userActions';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function Admin() {
  const dispatch = useDispatch();

  const getRestaurantsStore = useSelector((state) => state.getRestaurants);
  const { restaurants, error, success } = getRestaurantsStore;

  const editRestaurantStore = useSelector((state) => state.adminEditRestaurant);
  const { restaurant } = editRestaurantStore;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log('ALL::Restaurants::', restaurants, restaurant, userInfo);

  const deleteItem = (id) => {
    console.log('delete::', id);
  };

  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    //  setEditForm(restaurant);
    dispatch(getRestaurants());
  }, []);

  console.log('editForm::editForm::', editForm);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    console.log('handleOpen::', id);
    dispatch(adminEditRestaurant(id));
    setEditForm(restaurant);
  };
  const handleClose = () => setOpen(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('English name is required'),
    nameAr: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Arabic name is required'),
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
      location: '',
      district: '',
      districtAr: '',
      notes: '',
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

      dispatch(adminUpdateRestaurant(formData));

      // upload file
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;
  const { isSubmitting } = formik;

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Approval</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants
              ? restaurants.map((res) => (
                  <TableRow>
                    <TableCell>{res.name}</TableCell>

                    <TableCell>
                      <Switch value={res.isActive} defaultChecked />
                    </TableCell>

                    <TableCell>
                      <IconButton onClick={handleOpen(res._id)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell>
                      <IconButton onClick={deleteItem(res._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : ''}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
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
                      label="English name"
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
                    label="Location URL"
                    {...getFieldProps('location')}
                    error={Boolean(touched.location && errors.location)}
                    helperText={touched.location && errors.location}
                  />

                  <TextField
                    fullWidth
                    label="Notes"
                    {...getFieldProps('notes')}
                    error={Boolean(touched.notes && errors.notes)}
                    helperText={touched.notes && errors.notes}
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

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Update
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Box>
        </Modal>
      </div>
    </Container>
  );
}
