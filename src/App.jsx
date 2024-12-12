import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import NavBar from './components/Navbar';
import Home from './components/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Details from './components/Details';
import NotFound from './components/NotFound';

function App() {
  return(
    <>
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/details/:city' element={<Details />}  />
      <Route path='/*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
};

export default App
