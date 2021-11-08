import { ToastContainer } from 'material-react-toastify';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import 'material-react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ToastContainer
        position="top-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}
