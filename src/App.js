import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import AddEditUser from './pages/AddEditUser';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
        <div className="App">
        <NavBar/>
          <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/add' element={<AddEditUser/>} />
          <Route path='/update/:id' element={<AddEditUser/>} />
          </Routes>
        </div>
    </BrowserRouter>

  );
}

export default App;
