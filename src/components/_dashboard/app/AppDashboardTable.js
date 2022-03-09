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
  TextField
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

export default function AppDashboardTable() {
  const userDetailsStore = useSelector((state) => state.userDetails);
  const { loading, userDetails } = userDetailsStore;

  const userPlansStore = useSelector((state) => state.getPlans);
  const { userPlans } = userPlansStore;

  const [timeValue, setTimeValue] = useState(new Date());

  const deletePlan = (id) => {};

  const copyPlanUrl = (id) => {};

  console.log('My User Details');
  console.log(userDetails);

  console.log('userPlansStore', userPlansStore);

  return (
    <>
      {userDetails ? (
        <>
          <Box component="span">{loading && <Button>{userDetails[0].name}</Button>}</Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Total Seen</TableCell>
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
                  <TableCell>{userDetails.totalSeen}</TableCell>
                  <TableCell>{userDetails.totalEngagement}</TableCell>
                  <TableCell>{userDetails.totalActivation}</TableCell>
                  <TableCell>
                    <TextField value={userDetails.discount} />
                  </TableCell>
                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Expiration date"
                        value={timeValue}
                        onChange={(newValue) => {
                          setTimeValue(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell>
                    <Button>
                      <FileCopyIcon onClick={copyPlanUrl(userDetails.id)} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        ''
      )}

      {userPlans
        ? userPlans.map((plan) => (
            <>
              <Box component="span">
                <Button>{plan.name}</Button>
              </Box>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
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
                      <TableCell>{plan.totalEngagement}</TableCell>
                      <TableCell>{plan.totalActivation}</TableCell>
                      <TableCell>
                        <TextField value={plan.discount} />
                      </TableCell>
                      <TableCell>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Expiration date"
                            value={timeValue}
                            onChange={(newValue) => {
                              setTimeValue(newValue);
                            }}
                          />
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell>
                        <Button>
                          <FileCopyIcon onClick={copyPlanUrl(plan.id)} />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
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
