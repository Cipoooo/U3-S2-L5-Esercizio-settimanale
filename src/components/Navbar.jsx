import {Navbar, Container, Nav,} from 'react-bootstrap';
import {FaCloudSun} from 'react-icons/fa'
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';

const NavBar = () =>{

    return(
    <>
    <Navbar style={{backgroundColor: 'lightgray'}} className='py-3' data-bs-theme="dark">
        <Container className='container-fluid me-0 ms-3 d-flex justify-content-start align-items-middle'>
          <FaCloudSun className='text-white me-2 fs-1'></FaCloudSun>
          <Link to="/" style={{textDecoration:"none", color:"midnightblue"}} className='fs-3 fw-bold'>EpiForecast</Link>
          <Nav className="me-auto ms-2 h-100">
            <Link to="/" style={{textDecoration:"none"}} className='text-black fs-4 fw-medium ms-3 py-0'>Home</Link>
            <Link to="*"  style={{textDecoration:"none"}} className='text-black fs-4 fw-medium ms-3 py-0'>Features</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    );
};
export default NavBar;