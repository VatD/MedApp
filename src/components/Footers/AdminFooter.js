/*eslint-disable*/
import React from 'react';

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
	return (
		<footer className='footer'>
			<Row className='align-items-center justify-content-xl-between'>
				<Col xl='6'>
					<div className='copyright text-center text-xl-left text-muted'>
						© {new Date().getFullYear()}{' '}
							<Link to ="/admin/index">
								MedApp
							</Link>
					</div>
				</Col>

				<Col xl='6'>
					<Nav className='nav-footer justify-content-center justify-content-xl-end'>
						<NavItem>
							<NavLink
								href='https://github.com/VatD/MedApp'
								rel='noopener noreferrer'
								target='_blank'
							>
								<FontAwesomeIcon icon={faGithub} /> Github
							</NavLink>
						</NavItem>
					</Nav>
				</Col>
			</Row>
		</footer>
	);
};

export default Footer;
