import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from './components/CreateUserpage';
import View from './components/Viewpage';
import Profile from './components/Profilepage';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Landingpage/>}/> */}
        <Route path="/View" element={<View/>}/>
        <Route path="/CreateUser" element={<CreateUser/>}/>
        {/* <Route path="/UpdateUser" element={<UpdateUser/>}/> */}
        <Route path="/Profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
