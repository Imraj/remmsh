import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  Switch,
  Paper,
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem
} from '@mui/material';
import { Icon } from '@iconify/react';
import checkCircleFilled from '@iconify/icons-ant-design/check-circle-filled';

import { green, pink } from '@mui/material/colors';

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PercentIcon from '@mui/icons-material/Percent';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import GroupIcon from '@mui/icons-material/Group';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import {
  updatePlanDiscount,
  updatePlanActivate,
  updatePlanExpirationDate,
  deletePlan,
  getPlans,
  getUserDetails,
  adminUpdateRestaurantStatus
} from '../../../actions/userActions';

export default function AppDashboardTable() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const userDetailsStore = useSelector((state) => state.userDetails);
  const { loading, userDetails } = userDetailsStore;

  const userPlansStore = useSelector((state) => state.getPlans);
  const { userPlans } = userPlansStore;

  const [timeValue, setTimeValue] = useState(new Date());

  const [suserPlans, setUserPlans] = useState(userPlans);

  const copyPlanUrl = (id) => {};

  console.log('My User Details', userPlans);

  useEffect(() => {
    setUserPlans(userPlans);
  }, [dispatch, userPlans]);

  const discountChanged = (e, index, id) => {
    console.log('eee::', e.target.value);
    const newArr = [...suserPlans];
    newArr[index].discount = e.target.value;
    setUserPlans(newArr);
    if (e.target.value !== null && e.target.value !== '' && parseInt(e.target.value, 10) >= 0) {
      dispatch(updatePlanDiscount(id, e.target.value));
    }
  };

  const dateTimeChanged = (newValue, index, id) => () => {
    console.log('dateTimeChanged:::', newValue);
    const newArr = [...suserPlans];
    newArr[index].discountExpireAt = newValue;
    setUserPlans(newArr);
    // setTimeValue();
    dispatch(updatePlanExpirationDate(id, newValue));
  };

  const switchChanged = (e, index, id) => {
    console.log('SC::::', e.target.checked);
    suserPlans[index].isActive = !suserPlans[index].isActive;
    dispatch(updatePlanActivate(id, e.target.checked));
  };

  const statusChanged = (id, index) => {
    console.log('statusChanged:::', id, index);
    suserPlans[index].isActive = !suserPlans[index].isActive;
    dispatch(adminUpdateRestaurantStatus(id));
  };

  const delPlan = (id) => {
    dispatch(deletePlan(id));
    setTimeout(() => {
      dispatch(getPlans(userInfo._id));
    }, 250);
  };

  const menuCounter = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100
  ];

  return (
    <Container>
      {suserPlans
        ? suserPlans.map((plan, index) => (
            <>
              <Box
                component="div"
                fullWidth
                sx={{
                  p: 2,
                  border: '1px solid grey',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  marginTop: '10px',
                  display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }
                }}
              >
                <>
                  <Box component="span">
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography variant="h5" align="center">
                          {plan.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        {userInfo.name === plan.name ? (
                          <></>
                        ) : (
                          <IconButton align="center" onClick={() => delPlan(plan._id)}>
                            <DeleteIcon color="danger" />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                  <br />

                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography variant="h5" align="center">
                        Statistics
                      </Typography>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid grey',
                          borderRadius: '10px',
                          width: '345px',
                          height: '150px'
                        }}
                      >
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                {userInfo.name === plan.name ? (
                                  <TableCell>
                                    <VisibilityIcon fontSize="large" />
                                  </TableCell>
                                ) : (
                                  ''
                                )}
                                <TableCell>
                                  <GroupIcon fontSize="large" />
                                </TableCell>
                                <TableCell>
                                  <CheckCircleOutlinedIcon fontSize="large" />
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                {userInfo.name === plan.name ? (
                                  <TableCell>{plan.totalSeen}</TableCell>
                                ) : (
                                  ''
                                )}
                                <TableCell>{plan.totalEngagement}</TableCell>
                                <TableCell>{plan.totalActivation}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" align="center">
                        Change
                      </Typography>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid grey',
                          borderRadius: '10px',
                          width: '335px',
                          height: '100px'
                        }}
                      >
                        <TableContainer>
                          <TableBody>
                            <TableRow spacing={1}>
                              <TableCell>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={plan.discount}
                                  label="0%"
                                  onChange={(e) => discountChanged(e, index, plan._id)}
                                >
                                  {menuCounter.map((i) => (
                                    <MenuItem value={i}>{i}</MenuItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Expiration date"
                                    value={plan.discountExpireAt}
                                    onChange={(newValue) => {
                                      const newArr = [...suserPlans];
                                      newArr[index].discountExpireAt = newValue;
                                      setUserPlans(newArr);
                                      dispatch(updatePlanExpirationDate(plan._id, newValue));
                                    }}
                                  />
                                </LocalizationProvider>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </TableContainer>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" align="center">
                        Action
                      </Typography>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid grey',
                          borderRadius: '10px',
                          width: '335px',
                          height: '100px'
                        }}
                      >
                        <TableContainer>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <Button>
                                  <FileCopyIcon onClick={() => copyPlanUrl(plan._id)} />
                                </Button>
                              </TableCell>
                              <TableCell>
                                {plan.isActive ? (
                                  <Switch
                                    defaultChecked
                                    onClick={(e) => switchChanged(e, plan._id, index)}
                                  />
                                ) : (
                                  <Switch onClick={(e) => switchChanged(e, plan._id, index)} />
                                )}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </TableContainer>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              </Box>

              <Box
                component="div"
                fullWidth
                sx={{
                  p: 2,
                  borderRadius: '10px',
                  marginBottom: '20px',
                  marginTop: '10px',
                  display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' }
                }}
              >
                <>
                  <Box component="span">
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography variant="h5" align="center">
                          {plan.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        {userInfo.name === plan.name ? (
                          <></>
                        ) : (
                          <IconButton align="center" onClick={() => delPlan(plan._id)}>
                            <DeleteIcon color="danger" />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                  <br /> 9
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography variant="h5" align="center">
                        Statistics
                      </Typography>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid grey',
                          borderRadius: '10px',
                          width: '345px',
                          height: '150px'
                        }}
                      >
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                {userInfo.name === plan.name ? (
                                  <TableCell>
                                    <VisibilityIcon fontSize="large" />
                                  </TableCell>
                                ) : (
                                  ''
                                )}
                                <TableCell>
                                  <GroupIcon fontSize="large" />
                                </TableCell>
                                <TableCell>
                                  <CheckCircleOutlinedIcon fontSize="large" />
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                {userInfo.name === plan.name ? (
                                  <TableCell>{plan.totalSeen}</TableCell>
                                ) : (
                                  ''
                                )}
                                <TableCell>{plan.totalEngagement}</TableCell>
                                <TableCell>{plan.totalActivation}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" align="center">
                        Change
                      </Typography>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid grey',
                          borderRadius: '10px',
                          width: '335px',
                          height: '100px'
                        }}
                      >
                        <TableContainer>
                          <TableBody>
                            <TableRow spacing={1}>
                              <TableCell>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={plan.discount}
                                  label="0%"
                                  onChange={(e) => discountChanged(index, plan._id)}
                                >
                                  {menuCounter.map((i) => (
                                    <MenuItem value={i}>{i}</MenuItem>
                                  ))}
                                </Select>
                              </TableCell>
                              <TableCell>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Expiration date"
                                    value={plan.discountExpireAt}
                                    onChange={(newValue) => {
                                      const newArr = [...suserPlans];
                                      newArr[index].discountExpireAt = newValue;
                                      setUserPlans(newArr);
                                      dispatch(updatePlanExpirationDate(plan._id, newValue));
                                    }}
                                  />
                                </LocalizationProvider>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </TableContainer>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" align="center">
                        Action
                      </Typography>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid grey',
                          borderRadius: '10px',
                          width: '335px',
                          height: '100px'
                        }}
                      >
                        <TableContainer>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <Button>
                                  <FileCopyIcon onClick={() => copyPlanUrl(plan._id)} />
                                </Button>
                              </TableCell>
                              {userInfo.name === plan.name ? (
                                <TableCell>
                                  {plan.isActive ? (
                                    <Switch
                                      defaultChecked
                                      onClick={(e) => statusChanged(e, plan._id, index)}
                                    />
                                  ) : (
                                    <Switch onClick={(e) => statusChanged(e, plan._id, index)} />
                                  )}
                                </TableCell>
                              ) : (
                                <TableCell>
                                  {plan.isActive ? (
                                    <Switch
                                      defaultChecked
                                      onClick={(e) => switchChanged(e, plan._id, index)}
                                    />
                                  ) : (
                                    <Switch onClick={(e) => switchChanged(e, plan._id, index)} />
                                  )}
                                </TableCell>
                              )}
                            </TableRow>
                          </TableBody>
                        </TableContainer>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              </Box>
            </>
          ))
        : ''}
    </Container>
  );
}
