import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import ManageWork from './pages/Admin/managework';
import Login from './pages/Login';
import Sample from './pages/Admin/Sample';
import ManageVolunteer from './pages/Admin/ManageVolunteer';
import ManageRescue from './pages/Admin/ManageRescue';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    {/* <Route path="/login" element={<Login/>}/> */}
    {/* <Route path="register" element={<RegistrationForm/>}/> */}

    {/* <Route path="/" element={<ManageWork/>}/> */}
    {/* <Route path="/" element={<ManageVolunteer/>}/>
       */}
       <Route path="/" element={<ManageRescue/>}/>
      
      
    
    </Routes>
    </BrowserRouter>
    </>
    // <div >
    //   <StudentForm/>
    // </div>
    
  );
}


export default App;
