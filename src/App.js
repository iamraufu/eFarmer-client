import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';
import PreviousList from './pages/PreviousList';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/menu' element={<Menu />} />
      <Route exact path='/previous-list' element={<PreviousList />} />
    </Routes>
  );
}

export default App;
