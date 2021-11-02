import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { styled } from '@mui/material/styles';

// material
import { Stack, TextField, Card, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const LoadingButtonStyled = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.info.lighter,
  backgroundColor: theme.palette.info.darker,
  'box-shadow': 'none',
  '&:hover': {
    opacity: 0.9,
    color: theme.palette.info.lighter,
    backgroundColor: theme.palette.info.darker
  }
}));

// ----------------------------------------------------------------------

export default function AppNewUsers({ code }) {
  return (
    <RootStyle>
      <Typography variant="h6" sx={{ opacity: 0.72, mb: '41px' }}>
        Code
      </Typography>
      <Typography variant="h3" sx={{ opacity: 1, mb: '40.5px' }}>
        {code || 'No code'}
      </Typography>
    </RootStyle>
  );
}
// const CheckCodeSchema = Yup.object().shape({
//   code: Yup.string().required('Code is required')
// });

// const formik = useFormik({
//   initialValues: {
//     code: ''
//   },
//   validationSchema: CheckCodeSchema,
//   onSubmit: () => {
//     // navigate('/dashboard', { replace: true });
//   }
// });

// const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
// return (
//   <RootStyle>
//     <Typography variant="h6" sx={{ opacity: 0.72, mb: '20px' }}>
//       Check code
//     </Typography>
//     <FormikProvider value={formik}>
//       <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
//         <Stack spacing={3} height="74px">
//           <TextField
//             sx={{ width: '80%', mx: 'auto' }}
//             size="small"
//             type="text"
//             label="Code"
//             {...getFieldProps('code')}
//             error={Boolean(touched.code && errors.code)}
//             helperText={touched.code && errors.code}
//             color="info"
//           />
//         </Stack>

//         <LoadingButtonStyled
//           size="medium"
//           type="submit"
//           variant="contained"
//           loading={isSubmitting}
//         >
//           Check
//         </LoadingButtonStyled>
//       </Form>
//     </FormikProvider>
//   </RootStyle>
// );
