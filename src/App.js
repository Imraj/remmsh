// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}
