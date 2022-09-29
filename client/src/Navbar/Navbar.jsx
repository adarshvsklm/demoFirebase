import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import firebaseConfig from '../firebase/config';

function Appbar() {
    const navigate = useNavigate()

    const handleLogout =()=>{
        firebaseConfig.auth().signOut().then(() => {
            // Sign-out successful.
            navigate('/login')
          }).catch((error) => {
            // An error happened.
            console.log(error);
          });
    }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link   onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link href="#link" className='float-right' onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;