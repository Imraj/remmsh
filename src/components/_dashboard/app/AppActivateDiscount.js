import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import poweroffOutlined from '@iconify/icons-ant-design/poweroff-outlined';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { updateUserActive } from '../../../actions/userActions';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AppActivateDiscount({ isActive, userInfo }) {
  const dispatch = useDispatch();

  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.info.darker,
    backgroundColor: theme.palette.info.lighter
  }));

  const IconWrapperStyle = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: '#ffffff',
    background: isActive ? theme.palette.success.dark : theme.palette.error.main
    // backgroundImage: isActive
    //   ? `linear-gradient(135deg, ${alpha(theme.palette.success.dark, 0)} 0%, ${alpha(
    //       theme.palette.success.dark,
    //       0.24
    //     )} 100%)`
    //   : `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    //       theme.palette.error.dark,
    //       0.24
    //     )} 100%)`
  }));
  const handleActicate = () => {
    dispatch(updateUserActive(userInfo._id));
  };
  return (
    <RootStyle>
      <IconWrapperStyle sx={{ my: '47px' }} onClick={handleActicate}>
        {isActive ? 'On' : 'Off'}
      </IconWrapperStyle>
    </RootStyle>
  );
}
