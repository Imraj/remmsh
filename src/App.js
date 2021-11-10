import { ToastContainer } from 'react-toastify';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        icon={false}
        theme="colored"
        closeButton={false}
      />
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}
