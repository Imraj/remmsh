import moment from 'moment';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { updateUserActive } from '../../../actions/userActions';
import CountDownTimer from './CountDownTimer';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AppActivateDiscount({ countdownTimestamp, isActive, userInfo }) {
  const dispatch = useDispatch();

  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    // paddingTop: theme.spacing(2),
    color: theme.palette.info.darker,
    backgroundColor: theme.palette.info.lighter
  }));

  const IconWrapperStyle = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(18),
    height: theme.spacing(18),
    justifyContent: 'center',
    color: '#ffffff',
    background: isActive ? theme.palette.success.dark : theme.palette.error.main
  }));
  const handleActicate = () => {
    dispatch(updateUserActive(userInfo._id));
  };

  return (
    <RootStyle>
      <IconWrapperStyle sx={{ my: '47px' }} onClick={handleActicate}>
        <Typography variant="h6">{isActive ? 'On' : 'Off'}</Typography>
        {(isActive || (!isActive && countdownTimestamp > moment().valueOf())) && (
          <Typography>
            <CountDownTimer
              variant="body2"
              sx={{ fontSize: 20 }}
              countdownTimestampMs={countdownTimestamp > 0 ? countdownTimestamp : 0}
            />
          </Typography>
        )}
      </IconWrapperStyle>
    </RootStyle>
  );
}
