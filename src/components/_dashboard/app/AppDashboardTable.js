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
  IconButton
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

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import {
  updatePlanDiscount,
  updatePlanActivate,
  updatePlanExpirationDate,
  deletePlan
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
  }, [userDetails, userPlans]);

  const discountChanged = (index, id) => (e) => {
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

  const switchChanged = (index, id) => (e) => {
    console.log('SC::::', e.target.checked);
    dispatch(updatePlanActivate(id, e.target.checked));
  };

  const deletePlan = (id) => {
    dispatch(deletePlan(id));
  };

  return (
    <>
      {suserPlans
        ? suserPlans.map((plan, index) => (
            <>
              <Box component="span">
                <Typography variant="h4" align="center">
                  {plan.name}
                </Typography>
                {userInfo.name === plan.name ? (
                  <></>
                ) : (
                  <IconButton>
                    <DeleteIcon onClick={() => deletePlan(plan._id)} />
                  </IconButton>
                )}
              </Box>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {userInfo.name === plan.name ? <TableCell>Total Seen</TableCell> : ''}
                      <TableCell>Total Engagement</TableCell>
                      <TableCell>Total activation</TableCell>
                      <TableCell>% Rate</TableCell>
                      <TableCell>Exp. Date</TableCell>
                      <TableCell>Copy Link</TableCell>
                      <TableCell>Offline</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {userInfo.name === plan.name ? <TableCell>{plan.totalSeen}</TableCell> : ''}
                      <TableCell>{plan.totalEngagement}</TableCell>
                      <TableCell>{plan.totalActivation}</TableCell>
                      <TableCell>
                        <TextField
                          value={plan.discount}
                          onChange={() => discountChanged(index, plan._id)}
                        />
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
                      <TableCell>
                        <Button>
                          <FileCopyIcon onClick={() => copyPlanUrl(plan._id)} />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Switch onChange={() => switchChanged(index, plan._id)} defaultChecked />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ))
        : ''}
    </>
  );
}
