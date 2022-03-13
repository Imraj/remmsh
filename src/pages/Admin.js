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

  const [arestaurants, setRestaurants] = useState(restaurants);

  console.log('ALL::Restaurants::', restaurants, restaurant, userInfo);

  const deleteItem = (id) => {
    console.log('delete::', id);
  };

  const [editForm, setEditForm] = useState({ name: 'test' });

  useEffect(() => {
    // setRestaurants(restaurants);
    dispatch(getRestaurants());
  }, [dispatch]);

  console.log('editForm::editForm::', editForm);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (index, id) => {
    setEditForm(restaurants[index]);
    setOpen(true);
    console.log('handleOpen::', index, id, restaurants[index]);
    // dispatch(adminEditRestaurant(id));
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    console.log('handleSubmit');
  };

  // const { errors, touched, values, handleSubmit, getFieldProps } = formik;

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
              ? restaurants.map((res, index) => (
                  <TableRow key={index}>
                    <TableCell>{res.name}</TableCell>

                    <TableCell>
                      <Switch value={res.isActive} defaultChecked />
                    </TableCell>

                    <TableCell>
                      <IconButton onClick={() => handleOpen(index, res._id)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell>
                      <IconButton onClick={() => deleteItem(res._id)}>
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
            <div>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="English name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                  <TextField dir="rtl" fullWidth label="Arabic name" value={editForm.nameAr} />
                </Stack>

                <TextField fullWidth label="Location URL" value={editForm.location} />

                <TextField fullWidth label="Notes" value={editForm.notes} />

                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select label="Type">
                    <MenuItem value="resturant">Resturant</MenuItem>
                    <MenuItem value="coffee">Coffee</MenuItem>
                    <MenuItem value="lounge">Lounge</MenuItem>
                  </Select>
                  <FormHelperText />
                </FormControl>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField fullWidth label="English district" value={editForm.district} />
                  <TextField
                    dir="rtl"
                    fullWidth
                    label="Arabic district"
                    value={editForm.districtAr}
                  />
                </Stack>

                <TextField fullWidth label="Instagram" value={editForm.instagram} />

                <TextField fullWidth label="Snapchat" value={editForm.snapchat} />

                <TextField fullWidth label="Twitter" value={editForm.twitter} />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onSubmit={() => handleSubmit}
                >
                  Update
                </LoadingButton>
              </Stack>
            </div>
          </Box>
        </Modal>
      </div>
    </Container>
  );
}
