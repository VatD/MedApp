import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { NavbarBrand, Navbar, Container } from 'reactstrap';
import './AuthNavbar.css'
const AdminNavbar = () => {
  const font = "'Alfa Slab One',cursive";
	return (
		<>
			<Navbar className='navbar-top navbar-horizontal navbar-dark' expand='md'>
				<Container className='px-4'>
					<NavbarBrand to='/' tag={Link} className='pt-0' >
						<span style={{color: "white"}}>
							<i class="fas fa-stethoscope fa-2x"></i>
							<span style={{fontFamily: font ,fontSize : "2rem",paddingLeft: "3px" , fontWeight: "normal",textTransform: "none"}}>medApp</span>

						</span>
					</NavbarBrand>
				</Container>
			</Navbar>
		</>
	);
};

export default AdminNavbar;
