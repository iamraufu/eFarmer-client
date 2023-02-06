import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';
import PreviousList from './pages/PreviousList';
import AuthProvider from './context/AuthProvider';
import PrivateOutlet from './components/PrivateOutlet';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />

        <Route path='/' element={<PrivateOutlet />}>
          <Route exact path='menu' element={<Menu />} />
          <Route exact path='previous-list' element={<PreviousList />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
