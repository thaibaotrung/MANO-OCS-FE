import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmpListing from './EmpListing';
import EmpCreate from './EmpCreate';
import EmpDetail from './EmpDetail';
import EmpEdit from './EmpEdit';
import EmpScale from './EmpScale';
import UploadTOSCA from './UploadTOSCA';
import Navbar from './components/NavBar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className='App'>
      <h1>VIRTUAL NETWORK FUNCTION MANAGER</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/vnf' element={<EmpListing />}></Route>
          <Route path='vnfc'>
            <Route path=':name' element={<EmpDetail />} />
          </Route>
          <Route path='scale'>
            <Route path=':name' element={<EmpScale />} />
          </Route>
          <Route path='/employee/create' element={<EmpCreate />}></Route>
          <Route path='/vnfd' element={<UploadTOSCA />}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
          <Route path='/' element={<Navbar />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
