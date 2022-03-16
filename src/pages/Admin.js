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
import Uploader from '../components/authentication/register/Uploader';

import {
  getRestaurants,
  adminGetRestaurants,
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

  const adminGetRestaurantsStore = useSelector((state) => state.adminGetRestaurants);
  const { restaurants } = adminGetRestaurantsStore;

  const editRestaurantStore = useSelector((state) => state.adminEditRestaurant);
  const { restaurant } = editRestaurantStore;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [arestaurants, setRestaurants] = useState(restaurants);

  const deleteItem = (id) => {
    dispatch(adminDeleteRestaurant(id));
  };

  const [editForm, setEditForm] = useState({ name: 'test' });
  const [afiles, setAFiles] = useState('');

  useEffect(() => {
    dispatch(adminGetRestaurants());
  }, [dispatch]);

  console.log('editForm::editForm::', editForm);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (index, id) => {
    setEditForm(restaurants[index]);
    setOpen(true);
  };
  const statusChanged = (id, index) => {
    console.log('statusChanged:::', id, index);
    restaurants[index].isActive = !restaurants[index].isActive;
    dispatch(adminUpdateRestaurantStatus(id));
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = (id) => {
    dispatch(adminUpdateRestaurant(id, editForm));
    handleClose();
  };

  const deleteImage = (image, index) => {
    setEditForm({ ...editForm, images: editForm.images.filter((im) => im !== image) });
    // editForm.images = editForm.images.filter((im) => im !== image);
  };

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
                      {res.isActive ? (
                        <Switch defaultChecked onClick={() => statusChanged(res._id, index)} />
                      ) : (
                        <Switch onClick={() => statusChanged(res._id, index)} />
                      )}
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
          style={{ overflow: 'scroll' }}
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

                <TextField
                  fullWidth
                  label="Location URL"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, nameAr: e.target.value })}
                />

                <TextField
                  fullWidth
                  label="Notes"
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                />

                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select label="Type">
                    <MenuItem value="resturant">Resturant</MenuItem>
                    <MenuItem value="coffee">Coffee</MenuItem>
                    <MenuItem value="lounge">Lounge</MenuItem>
                  </Select>
                  <FormHelperText />
                </FormControl>

                <Grid container spacing={1}>
                  {editForm.images
                    ? editForm.images.map((image, index) => (
                        <Grid item xs={3}>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/api/uploads/${image}`}
                            width="200"
                            height="50"
                            alt={image}
                            style={{ objectFit: 'cover' }}
                          />
                          <IconButton
                            onClick={(e) =>
                              setEditForm({
                                ...editForm,
                                images: editForm.images.filter((im) => im !== image)
                              })
                            }
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      ))
                    : ''}
                </Grid>

                <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
                  <Uploader afiles={afiles} setAFiles={setAFiles} />
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="English district"
                    value={editForm.district}
                    onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                  />
                  <TextField
                    dir="rtl"
                    fullWidth
                    label="Arabic district"
                    value={editForm.districtAr}
                    onChange={(e) => setEditForm({ ...editForm, districtAr: e.target.value })}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Instagram"
                  value={editForm.instagram}
                  onChange={(e) => setEditForm({ ...editForm, instagram: e.target.value })}
                />

                <TextField
                  fullWidth
                  label="Snapchat"
                  value={editForm.snapchat}
                  onChange={(e) => setEditForm({ ...editForm, snapchat: e.target.value })}
                />

                <TextField
                  fullWidth
                  label="Twitter"
                  value={editForm.twitter}
                  onChange={(e) => setEditForm({ ...editForm, twitter: e.target.value })}
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={() => handleSubmit(editForm._id)}
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
