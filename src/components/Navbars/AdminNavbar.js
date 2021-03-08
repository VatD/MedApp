import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Navbar,
	Nav,
	Container,
	Media,
} from 'reactstrap';

import { useAuthContext, useMutateAuthContext } from '../../context/auth';

const AdminNavbar = (props) => {
	const { updateAuthState } = useMutateAuthContext();
	const { rememberMe } = useAuthContext();
	const userObject = useAuthContext();
	return (
		<>
			<Navbar
				className='navbar-top navbar-dark'
				expand='md'
				id='navbar-main'
			>
				<Container fluid>
					<Nav
						className='align-items-center d-none ml-auto d-md-flex'
						navbar
					>
						<UncontrolledDropdown nav>
							<DropdownToggle className='pr-0' nav>
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
									<Media className='ml-2 d-lg-block'>
										<span className='mb-0 text-sm font-weight-bold'>
											{!userObject.fetching && userObject.user
												? 'Dr. ' +
												  userObject.user.userObject[0].doctor
														.firstName +
												  ' ' +
												  userObject.user.userObject[0].doctor
														.lastName
												: ''}
										</span>
									</Media>
								</Media>
							</DropdownToggle>
							<DropdownMenu className='dropdown-menu-arrow' right>
								<DropdownItem className='noti-title' header tag='div'>
									<h6 className='text-overflow m-0'>Welcome!</h6>
								</DropdownItem>
								<DropdownItem to='/admin/user-profile' tag={Link}>
									<i className='ni ni-single-02' />
									<span>My profile</span>
								</DropdownItem>
								{/* <DropdownItem to='/admin/user-profile' tag={Link}>
									<i className='ni ni-settings-gear-65' />
									<span>Settings</span>
								</DropdownItem> 
								 <DropdownItem to='/admin/user-profile' tag={Link}>
									<i className='ni ni-calendar-grid-58' />
									<span>Activity</span>
								 </DropdownItem>
								<DropdownItem to='/admin/user-profile' tag={Link}>
									<i className='ni ni-support-16' />
									<span>Support</span>
								</DropdownItem> */}
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
				</Container>
			</Navbar>
		</>
	);
};

export default AdminNavbar;
