/*eslint-disable*/
import React, { useState } from 'react';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
// nodejs library to set properties for components
import { PropTypes } from 'prop-types';
import './Sidebar.css'
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Media,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Progress,
	Table,
	Container,
	Row,
	Col,
} from 'reactstrap';
import { useAuthContext, useMutateAuthContext } from '../../context/auth';

var ps;

const Sidebar = (props) => {
	const { updateAuthState } = useMutateAuthContext();
	const { rememberMe } = useAuthContext();
	const [collapseOpen, setCollapseOpen] = useState();
	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName) => {
		return props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
	};
	// toggles collapse between opened and closed (true/false)
	const toggleCollapse = () => {
		setCollapseOpen((data) => !data);
	};
	// closes the collapse
	const closeCollapse = () => {
		setCollapseOpen(false);
	};
	// creates the links that appear in the left menu / Sidebar
	const createLinks = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === '/auth') return null;
			return (
				<NavItem key={key}>
					<NavLink
						to={prop.layout + prop.path}
						tag={NavLinkRRD}
						onClick={closeCollapse}
						activeClassName='active'
					>
						<i className={prop.icon} />
						{prop.name}
					</NavLink>
				</NavItem>
			);
		});
	};

	const { bgColor, routes, logo } = props;
	let navbarBrandProps;
	if (logo && logo.innerLink) {
		navbarBrandProps = {
			to: logo.innerLink,
			tag: Link,
		};
	} else if (logo && logo.outterLink) {
		navbarBrandProps = {
			href: logo.outterLink,
			target: '_blank',
		};
	}

	const font = "'Alfa Slab One', cursive";

	return (
		<Navbar
			className='navbar-vertical fixed-left navbar-light bg-white'
			expand='md'
			id='sidenav-main'
		>
			<Container fluid>
				{/* Toggler */}
				<button
					className='navbar-toggler'
					type='button'
					onClick={toggleCollapse}
				>
					<span className='navbar-toggler-icon' />
				</button>
				{/* Brand */}
				{logo ? (
					<NavbarBrand className='pt-0' {...navbarBrandProps}>
						<span style={{color: "#11cdef"}}>
							<i class="fas fa-stethoscope fa-2x"></i>
							<span style={{fontFamily: font , fontSize : "2rem",paddingLeft: "3px"}}>medApp</span>
							
						</span>
					</NavbarBrand>
				) : null}
				{/* User */}
				<Nav className='align-items-center d-md-none'>
					<UncontrolledDropdown nav>
						<DropdownToggle nav>
							<Media className='align-items-center'>
								<span className='avatar avatar-sm rounded-circle'>
									<img
										alt='...'
										src={
											require('../../assets/img/user-tie-solid.svg')
												.default
										}
									/>
								</span>
							</Media>
						</DropdownToggle>
						<DropdownMenu className='dropdown-menu-arrow' right>
							<DropdownItem className='noti-title' header tag='div'>
								<h6 className='text-overflow m-0'>Welcome!</h6>
							</DropdownItem>
							<DropdownItem to='/admin/profile' tag={Link}>
								<i className='ni ni-single-02' />
								<span>My profile</span>
							</DropdownItem>
							<DropdownItem divider />
							<DropdownItem
								onClick={(e) => {
									e.preventDefault();
									updateAuthState(
										{ user: null, token: null },
										rememberMe
									);
								}}
							>
								<i className='ni ni-user-run' />
								<span>Logout</span>
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>
				{/* Collapse */}
				<Collapse navbar isOpen={collapseOpen}>
					{/* Collapse header */}
					<div className='navbar-collapse-header d-md-none'>
						<Row>
							{logo ? (
								<Col className='collapse-brand' xs='6'>
								<NavbarBrand className='pt-0' {...navbarBrandProps}>
									<span style={{color: "#11cdef"}}>
										<i class="fas fa-stethoscope fa-2x"></i>
										<span style={{fontFamily: font ,fontSize : "2rem",paddingLeft: "3px"}}>medApp</span>
									</span>
								</NavbarBrand>
								</Col>
							) : null}
							<Col className='collapse-close' xs='6'>
								<button
									className='navbar-toggler'
									type='button'
									onClick={toggleCollapse}
								>
									<span />
									<span />
								</button>
							</Col>
						</Row>
					</div>
					{/* Navigation */}
					<Nav navbar>{createLinks(routes)}</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
};

Sidebar.defaultProps = {
	routes: [{}],
};

Sidebar.propTypes = {
	// links that will be displayed inside the component
	routes: PropTypes.arrayOf(PropTypes.object),
	logo: PropTypes.shape({
		// innerLink is for links that will direct the user within the app
		// it will be rendered as <Link to="...">...</Link> tag
		innerLink: PropTypes.string,
		// outterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,
		// the image src of the logo
		imgSrc: PropTypes.string.isRequired,
		// the alt for the img
		imgAlt: PropTypes.string.isRequired,
	}),
};

export default Sidebar;
