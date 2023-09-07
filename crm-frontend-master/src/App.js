
import './App.css';
import Admin from './pages/Admin';
// import Engineer from './pages/Engineer';
import Login from './pages/Login'
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import Coustomer from './pages/Coustmer';
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui/dist/js/coreui.min.js";
import Engineer from './pages/Engineer';


function App() {
  return (
    <Router>
  
    <Routes>
      <Route path="/" element={<Login/>} />
      {localStorage.getItem("userTypes") === "CUSTOMER" && <Route path="/customer" element={<Coustomer/>} />}
      <Route path="/engineer" element={<Engineer />}/>
      {localStorage.getItem("userTypes") === "ENGINEER" && <Route path="/engineer" element={<Engineer/>} />}
      <Route path="/admin" element={<Admin/>} />
      {localStorage.getItem("userTypes") === "ADMIN" && <Route path="/admin" element={<admin/>} />}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
   
  </Router>
    
  );
}

export default App;