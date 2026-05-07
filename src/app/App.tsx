import { BrowserRouter } from 'react-router-dom';
import AppProviders from './AppProviders';
import AppRoutes from '../routes/AppRoutes';
import { SplashScreen } from '../view/components/common/SplashScreen';
import '../index.css';

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <SplashScreen />
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
