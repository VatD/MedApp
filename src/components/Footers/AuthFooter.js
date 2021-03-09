/*eslint-disable*/
import React from 'react';

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
	return (
		<>
			<footer className='py-5'>
				<Container>
					<Row className='align-items-center justify-content-xl-between'>
						<Col xl='6'>
							<div className='copyright text-center text-xl-left text-muted'>
								© {new Date().getFullYear()}{' '}
									<Link to ="/">
										MedApp
									</Link>
							</div>
						</Col>
						<Col xl='6'>
							<Nav className='nav-footer justify-content-center justify-content-xl-end'>
								<NavItem>
									<NavLink
										href='https://github.com/VatD/MedApp'
										target='_blank'
									>
										<FontAwesomeIcon icon={faGithub} /> Github
									</NavLink>
								</NavItem>
							</Nav>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
};

export default Login;
