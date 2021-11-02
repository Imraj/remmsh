import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import poweroffOutlined from '@iconify/icons-ant-design/poweroff-outlined';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { updateUserActive } from '../../../actions/userActions';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));

// ----------------------------------------------------------------------

export default function AppActivateDiscount({ isActive, userInfo }) {
  const dispatch = useDispatch();

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
    color: isActive ? theme.palette.error.dark : '#161C24',
    backgroundImage: isActive
      ? `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
          theme.palette.error.dark,
          0.24
        )} 100%)`
      : `linear-gradient(135deg, ${alpha('#161C24', 0)} 0%, ${alpha('#161C24', 0.24)} 100%)`
  }));
  const handleActicate = () => {
    dispatch(updateUserActive(userInfo._id));
  };
  return (
    <RootStyle>
      <Typography variant="h6" sx={{ opacity: 0.72, mb: '42px' }}>
        {isActive ? 'Deactivate' : 'Activate'} discount
      </Typography>
      <IconWrapperStyle onClick={handleActicate}>
        <Icon icon={poweroffOutlined} width={24} height={24} />
      </IconWrapperStyle>
    </RootStyle>
  );
}
